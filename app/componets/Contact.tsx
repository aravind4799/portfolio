import  {useScrollFadeIn}  from '../hooks/useScrollFadeIn';

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

export {Contact};