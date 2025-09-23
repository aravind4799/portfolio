'use client';

import React, { useState } from 'react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import { ProjectType } from '../lib/types';

const projects: ProjectType[] = [
    {
    title: 'Resiligate',
    technologies: ['Spring Boot', 'Spring Cloud Gateway', 'Spring Cloud Config', 'Eureka Server', 'Docker'],
    description: 'Fault-tolerant microservice: Spring Boot services with Resilience4j safeguards, Eureka discovery, and a Spring Cloud Gateway front door.',
    repoUrl: 'https://github.com/aravind4799/resiligate',
  },
  {
    title: 'Covid Tracker',
    technologies: ['React.js', 'Material-UI', 'Chart.js'],
    description: 'Corona Virus tracker that visualizes the spread of covid-19 in real-time',
    repoUrl: 'https://github.com/aravind4799/Covid_tracker',
    liveUrl: 'https://aravind4799.github.io/Covid_tracker/'
  },
  {
    title: 'DoveAI',
    technologies: ['Next.js', 'Tailwindcss', 'Flask', 'OpenAI API','MongoDB'],
    description: 'DoveAI is a full-stack application that features a ChatGPT clone using the OpenAI API, with chat persistence and chat history functionality, allowing users to interact with an AI seamlessly.',
    repoUrl: 'https://github.com/aravind4799/DoveAI',
  },
  {
    title: 'BuyIt',
    technologies: ['Spring Boot', 'OracleDB', 'Angular'],
    description: 'Implemented a No Cost EMI feature supporting multiple credit card types, enabling dynamic, interest-free installment options at checkout.',
    repoUrl: 'https://github.com/aravind4799/BuyIt',
  },
  {
    title: 'Simon Game',
    technologies: ['CSS', 'Javascript', 'HTML'],
    description: 'A web-based memory game that challenges players to replicate increasingly complex sequences of colors and sounds.',
    repoUrl: 'https://github.com/aravind4799/Simon_Game',
    liveUrl: 'https://aravind4799.github.io/Simon_Game/'
  },
  {
    title: 'Outdoors',
    technologies: ['SASS', 'CSS-Animations', 'HTML'],
    description: 'landing page for a fictional tourism company build using html and sass',
    repoUrl: 'https://github.com/aravind4799/outdoors',
    liveUrl: 'https://aravind4799.github.io/outdoors/'
  },
  {
    title: 'Keep App',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React.js'],
    description: 'An application built using MERN stack that mimics the features of google keeper app which allows the users to keep track of their notes.',
    repoUrl: 'https://github.com/aravind4799/KeepApp',
    liveUrl: 'https://keeper-app-kgxr.onrender.com/'
  },
  {
    title: 'Portfolio Website',
    technologies: ['Next.js','Spotify API'],
    description: 'Portfolio website built using next.js and tailwindcss with spotify now playing feature',
    repoUrl: 'https://github.com/aravind4799/portfolio',
  }
];

const Projects = () => {
  const [ref, isVisible] = useScrollFadeIn();
  const [currentPage, setCurrentPage] = useState(0);

  const projectsPerPage = 4;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="projects" ref={ref} className={`relative min-h-screen bg-gray-950/90 backdrop-blur-sm p-8 py-16 text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
       <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">Projects</h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 text-center">A collection of my works, big and small</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
          {currentProjects.map((project: ProjectType) => (
            <div key={project.title} className="group bg-slate-900 border border-slate-700 rounded-lg overflow-hidden flex flex-col hover:border-cyan-400 transition-all duration-300">
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-slate-800 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
                <div className="flex items-center gap-4 mt-auto">
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 text-sm hover:underline"
                  >
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                  {project.liveUrl && (
                     <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 text-sm hover:underline"
                      >
                        <ArrowUpRight size={16} />
                        <span>View Live</span>
                      </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button onClick={handlePrevPage} className="bg-slate-800 text-cyan-400 border border-slate-700 px-4 py-2 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button onClick={handleNextPage} className="bg-slate-800 text-cyan-400 border border-slate-700 px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
