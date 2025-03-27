"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const bg = "/images/service-bg.jpg"; // Change to your preferred background image

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pnumber: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", pnumber: "", email: "", message: "" });
    } else {
      alert(`Failed to send message.`);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-700 text-center">
          We&apos;re here to help! Reach out via phone, email, or visit us at
          our office.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <MapPin className="w-10 h-10 text-red-500" />
            <h3 className="text-xl font-semibold mt-4">Our Office</h3>
            <p className="text-gray-600 mt-2">
              124 City Road City Road, London, England, EC1V 2NX
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Phone className="w-10 h-10 text-green-500" />
            <h3 className="text-xl font-semibold mt-4">Call Us</h3>
            <p className="text-gray-600 mt-2">+44 (0) 7898 789806</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Mail className="w-10 h-10 text-blue-500" />
            <h3 className="text-xl font-semibold mt-4">Email Us</h3>
            <p className="text-gray-600 mt-2">connect@mystry.co.uk</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Send Us a Message
          </h2>
          <p className="mt-4 text-lg text-gray-700 text-center">
            Fill in the form below and we will get back to you as soon as
            possible.
          </p>

          <form
            className="mt-8 max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Your Contact Number
              </label>
              <input
                type="tel"
                name="pnumber"
                value={formData.pnumber}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg"
                placeholder="0712 3456789"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg"
                placeholder="Type your message here"
                rows={5}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Section (Optional) */}
      <div className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Visit Us
        </h2>
        <p className="mt-4 text-lg text-gray-700 text-center">
          Find our office location on the map below.
        </p>

        <div className="mt-8 max-w-5xl mx-auto">
          <iframe
            title="Google Map"
            className="w-full h-64 rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2359.4167254952326!2d-0.09123542352881721!3d51.527235671817756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca671a6cfb1%3A0x382927fb9ac5269b!2s124%20City%20Rd%2C%20London%20EC1V%202NP!5e1!3m2!1sen!2suk!4v1742850305954!5m2!1sen!2suk"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
