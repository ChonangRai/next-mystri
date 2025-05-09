import {
  UtensilsCrossed,
  PaintRoller,
  Wrench,
  Leaf,
  Layers,
  Hammer,
  HouseIcon,
  BuildingIcon,
} from "lucide-react";
import { GiElectricalSocket } from "react-icons/gi";
import Link from "next/link";

const services = [
  {
    icon: <PaintRoller className="w-12 h-12 text-blue-500" />,
    linkHref:"/pages/services/painting-decoration",
    title: "Painting & Decorating",
  },
  {
    icon: <Wrench className="w-12 h-12 text-green-500" />,
    linkHref:"/pages/services/plumbing-heating",
    title: "Plumbing & Heating Services",
  },
  {
    icon: <Leaf className="w-12 h-12 text-yellow-500" />,
    linkHref:"/pages/services/gardening-landscaping",
    title: "Gardening & Landscaping (Fencing)",
  },
  {
    icon: <Layers className="w-12 h-12 text-red-500" />,
    linkHref:"/pages/services/tiling-flooring",
    title: "Tiling & Flooring",
  },
  {
    icon: <UtensilsCrossed className="w-12 h-12 text-purple-500" />,
    linkHref:"/pages/services/kitchen-bathroom",
    title: "Kitchen & Bathroom Fitting",
  },
  {
    icon: <Hammer className="w-12 h-12 text-orange-500" />,
    linkHref:"/pages/services/building-renovation",
    title: "Building & Renovation Services",
  },
  {
    icon: <HouseIcon className="w-12 h-12 text-teal-500" />,
    linkHref:"/pages/services/smart-home-installation",
    title: "Smart Home Installation",
  },
  {
    icon: <BuildingIcon className="w-12 h-12 text-gray-500" />,
    linkHref:"/pages/services/property-maintenance-repair",
    title: "Property Maintenance & Repairs",
  },
  {
    icon: <GiElectricalSocket className="w-12 h-12 text-black" />,
    linkHref:"/pages/services/electrical-appliances",
    title: "Elecrical Appliances & Electricity",
  },
];

const bg = "/images/service-bg.jpg";

const Services = () => {
  return (
    <div className="bg-gray-100">
      {/* Background Image Wrapper */}
      <div className="relative h-[30vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        {/* Blurred Overlay */}
      </div>
      {/* Content Section */}
      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-4 text-lg text-gray-700">
            Comprehensive solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-5xl mx-auto grid gap-8 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {

            return (
              <Link
                key={index}
                href={service.linkHref}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition duration-300 hover:scale-105"
              >
                {service.icon}
                <h3 className="text-xl font-semibold mt-4 text-gray-800">
                  {service.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
