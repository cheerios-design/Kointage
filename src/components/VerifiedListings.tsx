"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

interface TokenData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  liquidity: number;
  isLocked: boolean;
  color: string;
}

const mockTokens: TokenData[] = [
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.087,
    change24h: 12.5,
    volume: 1200000000,
    liquidity: 850000000,
    isLocked: true,
    color: "#F7931A",
  },
  {
    symbol: "SHIB",
    name: "Shiba Inu",
    price: 0.000012,
    change24h: -3.2,
    volume: 900000000,
    liquidity: 600000000,
    isLocked: true,
    color: "#FFA500",
  },
  {
    symbol: "PEPE",
    name: "Pepe",
    price: 0.0000015,
    change24h: 45.8,
    volume: 750000000,
    liquidity: 400000000,
    isLocked: true,
    color: "#00FF00",
  },
  {
    symbol: "FLOKI",
    name: "Floki Inu",
    price: 0.00025,
    change24h: 18.7,
    volume: 320000000,
    liquidity: 180000000,
    isLocked: true,
    color: "#FF6B9D",
  },
];

function TokenCard({ token, index }: { token: TokenData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [isInView, index]);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toString();
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm 
                 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 
                 transition-all duration-300 group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: token.color }}
          >
            {token.symbol.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{token.symbol}</h3>
            <p className="text-gray-400 text-sm">{token.name}</p>
          </div>
        </div>

        {/* Verified Badge */}
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
            ✓ Verified
          </span>
          {token.isLocked && (
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
              🔒 Locked
            </span>
          )}
        </div>
      </div>

      {/* Price and Change */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-white mb-1">
          $
          {token.price < 0.01 ? token.price.toFixed(8) : token.price.toFixed(4)}
        </div>
        <div
          className={`text-sm flex items-center ${
            token.change24h >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          <span className="mr-1">{token.change24h >= 0 ? "↗" : "↘"}</span>
          {Math.abs(token.change24h).toFixed(2)}% (24h)
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Volume (24h)</span>
          <span className="text-white text-sm font-medium">
            ${formatNumber(token.volume)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Liquidity</span>
          <span className="text-white text-sm font-medium">
            ${formatNumber(token.liquidity)}
          </span>
        </div>

        {/* Liquidity Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Liquidity Lock</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600/80 to-cyan-600/80 
                   text-white rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 
                   transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25"
      >
        Trade Now
      </motion.button>
    </motion.div>
  );
}

export function VerifiedListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Verified Listings
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every token on our platform is thoroughly vetted with locked liquidity
          and verified smart contracts. Trade with confidence knowing your
          investments are protected.
        </motion.p>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTokens.map((token, index) => (
          <TokenCard key={token.symbol} token={token} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-8 py-3 border-2 border-purple-500 text-purple-400 font-semibold 
                     rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300
                     hover:shadow-lg hover:shadow-purple-500/25"
        >
          View All Listings
        </motion.button>
      </div>
    </section>
  );
}
