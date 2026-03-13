"use client";

import * as React from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ExerciseDialogProps {
  studentName: string
  images: string[]
  statusLabel?: string
  dotColor?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  hideTrigger?: boolean
}

export function ExerciseDialog({
  studentName,
  images,
  statusLabel,
  dotColor = "bg-zinc-400",
  open,
  onOpenChange,
  hideTrigger = false,
}: ExerciseDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  
  const realCount = images.filter((img) => img !== "/manque.png").length
  
  const displayImages = React.useMemo(() => {
    const list = [...images]
    while (list.length < 5) list.push("/manque.png")
    return list
  }, [images])
  
  const count = displayImages.length
  const isOpen = typeof open === "boolean" ? open : internalOpen
  
  const setOpen = (next: boolean) => {
    if (typeof open !== "boolean") setInternalOpen(next)
    onOpenChange?.(next)
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % count)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + count) % count)
  }

  React.useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, count])

  React.useEffect(() => {
    if (isOpen) setCurrentIndex(0)
  }, [isOpen])

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
            {statusLabel && <span className="text-xs text-muted-foreground">{statusLabel}</span>}
            <span className="text-xs text-muted-foreground">{realCount}/5</span>
            <span className={`h-2.5 w-2.5 rounded-full ${dotColor} border border-black/5`} />
          </div>
        </button>
      )}

      {isOpen && (
        // L'effet de flou est ici : backdrop-blur-md
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-500">          
          <button 
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 transition-colors"
          >
            <X size={32} />
          </button>

          <div className="relative flex flex-col items-center w-full h-full max-w-5xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Exercice {currentIndex + 1} / 5</h2>
              <p className="text-zinc-400 text-sm">{studentName}</p>
            </div>

            <div className="relative flex-1 w-full flex items-center justify-center group">
              {/* Flou sur le bouton précédent */}
              <button
                onClick={prevImage}
                className="absolute left-0 z-50 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
              >
                <ChevronLeft size={40} />
              </button>

              <img
                src={displayImages[currentIndex]}
                alt={`Exercice ${currentIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl select-none"
              />

              {/* Flou sur le bouton suivant */}
              <button
                onClick={nextImage}
                className="absolute right-0 z-50 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              >
                <ChevronRight size={40} />
              </button>
            </div>

            <div className="mt-8 flex gap-3">
              {displayImages.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
