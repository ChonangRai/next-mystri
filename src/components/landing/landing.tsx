
import { useState, useEffect } from "react";
import { Rubik_Mono_One, Bungee_Shade } from "next/font/google";
import { Home, ShieldCheck, Wrench } from "lucide-react";
import Testimonials from "../ui/testimonial";
import { Button } from "../ui/button";
import ContactForm from "../ui/contact";
import FAQSection from "../ui/faq";

const images = [
  "/images/landingPage/hero-bg1.jpg",
  "/images/landingPage/hero-bg2.jpg",
  "/images/landingPage/hero-bg3.jpg",
  "/images/landingPage/hero-bg4.png",
];

const bgs = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });
const bunge = Bungee_Shade({ subsets: ["latin"], weight: "400" });

const benefits = [
  {
    icon: <Wrench className="w-12 h-12 text-blue-500" />,
    title: "No More Headaches",
    description:
      "Skip the stress of DIY fixes. Our skilled professionals handle everything efficiently, so you don’t have to worry about a thing.",
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-green-500" />,
    title: "All-in-One Help",
    description:
      "Plumbing, electrical, denting/painting and more – one team for all your needs.",
  },
  {
    icon: <Home className="w-12 h-12 text-yellow-500" />,
    title: "A Safer Home & Workplace",
    description:
      "We ensure everything is fixed properly, keeping your space safe, functional, and worry-free.",
  },
];

const Landing = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-100">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col md:flex-row items-center overflow-hidden">
        {/* Left - Image Carousel */}
        <div className="relative w-full md:w-1/2 h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Right - Text Content */}
        <div className="relative z-10 max-w-3xl md:w-1/2 flex flex-col items-center text-center px-4 md:px-8">
          {/* Main Heading */}
          <p
            className={`${bgs.className} text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700 mt-10 leading-tight`}
          >
            We Fix. <br /> You Relax.
          </p>

          {/* Subheading */}
          <p className="mt-4 text-lg sm:text-xl text-gray-700">
            All-in-One Handyman Services— reliable, affordable, and done right.
          </p>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-6">
            {[
              { number: "5+", text: "Years of Excellence" },
              { number: "5K+", text: "Homes & Properties Served" },
              { number: "100%", text: "Customer Satisfaction" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <span
                  className={`${bunge.className} text-4xl sm:text-5xl font-bold text-gray-800`}
                >
                  {item.number}
                </span>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <Button className="px-6 py-5 text-lg bg-blue-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-all">
              Get My Free Estimate
            </Button>
          </div>

          {/* Footer Note */}
          <p className="py-2 text-gray-700 text-sm">
            We respect your time— just click and let us know what you need.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Mystri?</h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition duration-300 hover:scale-105"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold mt-4">{benefit.title}</h3>
              <p className="text-gray-600 mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Testimonials />
      <ContactForm />
      <FAQSection />


      
    </div>
  );
};

export default Landing;
