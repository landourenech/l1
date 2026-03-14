"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Ajout pour le swipe

interface ExerciseDialogProps {
  studentName: string;
  images: string[];
  statusLabel?: string;
  dotColor?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

const FALLBACK_IMAGE = "/manque.png";

export function ExerciseDialog({
  studentName,
  images,
  statusLabel,
  dotColor = "bg-zinc-400",
  open,
  onOpenChange,
  hideTrigger = false,
}: ExerciseDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [displayImages, setDisplayImages] = React.useState<string[]>([]);

  const EXERCISE_TITLES = React.useMemo(
    () => ["Exo 1 TD", "Exo 2 TD", "Exo 3 TD", "Devoir Exo 1", "Devoir Exo 2"],
    []
  );

  React.useEffect(() => {
    const cleaned = images.map((img) => (img === "#" || !img ? FALLBACK_IMAGE : img));
    const list = [...cleaned];
    while (list.length < 5) list.push(FALLBACK_IMAGE);
    setDisplayImages(list);
  }, [images]);

  const realCount = displayImages.filter((img) => img !== FALLBACK_IMAGE).length;
  const isOpen = typeof open === "boolean" ? open : internalOpen;
  const count = displayImages.length;
  const currentTitle = EXERCISE_TITLES[currentIndex] || `Exercice ${currentIndex + 1}`;

  const setOpen = (next: boolean) => {
    if (typeof open !== "boolean") setInternalOpen(next);
    onOpenChange?.(next);
  };

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % count);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + count) % count);

  // Gestion du Swipe (balayage)
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextImage();
    else if (info.offset.x > swipeThreshold) prevImage();
  };

  return (
    <>
      {!hideTrigger && (
        <button
          type="button"
          onClick={() => { setOpen(true); setCurrentIndex(0); }}
          className="flex w-full items-center justify-between px-4 py-2 hover:bg-zinc-100/80 transition-colors rounded-lg group"
        >
          <span className="font-medium group-hover:text-blue-600">{studentName}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{realCount}/5</span>
            <span className={`h-2.5 w-2.5 rounded-full ${dotColor} border border-black/5`} />
          </div>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          >
            {/* Bouton Fermer agrandi pour mobile */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-[110] p-2"
            >
              <X size={32} />
            </button>

            <div className="relative flex flex-col items-center w-full h-full max-w-5xl justify-center">
              <div className="text-center mb-4">
                <p className="text-white font-bold text-lg md:text-xl">{studentName}</p>
                <h2 className="text-blue-400 font-semibold">{currentTitle}</h2>
              </div>

              <div className="relative w-full flex items-center justify-center touch-none">
                {/* Navigation Desktop (Cachée sur petit mobile ou tactile) */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 z-50 p-2 bg-white/10 rounded-full text-white hidden md:block"
                >
                  <ChevronLeft size={32} />
                </button>

                {/* ZONE IMAGE AVEC SWIPE */}
                <motion.img
                  key={currentIndex}
                  src={displayImages[currentIndex]}
                  alt={currentTitle}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  drag="x" // Active le drag horizontal
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing"
                />

                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 z-50 p-2 bg-white/10 rounded-full text-white hidden md:block"
                >
                  <ChevronRight size={32} />
                </button>
              </div>

              {/* Indicateurs de progression */}
              <div className="mt-8 flex gap-2 overflow-x-auto max-w-full px-4">
                {displayImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 min-w-[40px] rounded-full transition-all ${
                      i === currentIndex ? "bg-blue-500 w-12" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              
              <p className="mt-4 text-white/40 text-xs md:hidden">
                Faites glisser pour changer d'exercice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
