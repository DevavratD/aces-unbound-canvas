
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle settings
    const particleCount = 100;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];
    
    // Colors array
    const colors = [
      '#8A2BE2', // purple
      '#FF7F50', // coral
      '#20B2AA', // teal
      '#DFFF00'  // neon yellow
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Mouse position for interactivity
    let mouseX = 0;
    let mouseY = 0;
    
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + '40'; // Adding transparency
        ctx.fill();
        
        // Connect particles within range
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color + Math.floor((1 - distance / 120) * 70).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
        
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (80 - distance) / 80;
          
          particle.speedX += forceDirectionX * force * 0.05;
          particle.speedY += forceDirectionY * force * 0.05;
          
          // Speed limit
          const maxSpeed = 1.5;
          const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (currentSpeed > maxSpeed) {
            particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
            particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
          }
        }
        
        // Natural slowdown
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
      });
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Interactive canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      />
      
      {/* Background blobs */}
      <div className="blob-shape w-[500px] h-[500px] top-[10%] left-[-10%] opacity-30 z-0" />
      <div className="blob-shape w-[600px] h-[600px] bottom-[-10%] right-[-10%] opacity-20 z-0" />
      
      <div className="container mx-auto h-full px-4 flex flex-col justify-center items-center relative z-10 pt-16">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display mb-6 font-bold leading-tight">
            <span className="text-gradient">ACES</span> <br/>
            <span className="text-white">Centralized Platform</span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-8 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            An unconventional, immersive hub for student management, events, announcements, and budget tracking
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button className="aces-btn rounded-full flex items-center gap-2 text-lg">
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button className="px-6 py-3 bg-transparent border border-aces-purple text-white rounded-full hover:bg-aces-purple/10 transition-colors duration-300 text-lg">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-aces-darkblue to-aces-purple/70 skewed-bg" />
    </div>
  );
};

export default Hero;
