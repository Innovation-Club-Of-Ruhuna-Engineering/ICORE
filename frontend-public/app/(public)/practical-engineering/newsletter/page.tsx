"use client";
import React from 'react';
import { NewsletterForm } from '@/components/course/newsletter-form';
import { motion } from 'framer-motion';

interface FloatingShapeProps {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: string;
  opacity: number;
}

const NewsletterPage = () => {
  // Animated background elements
  const FloatingShape = ({ delay, duration, x, y, size, opacity }: FloatingShapeProps) => (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/10 blur-3xl"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        opacity: [opacity, opacity + 0.2, opacity],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-950 overflow-hidden relative">
      {/* Animated Background Shapes */}
      <FloatingShape delay={0} duration={8} x="10%" y="20%" size="400px" opacity={0.3} />
      <FloatingShape delay={2} duration={10} x="80%" y="60%" size="300px" opacity={0.25} />
      <FloatingShape delay={4} duration={9} x="50%" y="10%" size="350px" opacity={0.2} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05]" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full sm:max-w-md lg:max-w-3xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <div className="mb-6 inline-block ">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

              </motion.div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-300 dark:to-blue-500 mb-4 leading-tight">
              Practical Engineering Course Newsletter
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-medium px-2">
              Join thousands of innovators exploring practical engineering
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Gradient Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 via-blue-400/30 to-blue-600/50 rounded-2xl blur opacity-75 dark:opacity-50 group-hover:opacity-100 transition duration-1000" />

            {/* Form Background */}
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-blue-100/50 dark:border-blue-800/30 shadow-2xl">
              <NewsletterForm />
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6 sm:mt-8 px-2"
          >
            No spam. Unsubscribe anytime. We respect your privacy.
          </motion.p>
        </motion.div>
      </div>

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
};

export default NewsletterPage;