'use client';

import React, { useState, useEffect } from 'react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { MediumArticle } from '../lib/types';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [ref, isVisible] = useScrollFadeIn();
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/medium');
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const articlesPerPage = 4;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    currentPage * articlesPerPage,
    (currentPage + 1) * articlesPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
    <section id="blogs" ref={ref} className={`relative min-h-screen py-16 text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold font-display mb-4 text-center">Blogs</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 text-center">My latest posts from Medium</p>
        
        {loading ? (
          <div className="text-center text-gray-400">Loading articles...</div>
        ) : (
         
          <div className="relative">
            {totalPages > 1 && (
              <>
                <button 
                  onClick={handlePrevPage} 
                  className="absolute top-1/2 -translate-y-1/2 -left-20 p-2 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 hover:bg-slate-700 transition-colors hidden md:block"
                >
                  <ArrowLeft size={24} />
                </button>
                <button 
                  onClick={handleNextPage} 
                  className="absolute top-1/2 -translate-y-1/2 -right-20 p-2 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 hover:bg-slate-700 transition-colors hidden md:block"
                >
                  <ArrowRight size={24} />
                </button>
              </>
            )}
            
            <div className="flex flex-col gap-8">
              {currentArticles.map((article) => (
                <a 
                  key={article.guid} 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-slate-900 border border-slate-700 rounded-lg p-6 flex justify-between items-center transition-all duration-300 hover:border-cyan-400 hover:bg-slate-800/50 hover:scale-[1.02]"
                >
                  <div className="flex-1 min-w-0 pr-4">
          
                    <p className="text-xs text-gray-400 mb-2">{formatDate(article.pubDate)}</p>
                    <h3 className="text-lg md:text-xl font-semibold text-white transition-colors group-hover:text-cyan-400 line-clamp-2 h-14">
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {article.categories.map(category => (
                        <span key={category} className="bg-slate-800 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center text-cyan-400 text-sm">
                      <span className="hidden md:inline">Read More</span>
                      <ArrowUpRight size={20} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              ))}
            </div>

            
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 md:hidden">
                <button onClick={handlePrevPage} className="p-2 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 hover:bg-slate-700 transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <span className="text-gray-400">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button onClick={handleNextPage} className="p-2 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 hover:bg-slate-700 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>  
        )}
      </div>
    </section>
  );
};

export default Blog;

