import { useState, useEffect } from "react";
import { Rubik_Mono_One, Bungee_Shade } from "next/font/google";
import { Home, ShieldCheck, Wrench } from "lucide-react";
import Testimonials from "../ui/testimonial";
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
  const [selectedService, setSelectedService] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!selectedService || !selectedUrgency) {
      setShowWarning(true);
    } else {
      window.location.href = `/booking?service=${selectedService}&urgency=${selectedUrgency}`;
    }
  };

  return (
    <div className="bg-yellow-100">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url(${images[currentImage]})` }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
          <div className="text-left text-white md:w-1/2">
            <p className={`${bgs.className} text-4xl md:text-6xl sm:text-2xl leading-tight`}>We Fix. <br /> You Relax.</p>
            <p className="mt-4 text-lg md:text-xl">All-in-One Handyman Services— reliable, affordable, and done right.</p>
                      {/* Stats Section */}
                      <div className="flex flex-wrap gap-8 mt-10">
              {[{ number: "5+", text: "Years" }, { number: "5K+", text: "Projects" }, { number: "100%", text: "Satisfaction" }].map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className={`${bunge.className} text-3xl md:text-4xl font-bold`}>{item.number}</span>
                  <p className="text-sm md:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 md:w-1/3">
            <h3 className="text-xl font-bold text-gray-800">Get Your Free Estimate</h3>
            <hr className="mb-5 h-0.5 border-t-1 bg-neutral-100 dark:bg-white/50" />
            <p className="text-gray-800 text-sm mb-2">Select a service to get an instant estimate</p>
            <select className="w-full p-3 border" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
              <option value="">Select a Service</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Painting">Painting & Denting</option>
              <option value="General Repairs">General Repairs</option>
            </select>
            <p className="text-gray-800 text-sm my-2">When do you need it done?</p>
            <select className="w-full p-3 border" value={selectedUrgency} onChange={(e) => setSelectedUrgency(e.target.value)}>
              <option value="">Select Urgency</option>
              <option value="Standard">Standard</option>
              <option value="Urgent">Urgent</option>
            </select>
            {showWarning && <p className="text-red-500 text-sm">Please select both service and urgency.</p>}
            <button 
              className={`w-full mt-5 px-4 py-3 rounded-md transition-all ${selectedService && selectedUrgency ? 'bg-black text-white hover:bg-gray-700' : 'bg-gray-400 cursor-not-allowed'}`} 
              onClick={handleSubmit} 
              disabled={!selectedService || !selectedUrgency}
              onMouseEnter={() => setShowWarning(!selectedService || !selectedUrgency)}
            >
              Get My Free Estimate
            </button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Mystri?</h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition duration-300 hover:scale-105">
              {benefit.icon}
              <h3 className="text-xl font-semibold mt-4">{benefit.title}</h3>
              <p className="text-gray-600 mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Testimonials />
      <FAQSection />
    </div>
  );
};

export default Landing;
