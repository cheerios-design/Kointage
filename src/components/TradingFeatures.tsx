"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

interface FeatureData {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
}

const tradingFeatures: FeatureData[] = [
  {
    title: "Advanced Analytics",
    description:
      "Real-time market analysis with AI-powered insights and predictive algorithms.",
    icon: "📊",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Real-time candlestick charts",
      "Technical indicators",
      "Volume analysis",
      "Price alerts",
    ],
  },
  {
    title: "Locked Liquidity",
    description:
      "Every token features locked liquidity pools for enhanced security and stability.",
    icon: "🔒",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Verifiable lock contracts",
      "Liquidity transparency",
      "Rug-pull protection",
      "Smart contract audits",
    ],
  },
  {
    title: "AI Trading Signals",
    description:
      "Machine learning algorithms provide buy/sell signals based on market patterns.",
    icon: "🤖",
    gradient: "from-green-500 to-teal-500",
    features: [
      "Pattern recognition",
      "Sentiment analysis",
      "Risk assessment",
      "Automated alerts",
    ],
  },
  {
    title: "Multi-Asset Support",
    description:
      "Trade meme coins, altcoins, traditional ETFs, and indexes all in one place.",
    icon: "💰",
    gradient: "from-orange-500 to-red-500",
    features: [
      "Crypto currencies",
      "Traditional stocks",
      "ETFs and indexes",
      "Commodities",
    ],
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureData;
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
          y: 60,
          rotateY: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [isInView, index]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm 
                 border border-purple-500/20 rounded-xl p-8 hover:border-purple-400/40 
                 transition-all duration-300 group h-full"
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} 
                      flex items-center justify-center text-2xl mb-6 group-hover:scale-110 
                      transition-transform duration-300`}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed">
        {feature.description}
      </p>

      {/* Features List */}
      <div className="space-y-3">
        {feature.features.map((item, itemIndex) => (
          <motion.div
            key={itemIndex}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15 + itemIndex * 0.1 + 0.3,
            }}
          >
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}
            />
            <span className="text-gray-300 text-sm">{item}</span>
          </motion.div>
        ))}
      </div>

      {/* Hover Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 
                      group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
      />
    </motion.div>
  );
}

export function TradingFeatures() {
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
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Trading Features
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience the future of trading with our comprehensive suite of
          professional-grade tools and features.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tradingFeatures.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        className="mt-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/20"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
            <div className="text-gray-300">Uptime Guarantee</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              &lt;50ms
            </div>
            <div className="text-gray-300">Average Latency</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
