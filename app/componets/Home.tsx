'use client';

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import Image from 'next/image';

// Custom LeetCode Icon Component
const LeetCodeIcon = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.483 0L13.795 0.005C15.171 0.058 16.3 1.189 16.3 2.569V11.233C16.3 12.613 15.171 13.744 13.795 13.797L13.483 13.8L10.205 13.797C8.829 13.744 7.7 12.613 7.7 11.233V2.569C7.7 1.189 8.829 0.058 10.205 0.005L10.517 0L13.483 0ZM11.6 4.199H10.4V11.199H11.6V4.199ZM13.8 4.199H12.6V11.199H13.8V4.199Z"
      fill="currentColor"
    />
    <path
      d="M20.43 14.214C21.751 14.214 22.822 14.869 23.367 15.776L23.43 15.886L23.43 12.871C23.43 12.422 23.791 12.062 24.24 12.062C24.689 12.062 25.05 12.422 25.05 12.871L25.05 23.129C25.05 23.578 24.689 23.938 24.24 23.938C23.791 23.938 23.43 23.578 23.43 23.129L23.43 20.114C22.822 21.131 21.751 21.786 20.43 21.786C17.938 21.786 16 19.959 16 17.5C16 15.041 17.938 13.214 20.43 13.214L20.43 14.214ZM20.43 15.214C18.492 15.214 17 16.706 17 18.5C17 20.294 18.492 21.786 20.43 21.786C22.368 21.786 23.86 20.294 23.86 18.5C23.86 16.706 22.368 15.214 20.43 15.214Z"
      fill="currentColor"
    />
  </svg>
);


const Home = () => {
  return (
    <section id="home" className="relative h-screen w-screen flex items-center justify-center text-white p-4 overflow-hidden">
      <div className="relative z-10 flex items-center justify-center gap-8 md:gap-12 mb-20">
        <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-110">
          <span className="text-9xl md:text-[10rem] font-bold text-cyan-800 absolute top-2 left-2 -z-20 transition-all duration-300 ease-in-out group-hover:-translate-y-4 group-hover:-translate-x-4">A</span>
          <span className="text-9xl md:text-[10rem] font-bold text-cyan-600 absolute top-1 left-1 -z-10 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:-translate-x-2">A</span>
          <span className="text-9xl md:text-[10rem] font-bold text-cyan-400 relative z-10">A</span>
        </div>
        <div className="w-0.5 h-28 md:h-40 bg-gray-400"></div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-bold">Aravind</h1>
          <div>
            <p className="text-lg md:text-xl text-gray-300">CS Master&apos;s @ Purdue University</p>
            <div className="flex items-center gap-2 text-lg md:text-xl text-gray-300 mt-1">
              <span>Oracle Certified Java developer</span>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <a href="https://github.com/aravind4799" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/aravindkumar3/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <Linkedin size={32} />
            </a>
            {/* ADDED: LeetCode Icon and Link */}
            <a href="https://leetcode.com/u/aravind4799/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <Image src="/leetcode-icon.png" alt="LeetCode" width={32} height={32} />
            </a>
            <a>leetcode</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export {Home};