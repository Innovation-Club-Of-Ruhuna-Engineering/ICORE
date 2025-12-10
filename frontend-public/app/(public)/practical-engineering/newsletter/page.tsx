"use client";
import React from 'react';
import { NewsletterForm } from '@/components/course/newsletter-form';
import { motion } from 'framer-motion';

const NewsletterPage = () => {
  const courses = [
    'Web Development & CAD Design',
    'Home Electricity',
    'Electronics',
    'Product Development',
    'Gadget Building',
    'Software Security',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-50 dark:to-slate-950">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
            Practical Engineering Course
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the <span className="font-semibold text-foreground">Innovation Club of Ruhuna Engineering (ICORE)</span> for an exciting journey into practical engineering
          </p>
        </div>

        {/* Course Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mt-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-8">Course Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card border border-border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-3" />
                <p className="font-semibold text-foreground text-center">{course}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Newsletter Subscription Form Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-lg">
              Subscribe to our newsletter to receive updates about the Practical Engineering Course and exclusive ICORE events
            </p>
          </motion.div>

          <NewsletterForm />

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center"
          >
            <p className="text-muted-foreground mb-2">
              Have questions? Get in touch with us!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm font-semibold">
              <span>📞 077 927 6997</span>
              <span className="hidden sm:inline">|</span>
              <span>📧 admin@theicore.org</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default NewsletterPage;