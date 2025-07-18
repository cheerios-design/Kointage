"use client";

import { MainLayout } from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <MainLayout>
      <div className="pt-20 px-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          <div
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm 
                          border border-purple-500/20 rounded-xl p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {isLogin ? "Welcome Back" : "Join Kointage"}
                </span>
              </h1>
              <p className="text-gray-300">
                {isLogin
                  ? "Sign in to your account"
                  : "Create your trading account"}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex bg-gray-800/50 rounded-lg p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  isLogin
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  !isLogin
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-3 bg-gray-800/50 border border-purple-500/20 
                               rounded-lg text-white placeholder-gray-400 focus:outline-none 
                               focus:border-purple-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-3 bg-gray-800/50 border border-purple-500/20 
                             rounded-lg text-white placeholder-gray-400 focus:outline-none 
                             focus:border-purple-400 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-3 bg-gray-800/50 border border-purple-500/20 
                             rounded-lg text-white placeholder-gray-400 focus:outline-none 
                             focus:border-purple-400 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white 
                           font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 
                           transition-all duration-300"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-4 text-gray-400 text-sm">or</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* Wallet Connect */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 border-2 border-purple-500 text-purple-400 font-semibold 
                         rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 
                         flex items-center justify-center space-x-2"
            >
              <span>🦊</span>
              <span>Connect MetaMask</span>
            </motion.button>

            {/* Footer */}
            <div className="text-center mt-6 text-sm text-gray-400">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
