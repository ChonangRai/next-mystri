import { Users, CheckCircle, Lightbulb, ShieldCheck } from "lucide-react";

const bg = "/images/service-bg.jpg"; // Change to your preferred background image

const highlights = [
  { icon: <CheckCircle className="w-12 h-12 text-green-500" />, title: "Trusted by Clients", description: "Years of experience delivering reliable services." },
  { icon: <Lightbulb className="w-12 h-12 text-yellow-500" />, title: "Innovative Solutions", description: "Using modern techniques for efficiency." },
  { icon: <ShieldCheck className="w-12 h-12 text-blue-500" />, title: "Quality Assurance", description: "Guaranteed workmanship on every project." },
];

const About = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
        <p className="mt-4 text-lg text-gray-700">
          We are a dedicated team of professionals offering a wide range of services to enhance and maintain your property. From <b>plumbing, renovations, and smart home installations</b> to <b>landscaping, painting, and tiling</b>, we handle it all with precision and expertise.
        </p>
      </div>

      {/* Mission Section */}
      <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-700">
            We strive to <b>simplify property maintenance</b> by providing high-quality, affordable, and reliable services—all in one place.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center w-64">
              {item.icon}
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
        <p className="mt-4 text-lg text-gray-700">
          We focus on delivering **top-tier craftsmanship, excellent customer service, and affordable pricing**.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Experienced Professionals</h3>
            <p className="mt-2 text-gray-600">A team of certified and skilled workers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Customer-Centric Approach</h3>
            <p className="mt-2 text-gray-600">We prioritize client satisfaction and long-term solutions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Affordable & Transparent</h3>
            <p className="mt-2 text-gray-600">No hidden fees—just fair pricing for top-quality work.</p>
          </div>
        </div>
      </div>

      {/* Meet the Team (Optional) */}
      <div className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
        <p className="mt-4 text-lg text-gray-700">
          Our professionals are dedicated to making your space <b>safe, functional, and beautiful</b>.
        </p>

        <div className="mt-8 flex justify-center">
          <Users className="w-20 h-20 text-gray-400" />
        </div>
        <p className="text-gray-600 mt-4 italic">More details coming soon...</p>
      </div>
    </div>
  );
};

export default About;
