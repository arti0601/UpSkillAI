 'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
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
  ];

  const testimonials = [
    {
      name: 'Arti K.',
      feedback: 'This platform transformed my career! The AI assistant was a game changer.',
    },
    {
      name: 'Sameer.',
      feedback: 'The content is so interactive and engaging, I never got bored.',
    },
    {
      name: 'Hydra .',
      feedback: 'Thanks to this site, I got certified and landed a new job in 3 months!',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-x-hidden scroll-smooth">
      {/* Animated Glow Background */}
      <motion.div
        className="absolute top-[-30%] left-[-20%] w-[140%] h-[140%] rounded-full bg-gradient-to-br from-orange-500 via-yellow-300 to-white opacity-20 blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
            Learn, Create & Explore
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
            Empower your skills with our expert-curated courses. Start your journey today on the most interactive learning platform.
          </p>
          <Link href="/workspace">
            <Button className="bg-orange-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 hover:bg-orange-600 hover:shadow-[0_0_20px_6px_rgba(255,115,0,0.8)] hover:scale-105">
              🚀 Explore Courses
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Feature Section */}
      <motion.div
        className="relative bg-[#0f0f0f] py-20 px-6 lg:px-20 text-center z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-12 text-orange-400">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-[#1a1a1a] p-6 rounded-2xl border border-orange-400 shadow-md transition duration-300 hover:shadow-[0_0_20px_5px_rgba(255,115,0,0.4)] hover:scale-105"
              whileHover={{ scale: 1.07 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-300">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="bg-[#141414] py-20 px-6 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-10 text-orange-500">What Our Learners Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-[#1e1e1e] p-6 rounded-xl shadow-md hover:shadow-orange-300 transition"
              whileHover={{ scale: 1.03 }}
            >
              <p className="italic text-gray-300">"{t.feedback}"</p>
              <h4 className="mt-4 font-bold text-orange-400">- {t.name}</h4>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="bg-gradient-to-r from-orange-600 to-yellow-400 text-black py-20 px-6 text-center z-10 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">Join thousands of learners today!</h2>
        <Link href="/workspace">
          <Button className="bg-black text-yellow-300 font-semibold text-lg px-6 py-3 rounded-xl transition duration-300 hover:bg-orange-800 hover:text-white hover:shadow-[0_0_20px_6px_rgba(0,0,0,0.5)] hover:scale-110">
            🌟 Get Started for Free
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
