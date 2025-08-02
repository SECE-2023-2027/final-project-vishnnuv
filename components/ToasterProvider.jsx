'use client';

import { Toaster } from "./ui/toaster.jsx";
import { Toaster as Sonner } from "./ui/sonner.jsx";

export function ToasterProvider() {
  return (
    <>
      <Toaster />
      <Sonner />
    </>
  );
}
