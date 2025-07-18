import {
  ethers,
  BrowserProvider,
  JsonRpcSigner,
  formatEther,
  parseUnits,
  formatUnits,
  isAddress,
} from "ethers";

// Extend Window interface for MetaMask
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Wallet connection utilities
export class WalletManager {
  private provider: BrowserProvider | null = null;
  private signer: JsonRpcSigner | null = null;

  async connectMetaMask(): Promise<string | null> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      this.provider = new BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();

      const address = await this.signer.getAddress();
      return address;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return null;
    }
  }

  async getBalance(address?: string): Promise<string> {
    if (!this.provider) {
      throw new Error("Wallet not connected");
    }

    const targetAddress = address || (await this.signer?.getAddress());
    if (!targetAddress) {
      throw new Error("No address provided");
    }

    const balance = await this.provider.getBalance(targetAddress);
    return formatEther(balance);
  }

  async getNetwork(): Promise<any> {
    if (!this.provider) {
      throw new Error("Wallet not connected");
    }

    return this.provider.getNetwork();
  }

  async switchNetwork(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Error("MetaMask not available");
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      // Chain not added, try to add it
      if (error.code === 4902) {
        await this.addNetwork(chainId);
      } else {
        throw error;
      }
    }
  }

  private async addNetwork(chainId: number): Promise<void> {
    const networks: { [key: number]: any } = {
      56: {
        chainId: "0x38",
        chainName: "Binance Smart Chain",
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        blockExplorerUrls: ["https://bscscan.com/"],
      },
      137: {
        chainId: "0x89",
        chainName: "Polygon",
        rpcUrls: ["https://polygon-rpc.com/"],
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    };

    const networkConfig = networks[chainId];
    if (!networkConfig) {
      throw new Error(`Network ${chainId} not supported`);
    }

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkConfig],
    });
  }

  disconnect(): void {
    this.provider = null;
    this.signer = null;
  }
}

// Token contract interactions
export class TokenContract {
  private contract: ethers.Contract;

  constructor(
    address: string,
    abi: any[],
    signerOrProvider: ethers.Signer | ethers.Provider
  ) {
    this.contract = new ethers.Contract(address, abi, signerOrProvider);
  }

  async getBalance(userAddress: string): Promise<string> {
    const balance = await this.contract.balanceOf(userAddress);
    const decimals = await this.contract.decimals();
    return formatUnits(balance, decimals);
  }

  async getTokenInfo(): Promise<{
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
  }> {
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      this.contract.name(),
      this.contract.symbol(),
      this.contract.decimals(),
      this.contract.totalSupply(),
    ]);

    return {
      name,
      symbol,
      decimals,
      totalSupply: formatUnits(totalSupply, decimals),
    };
  }

  async approve(
    spenderAddress: string,
    amount: string
  ): Promise<ethers.ContractTransactionResponse> {
    const decimals = await this.contract.decimals();
    const amountBN = parseUnits(amount, decimals);
    return this.contract.approve(spenderAddress, amountBN);
  }

  async transfer(
    toAddress: string,
    amount: string
  ): Promise<ethers.ContractTransactionResponse> {
    const decimals = await this.contract.decimals();
    const amountBN = parseUnits(amount, decimals);
    return this.contract.transfer(toAddress, amountBN);
  }
}

// Liquidity pool utilities
export class LiquidityPool {
  private contract: ethers.Contract;

  constructor(
    poolAddress: string,
    abi: any[],
    signerOrProvider: ethers.Signer | ethers.Provider
  ) {
    this.contract = new ethers.Contract(poolAddress, abi, signerOrProvider);
  }

  async getReserves(): Promise<{
    reserve0: string;
    reserve1: string;
    blockTimestampLast: number;
  }> {
    const reserves = await this.contract.getReserves();
    return {
      reserve0: formatEther(reserves[0]),
      reserve1: formatEther(reserves[1]),
      blockTimestampLast: reserves[2],
    };
  }

  async isLiquidityLocked(): Promise<boolean> {
    try {
      // Check if the pool has a time lock or if liquidity tokens are burned
      const totalSupply = await this.contract.totalSupply();
      const burnAddress = "0x000000000000000000000000000000000000dEaD";
      const burnedBalance = await this.contract.balanceOf(burnAddress);

      // If more than 90% is burned, consider it locked
      const burnPercentage = (burnedBalance * BigInt(100)) / totalSupply;
      return burnPercentage >= BigInt(90);
    } catch (error) {
      console.error("Error checking liquidity lock:", error);
      return false;
    }
  }
}

// Global wallet manager instance
export const walletManager = new WalletManager();

// Utility functions
export const shortenAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const isValidAddress = (address: string): boolean => {
  return isAddress(address);
};

export const formatTokenAmount = (
  amount: string,
  decimals: number = 18
): string => {
  return parseFloat(amount).toFixed(Math.min(6, decimals));
};
