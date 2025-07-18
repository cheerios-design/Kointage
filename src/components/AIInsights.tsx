"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

interface InsightData {
  symbol: string;
  signal: "BUY" | "SELL" | "HOLD";
  confidence: number;
  price: number;
  target: number;
  timeframe: string;
  analysis: string;
  sentiment: "Bullish" | "Bearish" | "Neutral";
}

const mockInsights: InsightData[] = [
  {
    symbol: "DOGE",
    signal: "BUY",
    confidence: 85,
    price: 0.087,
    target: 0.125,
    timeframe: "7-14 days",
    analysis:
      "Strong bullish momentum with increasing volume. Technical indicators show oversold conditions.",
    sentiment: "Bullish",
  },
  {
    symbol: "SHIB",
    signal: "HOLD",
    confidence: 72,
    price: 0.000012,
    target: 0.000015,
    timeframe: "2-3 weeks",
    analysis:
      "Consolidating near support levels. Waiting for breakout confirmation.",
    sentiment: "Neutral",
  },
  {
    symbol: "PEPE",
    signal: "BUY",
    confidence: 91,
    price: 0.0000015,
    target: 0.0000025,
    timeframe: "5-10 days",
    analysis:
      "High social media sentiment and increasing on-chain activity. Strong uptrend pattern.",
    sentiment: "Bullish",
  },
];

function InsightCard({
  insight,
  index,
}: {
  insight: InsightData;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        }
      );
    }
  }, [isInView, index]);

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "from-green-500 to-emerald-500";
      case "SELL":
        return "from-red-500 to-rose-500";
      case "HOLD":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Bullish":
        return "text-green-400";
      case "Bearish":
        return "text-red-400";
      case "Neutral":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm 
                 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 
                 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full 
                          flex items-center justify-center text-white font-bold"
          >
            {insight.symbol.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-semibold">{insight.symbol}</h3>
            <p className="text-gray-400 text-sm">AI Analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`px-3 py-1 bg-gradient-to-r ${getSignalColor(
              insight.signal
            )} 
                          text-white text-sm font-bold rounded-full`}
          >
            {insight.signal}
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Confidence</span>
          <span>{insight.confidence}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className={`bg-gradient-to-r ${getSignalColor(
              insight.signal
            )} h-2 rounded-full`}
            initial={{ width: 0 }}
            animate={
              isInView ? { width: `${insight.confidence}%` } : { width: 0 }
            }
            transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
          />
        </div>
      </div>

      {/* Price Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-gray-400 text-sm mb-1">Current Price</div>
          <div className="text-white font-semibold">
            $
            {insight.price < 0.01
              ? insight.price.toFixed(8)
              : insight.price.toFixed(4)}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-1">Target Price</div>
          <div className="text-green-400 font-semibold">
            $
            {insight.target < 0.01
              ? insight.target.toFixed(8)
              : insight.target.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Timeframe and Sentiment */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-gray-400 text-sm mb-1">Timeframe</div>
          <div className="text-white text-sm">{insight.timeframe}</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-1">Sentiment</div>
          <div
            className={`text-sm font-semibold ${getSentimentColor(
              insight.sentiment
            )}`}
          >
            {insight.sentiment}
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="mb-4">
        <div className="text-gray-400 text-sm mb-2">Analysis</div>
        <div className="text-gray-300 text-sm leading-relaxed">
          {insight.analysis}
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2 bg-gradient-to-r from-purple-600/80 to-cyan-600/80 
                   text-white rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 
                   transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25"
      >
        View Full Analysis
      </motion.button>
    </motion.div>
  );
}

export function AIInsights() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<
    "insights" | "signals" | "sentiment"
  >("insights");

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
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            AI-Powered Insights
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our advanced AI algorithms analyze market patterns, social sentiment,
          and on-chain data to provide you with actionable trading insights.
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-2 flex">
          {[
            { id: "insights", label: "AI Insights", icon: "🧠" },
            { id: "signals", label: "Trade Signals", icon: "📡" },
            { id: "sentiment", label: "Sentiment", icon: "📊" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockInsights.map((insight, index) => (
          <InsightCard key={insight.symbol} insight={insight} index={index} />
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Unlock Premium AI Features
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get access to advanced AI algorithms, real-time alerts, and
            personalized trading strategies with our Pro and VIP membership
            plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold 
                         rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Upgrade to Pro
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-purple-500 text-purple-400 font-semibold 
                         rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
