"use client";
import LandingPage from "@/components/landing/landing";
import { Bungee_Shade, Roboto, Rubik_Mono_One } from "next/font/google";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const bgs = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });
const bunge = Bungee_Shade({ subsets: ["latin"], weight: "400" });

// Define TypeScript interface for Firestore data
interface HomePageContent {
  hero: {
    mainText: string;
    ctaText: string;
    ctaSubText: string;
    reassuranceText: string;
  };
  stats: Array<{
    number: string;
    text: string;
  }>;
}

export default function Home() {
  const images = [
    "/images/landingPage/hero-bg1.jpg",
    "/images/landingPage/hero-bg2.jpg",
    "/images/landingPage/hero-bg3.jpg",
    "/images/landingPage/hero-bg4.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [content, setContent] = useState<HomePageContent | null>(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch content from Firestore
  useEffect(() => {
    async function fetchContent() {
      try {
        const docRef = doc(db, "pages", "home");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as HomePageContent);
        } else {
          console.log("No such document!");
          setContent({
            hero: {
              mainText: "Content Not Found",
              ctaText: "Please check back later.",
              ctaSubText: "",
              reassuranceText: "",
            },
            stats: [],
          });
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error("Error fetching content:", errorMessage);
        setContent({
          hero: {
            mainText: "Error Loading Content",
            ctaText: "Please try again later.",
            ctaSubText: "",
            reassuranceText: "",
          },
          stats: [],
        });
      } finally {
        setLoading(false); // Done loading
      }
    }
    fetchContent();
  }, []);

  // Image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  // Show loading state while fetching data
  if (loading) {
    return <div className={roboto.className}>Loading...</div>;
  }

  // Render nothing or a fallback if content is still null
  if (!content) {
    return <div className={roboto.className}>No content available.</div>;
  }

  return (
    <div className={roboto.className}>
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            opacity: 1,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-full max-w-7xl mx-auto mb-5 flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
          <div className="text-left text-yellow-200 md:w-1/2">
            <p
              className={`${bgs.className} text-4xl md:text-6xl sm:text-2xl leading-tight`}
            >
              {content.hero.mainText.split("<br />").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <div className="">
              <div className="flex flex-wrap gap-8 mt-10">
                {content.stats.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <span
                      className={`${bunge.className} text-3xl md:text-4xl font-bold`}
                    >
                      {item.number}
                    </span>
                    <p className="text-sm md:text-base">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Form - Hidden on small screens, visible on md and larger */}
          <div className="relative w-1/3 hidden md:block">
            <div className="absolute -left-4 -bottom-4 w-full h-full bg-yellow-200 shadow-lg"></div>
            <div className="relative bg-white text-gray-800 p-10">
              <p className="text-lg md:text-xl">{content.hero.ctaText}</p>
              <hr className="mb-5 h-0.5 border-t-1 bg-gray-800" />
              <div className="text-base mb-8">{content.hero.ctaSubText}</div>

              <Link
                className="px-4 py-3 bg-gray-700 text-yellow-200 hover:bg-gray-900"
                href={`/pages/contact`}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Button and reassurance text visible only on small screens */}
          <div className="block md:hidden text-center">
            <p className="py-5 text-lg text-yellow-200 md:text-xl">
              {content.hero.ctaText}
            </p>
            <Link
              href="/pages/contact"
              className="w-full mt-6 px-4 py-3 bg-gray-700 text-yellow-200 rounded-md transition-all text-center block"
            >
              Contact Us
            </Link>
            <p className="text-xs text-white mt-2">
              {content.hero.reassuranceText}
            </p>
          </div>
        </div>
      </section>

      <LandingPage />
    </div>
  );
}