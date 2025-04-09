
import React from 'react';
import Header from '@/components/Header';
import BudgetVisualizer from '@/components/BudgetVisualizer';
import Footer from '@/components/Footer';

const BudgetPage = () => {
  return (
    <div className="relative">
      <Header />
      <div className="pt-32 pb-16 bg-gradient-to-b from-aces-darkblue to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-display font-bold text-center mb-4">
            Budget Tracker
          </h1>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
            Visualize and manage financial resources effectively
          </p>
        </div>
      </div>
      
      <BudgetVisualizer />
      <Footer />
    </div>
  );
};

export default BudgetPage;
