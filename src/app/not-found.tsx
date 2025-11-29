"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black text-white px-6">
      {/* Floating Glow Circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-8xl font-extrabold tracking-tight"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-lg text-neutral-300"
      >
        Oops! The page you are looking for doesn’t exist.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex items-center gap-4"
      >
        <Button asChild variant="secondary" className="rounded-xl px-6 py-5 shadow-lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Home
          </Link>
        </Button>

        <Button asChild variant="default" className="rounded-xl px-6 py-5">
          <Link href="/search">
            <Search className="mr-2 h-4 w-4" /> Search Something
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
