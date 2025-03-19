"use client";
import LandingPage from "@/components/landing/landing";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  return (
    <div className={roboto.className}>
      
      <LandingPage />
      
    </div>
  );
}
