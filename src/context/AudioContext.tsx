"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import siteContent, { type Song } from "@/data/content";

interface AudioState {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  isActivated: boolean; // Becomes true after the first user interaction (hero CTA)
  volume: number;
}

interface AudioContextType extends AudioState {
  currentSong: Song | null;
  songs: Song[];
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setTrack: (index: number) => void;
  activate: () => void; // Called on "Iniciar" click — starts playback
}

const AudioCtx = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const { songs, autoplayOnStart } = siteContent.music;

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    currentTrackIndex: 0,
    currentTime: 0,
    duration: 0,
    isActivated: false,
    volume: 0.7,
  });

  const currentSong = songs.length > 0 ? songs[state.currentTrackIndex] : null;

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = state.volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const wasPlaying = state.isPlaying;
    audio.src = currentSong.src;
    audio.load();

    const handleLoaded = () => {
      setState((prev) => ({ ...prev, duration: audio.duration || 0 }));
      if (wasPlaying && state.isActivated) {
        audio.play().catch(() => {});
      }
    };

    const handleEnded = () => {
      // Auto-advance to next track
      setState((prev) => {
        const nextIndex = (prev.currentTrackIndex + 1) % songs.length;
        return { ...prev, currentTrackIndex: nextIndex, currentTime: 0 };
      });
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentTrackIndex, currentSong?.src]);

  // Animation frame loop for progress
  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && state.isPlaying) {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || prev.duration,
      }));
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, [state.isPlaying]);

  useEffect(() => {
    if (state.isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [state.isPlaying, updateProgress]);

  // --- Controls ---

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !state.isActivated) return;
    audio.play().then(() => {
      setState((prev) => ({ ...prev, isPlaying: true }));
    }).catch(() => {});
  }, [state.isActivated]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const next = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentTrackIndex: (prev.currentTrackIndex + 1) % songs.length,
      currentTime: 0,
    }));
  }, [songs.length]);

  const prev = useCallback(() => {
    const audio = audioRef.current;
    // If more than 3 seconds in, restart current track
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setState((prev) => ({ ...prev, currentTime: 0 }));
      return;
    }
    setState((prev) => ({
      ...prev,
      currentTrackIndex:
        prev.currentTrackIndex === 0
          ? songs.length - 1
          : prev.currentTrackIndex - 1,
      currentTime: 0,
    }));
  }, [songs.length]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
    setState((prev) => ({ ...prev, volume }));
  }, []);

  const activate = useCallback(() => {
    setState((prev) => ({ ...prev, isActivated: true }));
    if (autoplayOnStart && audioRef.current) {
      const audio = audioRef.current;
      // Small delay to ensure state is updated
      setTimeout(() => {
        audio.play().then(() => {
          setState((prev) => ({ ...prev, isPlaying: true }));
        }).catch(() => {});
      }, 100);
    }
  }, [autoplayOnStart]);

  const setTrack = useCallback((index: number) => {
    if (index < 0 || index >= songs.length) return;
    setState((prev) => ({
      ...prev,
      currentTrackIndex: index,
      currentTime: 0,
    }));
  }, [songs.length]);

  return (
    <AudioCtx.Provider
      value={{
        ...state,
        currentSong,
        songs,
        play,
        pause,
        toggle,
        next,
        prev,
        seek,
        setVolume,
        setTrack,
        activate,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return ctx;
}
