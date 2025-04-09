
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, AlertCircle, ArrowRight } from 'lucide-react';

// Sample event data
const events = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    date: '2024-05-15',
    time: '09:00 - 17:00',
    location: 'University Conference Center',
    description: 'Annual technology conference featuring industry leaders and innovative technologies.',
    attendees: 180,
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'Coding Workshop',
    date: '2024-05-28',
    time: '14:00 - 16:30',
    location: 'Computer Lab A',
    description: 'Hands-on workshop focused on advanced React techniques and state management.',
    attendees: 25,
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Networking Mixer',
    date: '2024-06-10',
    time: '18:00 - 20:00',
    location: 'Student Union Building',
    description: 'Connect with industry professionals and fellow students in a casual networking environment.',
    attendees: 75,
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'Career Fair',
    date: '2024-06-22',
    time: '10:00 - 15:00',
    location: 'Main Campus Arena',
    description: 'Annual career fair with over 50 companies recruiting for internships and full-time positions.',
    attendees: 300,
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    title: 'Hackathon Challenge',
    date: '2024-07-05',
    time: '09:00 - 18:00',
    location: 'Innovation Center',
    description: '24-hour coding challenge to build innovative solutions for community problems.',
    attendees: 120,
    category: 'Competition',
    image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

// Month names for formatting
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EventTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  // Function to format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    return { day, month };
  };

  return (
    <div className="py-16 px-4 relative">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-3">Upcoming Events</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover and participate in our exciting lineup of events, workshops, and activities
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Timeline column */}
          <motion.div 
            className="lg:w-2/3 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-gradient-to-b from-aces-purple via-aces-coral to-aces-teal hidden md:block" />
            
            <div className="space-y-6">
              {events.map((event, index) => {
                const { day, month } = formatDate(event.date);
                
                return (
                  <motion.div
                    key={event.id}
                    className={`flex gap-4 md:gap-6 ${selectedEvent?.id === event.id ? 'scale-[1.02]' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {/* Date bubble */}
                    <div className="flex-shrink-0 hidden md:block">
                      <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 
                        ${selectedEvent?.id === event.id 
                          ? 'bg-gradient-to-br from-aces-purple to-aces-coral border-aces-neon' 
                          : 'bg-aces-darkblue/50 border-aces-purple/30'}`}
                      >
                        <span className="text-xs font-bold text-white">{day}</span>
                        <span className="text-[9px] text-white/70">{month}</span>
                      </div>
                    </div>
                    
                    {/* Event card */}
                    <div className={`flex-1 card-custom group cursor-pointer overflow-hidden relative ${
                      selectedEvent?.id === event.id ? 'ring-2 ring-aces-purple' : ''
                    }`}>
                      {/* Category indicator */}
                      <div className={`absolute top-0 left-0 h-1 w-full ${
                        event.category === 'Conference' ? 'bg-aces-purple' :
                        event.category === 'Workshop' ? 'bg-aces-coral' :
                        event.category === 'Networking' ? 'bg-aces-teal' :
                        event.category === 'Career' ? 'bg-blue-500' :
                        'bg-aces-neon'
                      }`} />
                      
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Image */}
                          <div className="sm:w-1/4 h-32 sm:h-auto rounded-lg overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="sm:w-3/4">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-display font-semibold text-white group-hover:text-gradient-alt transition-all duration-300">
                                {event.title}
                              </h3>
                              <span className="text-xs py-1 px-3 rounded-full bg-aces-purple/20 text-white">
                                {event.category}
                              </span>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-aces-coral" />
                                <span className="text-white/70">{event.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1')}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-aces-coral" />
                                <span className="text-white/70">{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-aces-coral" />
                                <span className="text-white/70">{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-aces-coral" />
                                <span className="text-white/70">{event.attendees} attendees</span>
                              </div>
                            </div>
                            
                            <p className="mt-3 text-sm text-white/60 line-clamp-2">{event.description}</p>
                            
                            <button className="mt-4 flex items-center gap-1 text-aces-coral text-sm font-medium group-hover:text-aces-neon transition-colors duration-300">
                              <span>View details</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Event details column */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card-custom sticky top-24 overflow-hidden">
              {selectedEvent ? (
                <div className="p-6">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                    <img 
                      src={selectedEvent.image} 
                      alt={selectedEvent.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aces-darkblue via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-display font-bold text-white mb-1">{selectedEvent.title}</h3>
                      <div className="inline-block bg-aces-purple/80 text-white text-xs px-3 py-1 rounded-full">
                        {selectedEvent.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-aces-darkblue/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-aces-coral" />
                          <span className="text-xs text-white/70">Date</span>
                        </div>
                        <p className="text-white font-medium">{selectedEvent.date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1')}</p>
                      </div>
                      <div className="bg-aces-darkblue/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-aces-coral" />
                          <span className="text-xs text-white/70">Time</span>
                        </div>
                        <p className="text-white font-medium">{selectedEvent.time}</p>
                      </div>
                      <div className="bg-aces-darkblue/50 p-3 rounded-lg col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-aces-coral" />
                          <span className="text-xs text-white/70">Location</span>
                        </div>
                        <p className="text-white font-medium">{selectedEvent.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-display font-semibold text-white mb-2">About This Event</h4>
                      <p className="text-white/70 text-sm">{selectedEvent.description}</p>
                    </div>
                    
                    <div className="bg-aces-purple/10 border border-aces-purple/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-aces-coral flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-white font-medium mb-1">Registration Required</h5>
                          <p className="text-sm text-white/70">
                            This event requires advance registration. Limited to {selectedEvent.attendees} participants.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button className="w-full py-3 aces-btn rounded-lg text-center">
                        Register Now
                      </button>
                      <button className="w-full mt-3 py-3 bg-transparent border border-aces-coral/30 text-white hover:bg-aces-coral/10 transition-colors duration-300 rounded-lg text-center">
                        Add to Calendar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8 text-center">
                  <div>
                    <Calendar className="h-12 w-12 text-aces-purple/50 mx-auto mb-4" />
                    <h3 className="text-xl font-display text-white mb-2">No Event Selected</h3>
                    <p className="text-white/60">Select an event from the timeline to see details</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="blob-shape w-[600px] h-[600px] -top-[10%] right-[5%] opacity-10 z-0" />
    </div>
  );
};

export default EventTimeline;
