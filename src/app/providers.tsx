"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { AudioProvider } from "@/context/AudioContext";
import MiniPlayer from "@/components/MiniPlayer";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={(path) => router.push(path as never)}>
      <AudioProvider>
        {children}
        <MiniPlayer />
      </AudioProvider>
    </RouterProvider>
  );
}
