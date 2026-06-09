"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={(path) => router.push(path as never)}>
      {children}
    </RouterProvider>
  );
}
