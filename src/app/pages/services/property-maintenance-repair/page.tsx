// src/app/services/painting-decoration/page.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function PropertyRepair() {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [photos, setPhotos] = useState<MediaItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const bg = "/images/service-bg.jpg";

  const videos: MediaItem[] = [
    {
      type: "video",
      src: "/videos/property.mp4",
      title: "Property Maintenance",
      description: "Watch a full room transformation in just minutes.",
      url: "/videos/property.mp4", // This is used in the iframe src
    },
    // Add more videos as needed
  ];

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/data/photos.json");
        const data = await response.json();
        const pdCategory = data.find(
          (category: { category: string }) =>
            category.category.toLowerCase() === "property maintenance and repair"
        );

        if (pdCategory && pdCategory.photos) {
          setPhotos(pdCategory.photos);
        }
      } catch (error) {
        console.error("Error loading photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  type MediaItem = {
    type: "photo" | "video";
    src: string;
    title: string;
    url: string;
    description: string;
  };

  const openModal = (item: MediaItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="relative h-[30vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Property Maintenance & Repair Services
          </h1>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Bootstrap-like Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("photos")}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "photos"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "videos"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activeTab === "photos" &&
            photos.map((photo, i) => (
              <div
                key={i}
                onClick={() => openModal(photo)}
                className="cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-lg shadow-md hover:scale-105 transition"
                />
              </div>
            ))}

          {activeTab === "videos" &&
            videos.map((video, i) => (
              <div
                key={i}
                onClick={() => openModal(video)}
                className="cursor-pointer"
              >
                <div className="relative w-full h-64 md:h-72 lg:h-80 bg-black rounded-lg shadow-md overflow-hidden">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    onMouseOver={(e) =>
                      (e.currentTarget as HTMLVideoElement).play()
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget as HTMLVideoElement).pause()
                    }
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xl font-semibold">
                    ▶ {video.title}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Modal for Viewing */}
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white max-w-4xl w-full rounded-lg shadow-xl overflow-hidden">
              <div className="flex justify-between items-start p-4 border-b">
                <h2 className="text-xl font-semibold">{selectedItem?.title}</h2>
                <button onClick={closeModal}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="flex flex-col md:flex-row">
                {activeTab === "photos" ? (
                  <Image
                    src={selectedItem?.src || "/images/services/pd/pd1.jpg"}
                    alt="Image"
                    width={600}
                    height={400}
                    className="w-full md:w-1/2 object-cover"
                  />
                ) : (
                  <iframe
                    src={selectedItem?.url || "/images/services/pd/pd1.jpg"}
                    title={selectedItem?.title}
                    className="w-full md:w-1/2 h-72 md:h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                <div className="p-4 md:w-1/2">
                  <p className="text-gray-600">
                    {selectedItem?.description || "No description available."}
                  </p>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
