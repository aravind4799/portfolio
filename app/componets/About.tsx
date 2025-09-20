import Image from "next/image";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useNowPlaying } from "../hooks/useNowPlaying";

const About = () => {
  const [ref, isVisible] = useScrollFadeIn();
  const { song, loading } = useNowPlaying();

  const progressPercent = song && song.isPlaying ? (song.progress / song.duration) * 100 : 0;

  return (
    <section id="about" ref={ref} className={`relative min-h-screen bg-gray-950/90 backdrop-blur-sm p-8 py-16 flex flex-col justify-center text-white font-mono transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">About Me</h2>
        <div className="w-24 h-1 bg-cyan-400 mx-auto mb-12"></div>
        
        {/* UPDATED: Swapped the order of the columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Bio */}
          <div className="text-lg text-gray-300 space-y-4 text-center md:text-left">
            <p>I&apos;m a passionate Java Full Stack Developer, currently pursuing my Master&apos;s in Computer Science at Purdue University. My journey in tech has taken me from LTIMindtree in India to Hartford Financial Services in the USA, where I&apos;ve specialized in modernizing systems.</p>
            <p>Beyond the code, I believe music is the shorthand of emotion. It&apos;s the soundtrack to late-night coding sessions and the creative fuel for solving complex problems.</p>
          </div>

          {/* Right Column: Image and Spotify Player */}
          <div className="w-full flex flex-col items-center gap-6">
            <Image 
              src="/my_pic.jpeg" 
              alt="Aravind Kumar"
              width={192}
              height={192}
              className="w-48 h-48 rounded-full border-4 border-cyan-400 object-cover shadow-lg shadow-cyan-500/20"
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
                       <Image src={song.albumImageUrl} alt={song.album} width={64} height={64} className="rounded-md w-full h-full object-cover" />
                    </a>
                    <div className="truncate">
                      <p className="font-bold text-white truncate">{song.title}</p>
                      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                    </div>
                    <div className="flex items-end h-6 gap-0.5 ml-auto">
                        <span className="w-1 bg-cyan-400 animate-[bounce_1s_ease-in-out_infinite]"></span>
                        <span className="w-1 bg-cyan-400 animate-[bounce_1.2s_ease-in-out_infinite]"></span>
                        <span className="w-1 bg-cyan-400 animate-[bounce_0.8s_ease-in-out_infinite]"></span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mt-3">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400">Not currently playing on Spotify.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };