'use client';

import React, { useState } from 'react';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';
import { Send } from 'lucide-react';

const Contact = () => {
  const [ref, isVisible] = useScrollFadeIn();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const mailtoLink = `mailto:araviku04@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Message from ${formData.name}:\n\n${formData.message}`)}`;

  return (
    <section id="contact" ref={ref} className={`relative min-h-screen bg-gray-950/90 backdrop-blur-sm p-8 flex flex-col justify-center text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Contact Me</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        <p className="text-xl md:text-2xl text-gray-400 mb-12">Have a question or want to work together?</p>
        
        <form className="max-w-xl mx-auto text-left">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
              placeholder="Aravind Kumar"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
              placeholder="Project Collaboration"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
              placeholder="Let's build something great together..."
              required
            ></textarea>
          </div>
          <div className="text-center">
            <a
              href={mailtoLink}
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
            >
              <span>Send Message</span>
              <Send size={18} />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
