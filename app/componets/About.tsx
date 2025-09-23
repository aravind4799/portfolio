'use client';

import React from 'react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { useNowPlaying } from '../hooks/useNowPlaying';
import ImagePuzzle from './ImagePuzzle'; 
import Image from 'next/image';

const About = () => {
  const [ref, isVisible] = useScrollFadeIn();
  const { song, loading } = useNowPlaying();

  const progressPercent = song && song.isPlaying ? (song.progress / song.duration) * 100 : 0;

  return (
    <section id="about" ref={ref} className={`relative min-h-screen  p-8 py-16 flex flex-col justify-center text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">About Me</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="w-full flex flex-col items-center justify-center gap-8">
            <ImagePuzzle />
     
            
            <div className={`bg-slate-800/50 border border-slate-700 rounded-lg p-3 w-full max-w-sm transition-transform duration-300 ${song && song.isPlaying ? 'animate-boom-box' : ''}`}>
                {loading ? (
                  <div className="text-center text-gray-400 h-[72px] flex items-center justify-center text-sm">Loading Spotify...</div>
                ) : song && song.isPlaying ? (
                  <>
                    <div className="flex items-center gap-3">
                      <a href={song.songUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-700 rounded-md flex-shrink-0">
                         <Image src={song.albumImageUrl} alt={song.album} width={48} height={48} className="rounded-md w-full h-full object-cover" />
                      </a>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <p className="font-bold text-white truncate text-sm">{song.title}</p>
                        </div>
                        <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                      <div className="bg-cyan-400 h-1 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </>
                ) : (
                   <div className="text-center text-gray-400 h-[72px] flex items-center justify-center text-sm">Not currently playing on Spotify.</div>
                )}
            </div>
          </div>
          
          <div className="text-lg text-gray-300 space-y-6">
            <p>
              As you can probably tell, I have a thing for puzzles—whether it&apos;s sliding tiles or untangling a tricky microservice architecture. I herd microservices for a living: I build them in Spring Boot, dress them up in React, and pack them into Docker boxes so Kubernetes can babysit. If something crashes, I bribe it with more YAML.
            </p>
            <p>
              I&apos;m usually fueling the process with two key ingredients: a questionable amount of coffee and a great soundtrack. There&apos;s a strange parallel between a perfectly brewed cup of Java and a well-written Java program, and I’m a fan of both.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

