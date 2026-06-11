"use client";

import { useAudio } from "@/context/AudioContext";
import type { Song } from "@/data/content";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

// ─── Icons (inline SVGs for zero-dependency) ───

function PlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function PauseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function NextIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  );
}

function PrevIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
  );
}

function MusicNoteIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

function VolumeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function ChevronUpIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l-6-6-6 6" />
    </svg>
  );
}

// ─── Helpers ───

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ─── Component ───

export default function MiniPlayer() {
  const {
    isPlaying,
    isActivated,
    currentSong,
    currentTime,
    duration,
    volume,
    songs,
    toggle,
    next,
    prev,
    seek,
    setVolume,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Don't show player until activated
  if (!isActivated || songs.length === 0) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // ─── Progress bar drag ───

  const handleProgressInteraction = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const bar = progressRef.current;
    if (!bar || !duration) return;

    const rect = bar.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    seek(fraction * duration);
  };

  return (
    <AnimatePresence>
      <motion.div
        id="mini-player"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/20 border border-white/10">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950/80 via-pink-950/80 to-purple-950/80 backdrop-blur-xl" />

          {/* Subtle animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-pink-500/10 to-rose-500/5 animate-[shimmer_3s_ease-in-out_infinite]" />

          <div className="relative">
            {/* ── Progress bar (top) ── */}
            <div
              ref={progressRef}
              className="h-1 w-full bg-white/10 cursor-pointer group"
              onClick={handleProgressInteraction}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progresso da música"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-400 relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: isDragging ? 0 : 0.1 }}
              >
                {/* Glowing dot at end */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-rose-300 rounded-full shadow-lg shadow-rose-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>

            {/* ── Main controls row ── */}
            <div className="flex items-center gap-3 px-4 py-3">
              {/* Album art / music note */}
              <motion.div
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/30 to-pink-600/30 flex items-center justify-center flex-shrink-0 overflow-hidden"
                animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                transition={
                  isPlaying
                    ? { duration: 8, repeat: Infinity, ease: "linear" }
                    : { duration: 0.3 }
                }
              >
                {currentSong?.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <MusicNoteIcon className="w-5 h-5 text-rose-300" />
                )}

                {/* Spinning ring effect */}
                {isPlaying && (
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-rose-400/40 animate-spin" />
                )}
              </motion.div>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <motion.p
                  key={currentSong?.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-white truncate"
                >
                  {currentSong?.title ?? "Sem música"}
                </motion.p>
                <p className="text-xs text-rose-200/60 truncate">
                  {currentSong?.artist ?? "—"}
                </p>
              </div>

              {/* Time display */}
              <span className="text-xs text-rose-200/50 tabular-nums hidden sm:block">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  id="player-prev"
                  onClick={prev}
                  className="p-1.5 rounded-full text-rose-200/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Música anterior"
                >
                  <PrevIcon />
                </button>

                <motion.button
                  id="player-toggle"
                  onClick={toggle}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-shadow"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5" />
                  ) : (
                    <PlayIcon className="w-5 h-5" />
                  )}
                </motion.button>

                <button
                  id="player-next"
                  onClick={next}
                  className="p-1.5 rounded-full text-rose-200/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Próxima música"
                >
                  <NextIcon />
                </button>
              </div>

              {/* Expand toggle */}
              <button
                id="player-expand"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-full text-rose-200/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={isExpanded ? "Minimizar player" : "Expandir player"}
              >
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <ChevronUpIcon />
                </motion.span>
              </button>
            </div>

            {/* ── Expanded section (volume + track list) ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3 space-y-3 border-t border-white/5">
                    {/* Volume control */}
                    <div className="flex items-center gap-2 pt-3">
                      <VolumeIcon className="w-4 h-4 text-rose-200/50" />
                      <input
                        id="player-volume"
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="flex-1 h-1 rounded-full appearance-none bg-white/10 accent-rose-400 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-400 [&::-webkit-slider-thumb]:shadow-lg"
                        aria-label="Volume"
                      />
                      <span className="text-xs text-rose-200/40 w-8 text-right tabular-nums">
                        {Math.round(volume * 100)}%
                      </span>
                    </div>

                    {/* Track list */}
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {songs.map((song, index) => (
                        <TrackItem
                          key={song.id}
                          song={song}
                          index={index}
                          isActive={currentSong?.id === song.id}
                          isPlaying={isPlaying && currentSong?.id === song.id}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Track list item ───

function TrackItem({
  song,
  index,
  isActive,
  isPlaying,
}: {
  song: Song;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
}) {
  const { toggle, setTrack } = useAudio();

  const handleClick = () => {
    if (isActive) {
      toggle();
    } else {
      setTrack(index);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group w-full flex items-center gap-3 px-2 py-1.5 rounded-lg text-left transition-colors ${
        isActive
          ? "bg-rose-500/15 text-white"
          : "text-rose-200/60 hover:text-white hover:bg-white/5"
      }`}
    >
      {/* Capa da música / Indicador de reprodução */}
      <div className="relative w-8 h-8 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/10">
        {song.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <MusicNoteIcon className="w-4 h-4 text-rose-300/60" />
        )}

        {/* Overlay para faixa ativa (tocando/pausada) */}
        {isActive ? (
          <div className="absolute inset-0 bg-rose-950/70 backdrop-blur-[1px] flex items-center justify-center">
            {isPlaying ? (
              <span className="flex gap-0.5 items-end justify-center h-3">
                <motion.span
                  className="w-0.5 bg-rose-400 rounded-full"
                  animate={{ height: ["4px", "12px", "4px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-0.5 bg-rose-400 rounded-full"
                  animate={{ height: ["8px", "4px", "8px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="w-0.5 bg-rose-400 rounded-full"
                  animate={{ height: ["4px", "12px", "4px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                />
              </span>
            ) : (
              <PlayIcon className="w-3.5 h-3.5 text-rose-300" />
            )}
          </div>
        ) : (
          /* Overlay de hover com botão de play para faixas inativas */
          <div className="absolute inset-0 bg-rose-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayIcon className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{song.title}</p>
        <p className="text-xs opacity-50 truncate">{song.artist}</p>
      </div>
    </button>
  );
}
