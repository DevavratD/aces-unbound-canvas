
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, User, Award, Book } from 'lucide-react';

// Sample data
const members = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    role: 'President',
    department: 'Computer Science',
    year: 'Senior',
    avatar: 'https://i.pravatar.cc/150?img=1',
    skills: ['Leadership', 'AI', 'Public Speaking']
  },
  { 
    id: 2, 
    name: 'Jamie Rodriguez', 
    role: 'Vice President',
    department: 'Electrical Engineering',
    year: 'Junior',
    avatar: 'https://i.pravatar.cc/150?img=2',
    skills: ['Project Management', 'Robotics', 'Event Planning']
  },
  { 
    id: 3, 
    name: 'Taylor Nguyen', 
    role: 'Secretary',
    department: 'Computer Engineering',
    year: 'Sophomore',
    avatar: 'https://i.pravatar.cc/150?img=3',
    skills: ['Documentation', 'Web Development', 'Organization']
  },
  { 
    id: 4, 
    name: 'Morgan Smith', 
    role: 'Treasurer',
    department: 'Business',
    year: 'Senior',
    avatar: 'https://i.pravatar.cc/150?img=4',
    skills: ['Finance', 'Accounting', 'Fundraising']
  },
  { 
    id: 5, 
    name: 'Riley Patel', 
    role: 'Event Coordinator',
    department: 'Marketing',
    year: 'Junior',
    avatar: 'https://i.pravatar.cc/150?img=5',
    skills: ['Event Planning', 'Social Media', 'Graphic Design']
  },
  { 
    id: 6, 
    name: 'Casey Williams', 
    role: 'Outreach Director',
    department: 'Communications',
    year: 'Senior',
    avatar: 'https://i.pravatar.cc/150?img=6',
    skills: ['Networking', 'Public Relations', 'Speaking']
  }
];

// Filter options
const departments = ['All', 'Computer Science', 'Electrical Engineering', 'Computer Engineering', 'Business', 'Marketing', 'Communications'];
const years = ['All', 'Freshman', 'Sophomore', 'Junior', 'Senior'];

const MemberDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || member.department === selectedDepartment;
    const matchesYear = selectedYear === 'All' || member.year === selectedYear;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2">Member Directory</h2>
            <p className="text-white/70">Explore our talented community members</p>
          </div>
          
          <div className="w-full md:w-auto mt-6 md:mt-0 flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                className="w-full md:w-64 px-4 py-2 pl-10 bg-aces-darkblue/40 border border-aces-purple/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-aces-purple/50 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aces-purple/70 h-4 w-4" />
            </div>
            
            {/* Filter button */}
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-aces-purple/20 hover:bg-aces-purple/30 border border-aces-purple/30 rounded-lg transition-colors duration-200"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 text-aces-purple" />
              <span className="text-white">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Filters */}
        {isFilterOpen && (
          <motion.div 
            className="mb-8 p-4 card-custom"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-display">Department</label>
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 bg-aces-darkblue/60 border border-aces-purple/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-aces-purple/50 text-white"
                >
                  {departments.map(department => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2 font-display">Year</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 bg-aces-darkblue/60 border border-aces-purple/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-aces-purple/50 text-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Member cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredMembers.length > 0 ? (
            filteredMembers.map(member => (
              <motion.div 
                key={member.id} 
                className="card-custom group"
                variants={item}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 25px rgba(138, 43, 226, 0.3)'
                }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-lg overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-aces-purple text-white p-1 rounded-full">
                        {member.role === 'President' && <Award className="h-4 w-4" />}
                        {member.role === 'Vice President' && <Users className="h-4 w-4" />}
                        {member.role === 'Secretary' && <Book className="h-4 w-4" />}
                        {(member.role !== 'President' && member.role !== 'Vice President' && member.role !== 'Secretary') && <User className="h-4 w-4" />}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-aces-neon transition-colors duration-200">
                        {member.name}
                      </h3>
                      <p className="text-aces-coral font-bold text-sm mb-2">{member.role}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="inline-block bg-aces-darkblue/80 text-white text-xs px-2 py-1 rounded">
                          {member.department}
                        </span>
                        <span className="inline-block bg-aces-purple/20 text-white text-xs px-2 py-1 rounded">
                          {member.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-white/60 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-1 bg-gradient-to-r from-aces-purple/20 to-aces-coral/20 rounded-full text-white/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-aces-purple to-aces-darkblue clip-path-diamond opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 card-custom">
              <p className="text-white/70 text-lg">No members found matching your search criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="blob-shape w-[700px] h-[700px] top-[30%] left-[-20%] opacity-10 z-0" />
      <div className="blob-shape w-[500px] h-[500px] bottom-[10%] right-[-10%] opacity-10 z-0" />
    </div>
  );
};

export default MemberDirectory;
