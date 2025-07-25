import TargetCursor from '../hooks/TargetCursor';
import zoubaaImage from '../assets/zoubaa.jpg'; // Import the image

export default function App({ drakeMode }) {
  return (
    <div className={`min-h-screen flex items-center justify-center p-8 font-sans antialiased ${drakeMode ? 'bg-[#1A1A1A]' : 'bg-[#EBE6E0]'}`}>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left Column - Content */}
        <div className="md:w-1/2 space-y-8 text-left">
          <div className="cursor-target group">
            <h1 className={`text-5xl font-normal tracking-tight leading-tight ${drakeMode ? 'text-[#FFD700]' : 'text-[#4C7766]'}`}>
              Mohammed <span className="font-light">Zoubaa</span>
            </h1>
            <div className={`relative w-24 h-px mt-4 overflow-hidden ${drakeMode ? 'bg-[#FFD700]/30' : 'bg-[#4C7766]/30'}`}>
              <div className={`absolute inset-y-0 left-0 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 origin-left ${drakeMode ? 'bg-[#FFD700]' : 'bg-[#4C7766]'}`}></div>
            </div>
          </div>

          <p className={`text-xl cursor-target italic transform hover:scale-[1.01] transition-transform max-w-md ${drakeMode ? 'text-[#FFD700]/80' : 'text-[#4C7766]/80'}`}>
            Software Engineer specializing in web development and DevOps
          </p>

          <div className="flex space-x-5 pt-4">
            <button className="cursor-target relative overflow-hidden px-7 py-3 bg-[#4C7766] text-[#EBE6E0] rounded-sm hover:bg-[#3a5d4d] transition-all duration-300 text-sm tracking-wider group">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-[#3a5d4d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            <button className="cursor-target px-7 py-3 border border-[#4C7766] text-[#4C7766] rounded-sm hover:bg-[#4C7766]/5 transition-all duration-300 text-sm tracking-wider hover:shadow-sm">
              View Projects
            </button>
          </div>

          <div className="flex space-x-5 pt-8">
            <a href="#" className="cursor-target text-[#4C7766]/60 hover:text-[#4C7766] transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm">GitHub</span>
            </a>
            <a href="#" className="cursor-target text-[#4C7766]/60 hover:text-[#4C7766] transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="cursor-target group relative w-full max-w-md">
            <div className="aspect-square overflow-hidden rounded-lg shadow-xl border-4 border-white">
              <img 
                src={zoubaaImage} // Use the imported image
                alt="Mohammed Zoubaa"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-[#4C7766]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}