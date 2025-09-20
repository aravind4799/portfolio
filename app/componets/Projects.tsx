import { Github, Linkedin, Code, Calculator, Bot, Building } from 'lucide-react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn'; 
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

export { Projects };