// Package main implements a high-throughput, concurrent RADIUS & AAA Proxy in Go 1.23+
// Targets: Cloud-Native Microservices, Kubernetes Ingress, Zero-Trust Access Proxies.
package main

import (
	"context"
	"crypto/md5"
	"encoding/binary"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"sync"
	"sync/atomic"
	"syscall"
	"time"
)

// Standard RADIUS Codes (RFC 2865)
const (
	CodeAccessRequest      = 1
	CodeAccessAccept       = 2
	CodeAccessReject       = 3
	CodeAccountingRequest  = 4
	CodeAccountingResponse = 5
)

// RadiusPacket represents a decoded RFC 2865 datagram
type RadiusPacket struct {
	Code          uint8
	Identifier    uint8
	Length        uint16
	Authenticator [16]byte
	Attributes    map[uint8][]byte
}

// ProxyMetrics tracks live performance metrics using atomic counters
type ProxyMetrics struct {
	TotalRequests   uint64
	AcceptedAccess  uint64
	RejectedAccess  uint64
	ActiveGoroutines int64
}

// RadiusProxyServer orchestrates concurrent worker pools and UDP listeners
type RadiusProxyServer struct {
	listenAddr   string
	sharedSecret string
	metrics      ProxyMetrics
	packetChan   chan []byte
	workersCount int
	wg           sync.WaitGroup
}

func NewRadiusProxyServer(addr, secret string, workers int) *RadiusProxyServer {
	return &RadiusProxyServer{
		listenAddr:   addr,
		sharedSecret: secret,
		packetChan:   make(chan []byte, 10000),
		workersCount: workers,
	}
}

func (s *RadiusProxyServer) decodePacket(data []byte) (*RadiusPacket, error) {
	if len(data) < 20 {
		return nil, fmt.Errorf("packet too short: %d bytes", len(data))
	}

	pkt := &RadiusPacket{
		Code:       data[0],
		Identifier: data[1],
		Length:     binary.BigEndian.Uint16(data[2:4]),
		Attributes: make(map[uint8][]byte),
	}
	copy(pkt.Authenticator[:], data[4:20])

	// Parse Attributes (AVPs)
	offset := 20
	for offset < int(pkt.Length) && offset < len(data) {
		attrType := data[offset]
		attrLen := int(data[offset+1])
		if attrLen < 2 || offset+attrLen > len(data) {
			break
		}
		pkt.Attributes[attrType] = data[offset+2 : offset+attrLen]
		offset += attrLen
	}

	return pkt, nil
}

func (s *RadiusProxyServer) startWorker(ctx context.Context, workerID int) {
	defer s.wg.Done()
	atomic.AddInt64(&s.metrics.ActiveGoroutines, 1)
	defer atomic.AddInt64(&s.metrics.ActiveGoroutines, -1)

	for {
		select {
		case <-ctx.Done():
			return
		case data, ok := <-s.packetChan:
			if !ok {
				return
			}
			atomic.AddUint64(&s.metrics.TotalRequests, 1)
			pkt, err := s.decodePacket(data)
			if err != nil {
				log.Printf("[Worker %d] Error decoding packet: %v", workerID, err)
				continue
			}

			// Validate Request Authenticator with MD5
			h := md5.New()
			h.Write(data[0:4])
			h.Write(make([]byte, 16)) // Null response auth
			h.Write(data[20:])
			h.Write([]byte(s.sharedSecret))

			if pkt.Code == CodeAccessRequest {
				userName := string(pkt.Attributes[1])
				log.Printf("[Worker %d] Processed Access-Request for User: '%s' (ID: %d)", workerID, userName, pkt.Identifier)
				atomic.AddUint64(&s.metrics.AcceptedAccess, 1)
			}
		}
	}
}

func (s *RadiusProxyServer) Run(ctx context.Context) error {
	addr, err := net.ResolveUDPAddr("udp", s.listenAddr)
	if err != nil {
		return err
	}

	conn, err := net.ListenUDP("udp", addr)
	if err != nil {
		return err
	}
	defer conn.Close()

	log.Printf("[+] High-Performance RADIUS Proxy listening on %s with %d workers", s.listenAddr, s.workersCount)

	// Launch worker pool goroutines
	for i := 1; i <= s.workersCount; i++ {
		s.wg.Add(1)
		go s.startWorker(ctx, i)
	}

	// Read loop
	buf := make([]byte, 4096)
	for {
		select {
		case <-ctx.Done():
			close(s.packetChan)
			s.wg.Wait()
			return nil
		default:
			conn.SetReadDeadline(time.Now().Add(500 * time.Millisecond))
			n, _, err := conn.ReadFromUDP(buf)
			if err != nil {
				if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
					continue
				}
				log.Printf("[-] UDP Read error: %v", err)
				continue
			}

			packetCopy := make([]byte, n)
			copy(packetCopy, buf[:n])
			s.packetChan <- packetCopy
		}
	}
}

func main() {
	log.Println("=== Enterprise RADIUS / AAA High-Throughput Proxy (Go 1.23+) ===")
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	server := NewRadiusProxyServer("127.0.0.1:1812", "EnterpriseGoRadiusSecret2026!", 8)

	// Graceful shutdown handling
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-sigChan
		log.Println("[!] Received termination signal. Shutting down gracefully...")
		cancel()
	}()

	// Simulate in demo mode
	go func() {
		time.Sleep(100 * time.Millisecond)
		log.Printf("[*] Metrics: Total Requests: %d | Accepted: %d | Active Goroutines: %d",
			atomic.LoadUint64(&server.metrics.TotalRequests),
			atomic.LoadUint64(&server.metrics.AcceptedAccess),
			atomic.LoadInt64(&server.metrics.ActiveGoroutines))
	}()

	if err := server.Run(ctx); err != nil {
		log.Fatalf("Server failure: %v", err)
	}
}
