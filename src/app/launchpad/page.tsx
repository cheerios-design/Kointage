"use client";

import { MainLayout } from "@/layouts/MainLayout";
import { motion } from "framer-motion";

export default function Launchpad() {
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
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Launchpad
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover upcoming verified token launches...
          </p>
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-green-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              🚀 Coming Soon
            </h2>
            <p className="text-gray-300">
              Be the first to access vetted token launches with locked liquidity
              and verified smart contracts.
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
