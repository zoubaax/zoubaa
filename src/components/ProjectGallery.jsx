import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ProjectGallery = ({ images, title }) => {
    const { isDarkMode: drakeMode } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    if (!images || images.length === 0) return null;

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="space-y-6">
            {/* Main Image Container */}
            <div className="relative group">
                <motion.div
                    layoutId="main-image"
                    className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`${title} - image ${currentIndex + 1}`}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Overlays */}
                    <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-opacity duration-500 ${drakeMode
                            ? 'from-[#050A30]/60 via-transparent opacity-100 group-hover:opacity-40'
                            : 'from-white/40 via-transparent opacity-100 group-hover:opacity-20'
                        }`} />

                    {/* Floating Expand Icon */}
                    <div className="absolute top-6 right-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Maximize2 className="w-5 h-5 text-white" />
                    </div>

                    {/* Navigation Arrows (Only if multiple images) */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-lg border border-white/10 text-white text-xs font-bold tracking-widest uppercase">
                        {currentIndex + 1} / {images.length}
                    </div>
                </motion.div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex flex-wrap gap-4 px-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${currentIndex === idx
                                    ? 'ring-4 ring-blue-500 scale-105'
                                    : `ring-1 ${drakeMode ? 'ring-white/10' : 'ring-black/10'} opacity-60 hover:opacity-100`
                                }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            {currentIndex === idx && (
                                <div className="absolute inset-0 bg-blue-500/20" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            className="absolute top-8 right-8 p-4 text-white/60 hover:text-white transition-colors"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.img
                            layoutId="main-image"
                            src={images[currentIndex]}
                            alt={title}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                        />

                        {images.length > 1 && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <span className="text-white font-mono text-lg tracking-widest">
                                    {currentIndex + 1} / {images.length}
                                </span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectGallery;
