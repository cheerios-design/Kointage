import { useState, useEffect } from "react";
import { useMarketStore } from "@/stores";

export interface TokenData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  isVerified: boolean;
  isLocked: boolean;
  marketCap?: number;
}

export function useTokenData(symbol?: string) {
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchTokenData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Mock API call - replace with real API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockData: TokenData = {
          symbol: symbol.toUpperCase(),
          name: `${symbol} Token`,
          price: Math.random() * 100,
          change24h: (Math.random() - 0.5) * 20,
          volume24h: Math.random() * 1000000000,
          liquidity: Math.random() * 500000000,
          isVerified: true,
          isLocked: true,
          marketCap: Math.random() * 10000000000,
        };

        setData(mockData);
      } catch (err) {
        setError("Failed to fetch token data");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [symbol]);

  return { data, loading, error };
}

export function useMarketData() {
  const { marketData, setMarketData, setLoading } = useMarketStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Mock API call - replace with real API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockMarketData: TokenData[] = [
          {
            symbol: "BTC",
            name: "Bitcoin",
            price: 45000,
            change24h: 2.5,
            volume24h: 28000000000,
            liquidity: 15000000000,
            isVerified: true,
            isLocked: true,
          },
          {
            symbol: "ETH",
            name: "Ethereum",
            price: 2800,
            change24h: -1.2,
            volume24h: 12000000000,
            liquidity: 8000000000,
            isVerified: true,
            isLocked: true,
          },
          {
            symbol: "DOGE",
            name: "Dogecoin",
            price: 0.087,
            change24h: 12.5,
            volume24h: 1200000000,
            liquidity: 850000000,
            isVerified: true,
            isLocked: true,
          },
        ];

        setMarketData(mockMarketData);
      } catch (err) {
        setError("Failed to fetch market data");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [setMarketData, setLoading]);

  return { data: marketData, error };
}

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "Connecting" | "Open" | "Closing" | "Closed"
  >("Closed");

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    setSocket(ws);
    setConnectionStatus("Connecting");

    ws.onopen = () => setConnectionStatus("Open");
    ws.onclose = () => setConnectionStatus("Closed");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socket && connectionStatus === "Open") {
      socket.send(JSON.stringify(message));
    }
  };

  return { socket, lastMessage, connectionStatus, sendMessage };
}
