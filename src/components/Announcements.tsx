
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, Clock, User, Pin, Zap, MessageSquare, BookOpen } from 'lucide-react';

// Sample announcements data
const announcements = [
  {
    id: 1,
    title: 'New Officers Elected',
    content: 'Congratulations to our newly elected officers for the upcoming academic year. We look forward to their leadership and fresh ideas!',
    timestamp: '2024-04-08T14:30:00Z',
    author: 'Alex Johnson',
    isPinned: true,
    category: 'Organization',
    comments: 8
  },
  {
    id: 2,
    title: 'Upcoming Tech Workshop',
    content: 'Join us next Wednesday for a hands-on workshop on machine learning basics. No prior experience required. Sign up in the link below.',
    timestamp: '2024-04-08T10:15:00Z',
    author: 'Taylor Nguyen',
    isPinned: false,
    category: 'Event',
    comments: 3
  },
  {
    id: 3,
    title: 'Scholarship Opportunities',
    content: 'New scholarships are available for ACES members. Applications are due by the end of the month. See eligibility requirements attached.',
    timestamp: '2024-04-07T16:45:00Z',
    author: 'Morgan Smith',
    isPinned: true,
    category: 'Opportunity',
    comments: 12
  },
  {
    id: 4,
    title: 'Facility Hours Update',
    content: 'The computer lab will have extended hours during finals week. Check the updated schedule for availability.',
    timestamp: '2024-04-07T09:22:00Z',
    author: 'Jamie Rodriguez',
    isPinned: false,
    category: 'Update',
    comments: 2
  },
  {
    id: 5,
    title: 'Industry Partner Presentation',
    content: 'Representatives from TechCorp will give a presentation on internship opportunities next Friday in the main auditorium.',
    timestamp: '2024-04-06T14:00:00Z',
    author: 'Casey Williams',
    isPinned: false,
    category: 'Event',
    comments: 5
  },
  {
    id: 6,
    title: 'Membership Renewal',
    content: 'Annual membership renewals are now open. Please renew by the end of the semester to maintain active status.',
    timestamp: '2024-04-05T11:30:00Z',
    author: 'Riley Patel',
    isPinned: false,
    category: 'Reminder',
    comments: 0
  }
];

// Function to format timestamp
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) > 1 ? 's' : ''} ago`;
  }
};

// Category colors and icons
const categoryConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  'Organization': { 
    color: 'bg-aces-purple text-white',
    icon: <User className="h-4 w-4" />
  },
  'Event': { 
    color: 'bg-aces-coral text-white',
    icon: <BellRing className="h-4 w-4" />
  },
  'Opportunity': { 
    color: 'bg-aces-teal text-white',
    icon: <Zap className="h-4 w-4" />
  },
  'Update': { 
    color: 'bg-blue-500 text-white',
    icon: <BookOpen className="h-4 w-4" />
  },
  'Reminder': { 
    color: 'bg-amber-500 text-white',
    icon: <Clock className="h-4 w-4" />
  }
};

const Announcements: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [newAnnouncement, setNewAnnouncement] = useState<typeof announcements[0] | null>(null);
  
  // Simulating real-time announcements
  useEffect(() => {
    const timer = setTimeout(() => {
      const fakeNewAnnouncement = {
        id: 100,
        title: 'New Budget Approved!',
        content: 'The executive board has approved the budget for our upcoming hackathon. Project leads can now submit their purchase requests.',
        timestamp: new Date().toISOString(),
        author: 'System',
        isPinned: false,
        category: 'Update',
        comments: 0
      };
      
      setNewAnnouncement(fakeNewAnnouncement);
      
      // Clear the notification after 5 seconds
      setTimeout(() => {
        setNewAnnouncement(null);
      }, 5000);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => 
    filter === 'All' || announcement.category === filter || 
    (filter === 'Pinned' && announcement.isPinned)
  );
  
  // Get unique categories for filter
  const categories = ['All', 'Pinned', ...new Set(announcements.map(a => a.category))];

  return (
    <div className="py-16 px-4 relative">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2">Announcements</h2>
            <p className="text-white/70">Stay updated with the latest news and updates</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                  filter === category 
                    ? 'bg-aces-purple text-white' 
                    : 'bg-aces-darkblue/40 text-white/70 hover:bg-aces-purple/30'
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative">
          {/* Real-time notification */}
          <AnimatePresence>
            {newAnnouncement && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0 left-0 right-0 z-20 transform -translate-y-full mb-4"
              >
                <div className="mx-auto max-w-2xl">
                  <div className="bg-aces-purple text-white p-4 rounded-lg shadow-lg flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{newAnnouncement.title}</h4>
                      <p className="text-sm text-white/80">{newAnnouncement.content}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
                        <Clock className="h-3 w-3" />
                        <span>Just now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Announcements list */}
          <div className="space-y-6">
            {filteredAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card-custom group relative overflow-hidden ${
                  announcement.isPinned ? 'border-l-4 border-l-aces-coral' : ''
                }`}
              >
                {/* Category indicator */}
                <div className="absolute right-0 top-0">
                  <div className={`${categoryConfig[announcement.category]?.color || 'bg-gray-500'} px-3 py-1 flex items-center gap-1 text-xs clip-path-triangle`}>
                    {categoryConfig[announcement.category]?.icon}
                  </div>
                </div>
                
                {/* Pinned indicator */}
                {announcement.isPinned && (
                  <div className="absolute top-4 left-4">
                    <Pin className="h-4 w-4 text-aces-coral" />
                  </div>
                )}
                
                <div className={`p-6 ${announcement.isPinned ? 'pl-12' : ''}`}>
                  <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {announcement.title}
                  </h3>
                  
                  <p className="text-white/70 mb-4">
                    {announcement.content}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(announcement.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{announcement.comments} comments</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button className="text-aces-coral text-sm hover:text-aces-neon flex items-center gap-1 group">
                      <span>Read more</span>
                      <svg 
                        className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-20 card-custom">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-aces-darkblue/50 mb-4">
                <BellRing className="h-8 w-8 text-white/50" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No announcements found</h3>
              <p className="text-white/60">There are no announcements matching your current filter</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="blob-shape w-[800px] h-[800px] top-[-20%] right-[-30%] opacity-5 z-0" />
      <div className="blob-shape w-[500px] h-[500px] bottom-[-10%] left-[-10%] opacity-5 z-0" />
    </div>
  );
};

export default Announcements;
