'use client';

import React, { useState, useEffect } from 'react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { MediumArticle } from '../lib/types';
import { ArrowUpRight } from 'lucide-react';

// Helper function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Blogs = () => {
  const [ref, isVisible] = useScrollFadeIn();
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/medium');
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles || []);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    // Note: The id is now "blogs" to match the header link
    <section id="blogs" ref={ref} className={`relative min-h-screen p-8 py-16 text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">Blogs</h2>
         <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 text-center">My latest posts from Medium</p>
        
        {loading ? (
          <div className="text-center text-gray-400">Loading articles...</div>
        ) : (
          // UPDATED: Changed from a grid to a vertical flex container
          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <a 
                key={article.guid} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-slate-900/50 border border-slate-700 rounded-lg p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 flex justify-between items-center"
              >
                <div className="flex-grow">
                  <p className="text-sm text-gray-400 mb-2">{formatDate(article.pubDate)}</p>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{article.title}</h3>
                  <div className="flex flex-wrap gap-2">
                      {article.categories.slice(0, 4).map(cat => (
                          <span key={cat} className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded-full">{cat}</span>
                      ))}
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                   <ArrowUpRight size={24} className="text-gray-500 group-hover:text-cyan-400 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
