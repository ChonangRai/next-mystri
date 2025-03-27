
import { Home, ShieldCheck, Wrench } from "lucide-react";
import Testimonials from "../ui/testimonial";
import FAQSection from "../ui/faq";



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
      "Plumbing, electrical, painting, decoration and more – one team for all your needs.",
  },
  {
    icon: <Home className="w-12 h-12 text-yellow-500" />,
    title: "A Safer Home & Workplace",
    description:
      "We ensure everything is fixed properly, keeping your space safe, functional, and worry-free.",
  },
];


const Landing = () => {

  return (
    <div className="bg-yellow-100">
      {/* Hero Section */}
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
      <FAQSection />
    </div>
  );
};

export default Landing;
