"use client";

import { MainLayout } from "@/layouts/MainLayout";
import { motion } from "framer-motion";

export default function Dashboard() {
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
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Trading Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your personalized trading hub coming soon...
          </p>
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              🚧 Under Construction
            </h2>
            <p className="text-gray-300">
              We're building an amazing dashboard with real-time charts,
              portfolio tracking, and advanced analytics.
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
