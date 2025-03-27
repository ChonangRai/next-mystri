"use client";
import LandingPage from "@/components/landing/landing";
import { Bungee_Shade, Roboto, Rubik_Mono_One } from "next/font/google";
import Link from "next/link";
import { useState, useEffect } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const bgs = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });
const bunge = Bungee_Shade({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const images = [
    "/images/landingPage/hero-bg1.jpg",
    "/images/landingPage/hero-bg2.jpg",
    "/images/landingPage/hero-bg3.jpg",
    "/images/landingPage/hero-bg4.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  });

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
              We Fix. <br /> You Relax.
            </p>
            <div className="">
              <div className="flex flex-wrap gap-8 mt-10">
                {[
                  { number: "5+", text: "Years" },
                  { number: "5K+", text: "Projects" },
                  { number: "100%", text: "Satisfaction" },
                ].map((item, index) => (
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
            <div className="absolute -left-4 -bottom-4 w-full h-full bg-white shadow-lg"></div>
            <div className="relative bg-yellow-200 text-gray-800 p-10">
              <p className="text-lg md:text-xl">
                All-in-One Handyman Services— reliable, affordable, and done
                right.
              </p>
              <hr className="mb-5 h-0.5 border-t-1 bg-gray-800" />
              <div className="text-base mb-8">
                Let us handle your handyman needs with care and expertise. Trust
                our team to deliver quality service, every time.
              </div>

              <Link
                className="px-4 py-3 bg-gray-700 text-yellow-200 hover:bg-gray-900"
                href={`/pages/contact`}
              >
                Contact Us
              </Link>
            </div>
            {/* <p className="text-gray-800 text-sm mb-2">
              Select a service to get an instant estimate
            </p>
            <select className="w-full p-3 border">
              <option value="">Select a Service</option>
              <option value="1">Plumbing & Heating Services</option>
              <option value="2">Tiling & Flooring</option>
              <option value="3">Kitchen & Bathroom Fitting</option>
              <option value="4">Painting & Decoration</option>
              <option value="5">Gardening & Landscaping</option>
              <option value="6">Building and Renovation Services</option>
              <option value="7">Smart Home Installation</option>
              <option value="8">Property Management</option>
              <option value="9">Electricals and Electricity</option>
            </select>
            <p className="text-gray-800 text-sm my-2">
              When do you need it done?
            </p>
            <select className="w-full p-3 border">
              <option value="">Select Urgency</option>
              <option value="Standard">Standard</option>
              <option value="Urgent">Urgent</option>
            </select>
            {showWarning && (
              <p className="text-red-500 text-sm">
                Please select both service and urgency.
              </p>
            )} */}
          </div>

          {/* Button and reassurance text visible only on small screens */}
          <div className="block md:hidden text-center">
            <p className=" py-5 text-lg text-yellow-200 md:text-xl">
              All-in-One Handyman Services— reliable, affordable, and done
              right.
            </p>
            <Link
              href="/pages/contact"
              className="w-full mt-6 px-4 py-3 bg-gray-700 text-yellow-200 rounded-md transition-all text-center block"
            >
              Contact Us
            </Link>
            <p className="text-xs text-white mt-2">
              Don&apos;t worry, we only ask what we need to get your estimate!
            </p>
          </div>
        </div>
      </section>

      <LandingPage />
    </div>
  );
}
