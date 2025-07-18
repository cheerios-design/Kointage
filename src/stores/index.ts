import { create } from "zustand";

interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  membershipTier: "Free" | "Pro" | "VIP";
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  isVerified: boolean;
  isLocked: boolean;
}

interface MarketState {
  marketData: MarketData[];
  selectedToken: string | null;
  isLoading: boolean;
  setMarketData: (data: MarketData[]) => void;
  setSelectedToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  marketData: [],
  selectedToken: null,
  isLoading: false,
  setMarketData: (data) => set({ marketData: data }),
  setSelectedToken: (token) => set({ selectedToken: token }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

interface ThemeState {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
}));
