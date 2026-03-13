"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ExerciseDialogProps {
  studentName: string;
  images: string[]; // Exemple : ["/img1.png", "#", "/img3.png"]
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

  // Titres fixes pour les 5 exercices
  const EXERCISE_TITLES = React.useMemo(
    () => ["Exo 1 TD", "Exo 2 TD", "Exo 3 TD", "Devoir Exo 1", "Devoir Exo 2"],
    []
  );

  // 1. Nettoyage et complétion de la liste d'images
  React.useEffect(() => {
    // On remplace les "#" ou chaînes vides par l'image de secours
    const cleaned = images.map((img) => (img === "#" || !img ? FALLBACK_IMAGE : img));

    // On complète jusqu'à 5 éléments
    const list = [...cleaned];
    while (list.length < 5) {
      list.push(FALLBACK_IMAGE);
    }
    setDisplayImages(list);
  }, [images]);

  // 2. Calcul du nombre réel d'exercices rendus (ceux qui ne sont pas l'image de secours)
  const realCount = displayImages.filter((img) => img !== FALLBACK_IMAGE).length;

  const isOpen = typeof open === "boolean" ? open : internalOpen;
  const count = displayImages.length;
  const currentTitle = EXERCISE_TITLES[currentIndex] || `Exercice ${currentIndex + 1}`;

  const setOpen = (next: boolean) => {
    if (typeof open !== "boolean") setInternalOpen(next);
    onOpenChange?.(next);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % count);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  };

  // Navigation au clavier
  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Reset de l'index à l'ouverture
  React.useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  return (
    <>
      {!hideTrigger && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setCurrentIndex(0);
          }}
          className="flex w-full items-center justify-between px-4 py-2 hover:bg-zinc-100/80 transition-colors rounded-lg group"
        >
          <span className="font-medium group-hover:text-blue-600">{studentName}</span>
          <div className="flex items-center gap-3">
            {statusLabel && <span className="text-xs text-muted-foreground">{statusLabel}</span>}
            <span className="text-xs text-muted-foreground">{realCount}/5</span>
            <span className={`h-2.5 w-2.5 rounded-full ${dotColor} border border-black/5`} />
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-500">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 transition-colors"
          >
            <X size={32} />
          </button>

          <div className="relative flex flex-col items-center w-full h-full max-w-5xl">
            <div className="text-center mb-6">
              <p className="text-white font-bold text-xl">{studentName}</p>
              <h2 className="text-xl font-bold text-white">{currentTitle}</h2>
              <p className="text-zinc-400 text-sm">Rendus: {realCount} / 5</p>
            </div>

            <div className="relative flex-1 w-full flex items-center justify-center group">
              <button
                onClick={prevImage}
                className="absolute left-0 z-50 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
              >
                <ChevronLeft size={40} />
              </button>

              <img
                src={displayImages[currentIndex]}
                alt={currentTitle}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl select-none"
                // Si le fichier est manquant sur le serveur (404), on remplace ET on retire du calcul
                onError={() => handleImageError(currentIndex)}
              />

              <button
                onClick={nextImage}
                className="absolute right-0 z-50 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              >
                <ChevronRight size={40} />
              </button>
            </div>

            {/* Indicateurs (dots) en bas */}
            <div className="mt-8 flex gap-3">
              {displayImages.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
  const handleImageError = (index: number) => {
    setDisplayImages((prev) => {
      if (!prev[index] || prev[index] === FALLBACK_IMAGE) return prev;
      const next = [...prev];
      next[index] = FALLBACK_IMAGE;
      return next;
    });
  };
