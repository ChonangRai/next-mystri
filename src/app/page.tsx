"use client";
import LandingPage from "@/components/landing/landing";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  return (
    <div className={roboto.className}>
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}
