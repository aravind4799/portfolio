'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Code, Calculator, Bot, Building, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

// =================================================================================
// Custom Hook for Scroll Animations
// =================================================================================
const useScrollFadeIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.2
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // FIXED: Added 'as const' to ensure TypeScript infers a specific tuple type
  return [ref, isVisible] as const;
};


// =================================================================================
// Starry Background Component
// =================================================================================
const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: any[] = [];
    let comets: any[] = [];
    let mouse = { x: null as number | null, y: null as number | null };
    let center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      center.x = canvas.width / 2;
      center.y = canvas.height / 2;
    };

    const createStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < starCount; i++) {
        const distanceFromCenter = (1 - Math.pow(Math.random(), 3)) * Math.max(center.x, center.y) * 0.8;
        stars.push({
          radius: Math.random() * 1.5 + 0.5,
          distanceFromCenter: distanceFromCenter,
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() * 0.0005) + 0.0001,
          parallax: Math.random() * 0.5 + 0.1,
          opacity: Math.random(),
          twinkleSpeed: (Math.random() - 0.5) * 0.015,
        });
      }
    };

    const createComet = () => {
        const side = Math.floor(Math.random() * 4);
        let x, y, angle;
        if (side === 0) { x = Math.random() * canvas.width; y = 0; angle = Math.random() * Math.PI; }
        else if (side === 1) { x = canvas.width; y = Math.random() * canvas.height; angle = Math.random() * Math.PI + Math.PI / 2; }
        else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height; angle = Math.random() * Math.PI + Math.PI; }
        else { x = 0; y = Math.random() * canvas.height; angle = Math.random() * Math.PI - Math.PI / 2; }
        comets.push({ x, y, angle, speed: Math.random() * 5 + 5, length: Math.random() * 150 + 50, life: 100 });
    };
    
    let animationFrameId: number;
    const animate = () => {
      const time = Date.now() * 0.0002;
      const blueValue = Math.floor(Math.sin(time) * 15 + 30);
      ctx.fillStyle = `rgb(3, 0, ${blueValue})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.angle += star.speed;
        const baseX = center.x + star.distanceFromCenter * Math.cos(star.angle);
        const baseY = center.y + star.distanceFromCenter * Math.sin(star.angle);
        let finalX = baseX, finalY = baseY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - center.x;
          const dy = mouse.y - center.y;
          finalX = baseX - dx * star.parallax * 0.05;
          finalY = baseY - dy * star.parallax * 0.05;
        }

        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) star.twinkleSpeed *= -1;
        
        ctx.beginPath();
        ctx.arc(finalX, finalY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, Math.max(0, star.opacity) + 0.2)})`;
        ctx.fill();
      });

      if (Math.random() < 0.01) createComet();
      
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        comet.life--;
        if (comet.life <= 0) { comets.splice(i, 1); continue; }
        const tailX = comet.x - Math.cos(comet.angle) * comet.length;
        const tailY = comet.y - Math.sin(comet.angle) * comet.length;
        const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.life / 100})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath(); ctx.moveTo(comet.x, comet.y); ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient; ctx.lineWidth = 2; ctx.stroke();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => { mouse.x = event.clientX; mouse.y = event.clientY; };
    const handleResize = () => { setCanvasSize(); createStars(); };

    setCanvasSize();
    createStars();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};


// =================================================================================
// Header Component
// =================================================================================
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const BarsIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> );
  const XMarkIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> );

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 text-white font-mono transition-colors duration-300 ${scrolled ? 'bg-gray-950/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">About</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Contact</a>
        </div>
        <div className="md:hidden ml-auto z-50">
          <button type="button" onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
            <span className="sr-only">Open main menu</span>
            {isOpen ? <XMarkIcon /> : <BarsIcon />}
          </button>
        </div>
      </div>
      <div className={`md:hidden fixed inset-0 h-screen bg-gray-950/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 font-mono uppercase">
          <a href="#home" onClick={() => setIsOpen(false)} className="text-3xl hover:text-cyan-400 transition-colors tracking-widest">Home</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="text-3xl hover:text-cyan-400 transition-colors tracking-widest">About</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-3xl hover:text-cyan-400 transition-colors tracking-widest">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-3xl hover:text-cyan-400 transition-colors tracking-widest">Contact</a>
        </div>
      </div>
    </nav>
  );
};


// =================================================================================
// Home Component
// =================================================================================
const Home = () => {
  return (
    <section id="home" className="relative h-screen w-screen flex items-center justify-center text-white font-mono p-4 overflow-hidden">
      <div className="relative z-10 flex items-center justify-center gap-6 md:gap-8 mb-20">
        <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-110">
          <span className="text-8xl md:text-9xl font-bold text-cyan-800 absolute top-2 left-2 -z-20 transition-all duration-300 ease-in-out group-hover:-translate-y-4 group-hover:-translate-x-4">A</span>
          <span className="text-8xl md:text-9xl font-bold text-cyan-600 absolute top-1 left-1 -z-10 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:-translate-x-2">A</span>
          <span className="text-8xl md:text-9xl font-bold text-cyan-400 relative z-10">A</span>
        </div>
        <div className="w-0.5 h-24 md:h-32 bg-gray-400"></div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-bold">Aravind</h1>
          <div>
            <p className="text-base md:text-lg text-gray-300">CS Master's @ Purdue University</p>
            <div className="flex items-center gap-2 text-base md:text-lg text-gray-300 mt-1">
              <span>Oracle Certified Java developer</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://github.com/aravind4799" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/aravindkumar3/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


// =================================================================================
// Custom Hook to fetch Spotify Data
// =================================================================================
const useNowPlaying = () => {
    const [song, setSong] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await fetch('/api/now-playing');
                if (response.ok) {
                    const data = await response.json();
                    setSong(data);
                } else {
                    setSong(null);
                }
            } catch (error) {
                console.error("Failed to fetch now playing data:", error);
                setSong(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSong();
        const interval = setInterval(fetchSong, 5000);
        return () => clearInterval(interval);
    }, []);

    return { song, loading };
};


// =================================================================================
// About Component
// =================================================================================
const About = () => {
  const [ref, isVisible] = useScrollFadeIn();
  const { song, loading } = useNowPlaying();

  const progressPercent = song && song.isPlaying ? (song.progress / song.duration) * 100 : 0;

  return (
    <section id="about" ref={ref} className={`relative min-h-screen bg-gray-950/90 backdrop-blur-sm p-8 py-16 flex flex-col justify-center text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">About Me</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 text-lg text-gray-300 space-y-4">
            <p>I'm a passionate Java Full Stack Developer, currently pursuing my Master's in Computer Science at Purdue University. My journey in tech has taken me from LTIMindtree in India to Hartford Financial Services in the USA, where I've specialized in modernizing systems.</p>
            <p>Beyond the code, I believe music is the shorthand of emotion. It's the soundtrack to late-night coding sessions and the creative fuel for solving complex problems.</p>
          </div>

          <div className="w-full flex flex-col items-center gap-6">
            <img 
              src="/my_image.jpg" 
              alt="Aravind Kumar" 
              className="w-48 h-48 rounded-full border-4 border-cyan-400 object-cover shadow-lg shadow-cyan-500/20"
              onError={(e: any) => { e.target.onerror = null; e.target.src='https://placehold.co/192x192/111827/7dd3fc?text=Me'; }}
            />
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 w-full max-w-sm">
              {loading ? (
                <div className="text-center text-gray-400">Loading Spotify data...</div>
              ) : song && song.isPlaying ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Now Playing</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={song.songUrl} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-slate-700 rounded-md flex-shrink-0">
                       <img src={song.albumImageUrl} alt={song.album} className="rounded-md w-full h-full object-cover" />
                    </a>
                    <div className="truncate">
                      <p className="font-bold text-white truncate">{song.title}</p>
                      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                    </div>
                    <div className="flex items-end h-6 gap-0.5 ml-auto">
                        <span className="w-1 bg-cyan-400 animate-[bounce_1s_ease-in-out_infinite]"></span>
                        <span className="w-1 bg-cyan-400 animate-[bounce_1.2s_ease_in_out_infinite]"></span>
                        <span className="w-1 bg-cyan-400 animate-[bounce_0.8s_ease_in_out_infinite]"></span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mt-3">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400">Not currently playing music on Spotify.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =================================================================================
// Projects Component
// =================================================================================
const projects = [
  { icon: <Code size={48} />, title: 'Theory Combination Visualizer', description: 'A basic visualizer for polite theory combination. Shows the steps that many modern SMT solvers use when verifying a logic statement from two theories.' },
  { icon: <Calculator size={48} />, title: 'GPT Math', description: 'Basic experiment of improving math problem solving for ChatGPT.' },
  { icon: <Bot size={48} />, title: 'DSRLM GPT', description: 'Basic experiment of improving logical reasoning (specifically relation extractions) for ChatGPT.' },
  { icon: <Building size={48} />, title: 'Uniera Website', description: 'A website project for Uniera Consulting. Give them a look!' },
];

const Projects = () => {
  const [ref, isVisible] = useScrollFadeIn();
  return (
    <section id="projects" ref={ref} className={`relative min-h-screen bg-gray-950/90 backdrop-blur-sm p-8 py-16 text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
       <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">Projects</h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 text-center">A collection of my works, big and small</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-900 border border-slate-700 rounded-lg p-6 flex items-start gap-6 hover:border-cyan-400 transition-colors hover:bg-slate-800/50">
              <div className="text-cyan-400 mt-1">{project.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// =================================================================================
// Contact Component
// =================================================================================
const Contact = () => {
  const [ref, isVisible] = useScrollFadeIn();
  return (
    <section id="contact" ref={ref} className={`relative min-h-screen bg-gray-950/90 backdrop-blur-sm p-8 flex flex-col justify-center text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">Contact</h2>
        <div className="space-y-6 text-xl md:text-2xl text-gray-300">
          <p>Got a question or want to collaborate?</p>
          <p>Feel free to send me a message through this <a href="#" className="text-cyan-400 hover:underline">form</a>!</p>
        </div>
      </div>
    </section>
  );
};


// =================================================================================
// Main App Component
// =================================================================================
export default function App() {
  return (
    <div>
      <StarryBackground />
      <Header />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

