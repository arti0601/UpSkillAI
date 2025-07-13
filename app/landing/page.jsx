 'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-600 via-yellow-200 to-white text-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-white opacity-30 z-0 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-40 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-orange-800">
            Learn, Create & Explore
          </h1>
          <p className="text-lg mb-8 max-w-xl">
            Empower your skills with our expert-curated courses. Start your journey today on the most interactive learning platform.
          </p>
          <Link href="/workspace">
            <Button className="text-white bg-black transition duration-300 hover:bg-orange-600 hover:shadow-[0_0_20px_5px_rgba(255,115,0,0.7)] hover:scale-105">
              Explore Courses
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Feature Section */}
      <motion.div
        className="bg-white py-16 px-6 lg:px-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-10 text-orange-500">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[{
              title: 'Interactive Lessons',
              desc: 'Hands-on videos, quizzes and code editors that keep you engaged.',
              icon: '🎓',
            },
            {
              title: 'AI-Powered Assistance',
              desc: 'Get help instantly with smart AI tutors integrated into your courses.',
              icon: '🤖',
            },
            {
              title: 'Track Progress',
              desc: 'Visual dashboards and badges to show your learning streaks.',
              icon: '📈',
            },
            {
              title: 'Expert Mentors',
              desc: 'Learn from industry experts with real-world experience.',
              icon: '🧑‍🏫',
            },
            {
              title: 'Flexible Learning',
              desc: 'Study at your own pace from any device, anytime.',
              icon: '🕒',
            },
            {
              title: 'Certifications',
              desc: 'Receive shareable certificates to boost your resume.',
              icon: '📜',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl border border-orange-400 shadow-md transition duration-300 hover:shadow-[0_0_20px_5px_rgba(255,115,0,0.4)] hover:scale-105"
              whileHover={{ scale: 1.07 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-700">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="bg-orange-50 py-16 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-10 text-orange-600">What Our Learners Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[{
              name: 'Aarti K.',
              feedback: 'This platform transformed my career! The AI assistant was a game changer.',
            },
            {
              name: 'Raj P.',
              feedback: 'The content is so interactive and engaging, I never got bored.',
            },
            {
              name: 'Sneha M.',
              feedback: 'Thanks to this site, I got certified and landed a new job in 3 months!',
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              <p className="italic text-gray-700">"{t.feedback}"</p>
              <h4 className="mt-4 font-bold text-orange-700">- {t.name}</h4>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="bg-black text-white py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">Join thousands of learners today!</h2>
        <Link href="/explore">
          <Button className="bg-yellow-400 text-black hover:bg-orange-500 hover:text-white transition-shadow duration-300 hover:shadow-[0_0_20px_5px_rgba(255,115,0,0.7)] hover:scale-105">
            Get Started for Free
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
