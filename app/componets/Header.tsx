import { useEffect, useState } from "react";

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
          <a href="#blogs" className="hover:text-cyan-400 transition-colors uppercase tracking-widest">Blogs</a>
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
          <a href="#projects" onClick={() => setIsOpen(false)} className="text-3xl hover:text-cyan-400 transition-colors tracking-widest">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-3xl hover:text-cyan-400 transition-colors tracking-widest">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export { Header };