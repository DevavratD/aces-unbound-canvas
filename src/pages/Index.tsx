
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MemberDirectory from '@/components/MemberDirectory';
import EventTimeline from '@/components/EventTimeline';
import Announcements from '@/components/Announcements';
import BudgetVisualizer from '@/components/BudgetVisualizer';
import Footer from '@/components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-aces-purple via-aces-coral to-aces-teal origin-left z-50"
        style={{ scaleX }}
      />
      
      <Header />
      <Hero />
      
      <section id="directory">
        <MemberDirectory />
      </section>

      <section id="events">
        <EventTimeline />
      </section>

      <section id="announcements">
        <Announcements />
      </section>

      <section id="budget">
        <BudgetVisualizer />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
