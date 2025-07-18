"use client";

import { MainLayout } from "@/layouts/MainLayout";
import { motion } from "framer-motion";

export default function Markets() {
  return (
    <MainLayout>
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Markets
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore all available trading pairs and markets...
          </p>
          <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-2xl p-8 border border-cyan-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              📈 Market Overview
            </h2>
            <p className="text-gray-300">
              Real-time market data, advanced charts, and comprehensive trading
              tools coming soon.
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
