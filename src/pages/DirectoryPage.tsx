
import React from 'react';
import Header from '@/components/Header';
import MemberDirectory from '@/components/MemberDirectory';
import Footer from '@/components/Footer';

const DirectoryPage = () => {
  return (
    <div className="relative">
      <Header />
      <div className="pt-32 pb-16 bg-gradient-to-b from-aces-darkblue to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-display font-bold text-center mb-4">
            Member Directory
          </h1>
          <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
            Explore our talented community of students, faculty, and staff members
          </p>
        </div>
      </div>
      
      <MemberDirectory />
      <Footer />
    </div>
  );
};

export default DirectoryPage;
