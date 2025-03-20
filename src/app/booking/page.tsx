"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Define valid services and urgencies
type Service = "Plumbing" | "Electrical" | "Painting & Denting" | "General Repairs";
type Urgency = "Standard" | "Urgent";

// Base service prices (you will replace this with the database value later on)
const baseServicePrices: Record<Service, number> = {
  Plumbing: 30,
  Electrical: 40,
  "Painting & Denting": 15,
  "General Repairs": 35,
};

// Urgency surcharge (10%) (this can also be dynamic from the database later)
const urgencySurcharge = 0.10; // 10%

const Booking = () => {
  const searchParams = useSearchParams(); // Use searchParams instead of useRouter
  const service = searchParams.get("service") as Service | null; // Type the service correctly
  const urgency = searchParams.get("urgency") as Urgency | null; // Type the urgency correctly

  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [step, setStep] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);

  // Ensure the component is mounted before using searchParams
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update price when service and urgency are available
  useEffect(() => {
    if (service && mounted) {
      // Get the base price for the selected service
      const basePrice = baseServicePrices[service];

      // Calculate the final price based on the urgency
      if (urgency === "Urgent") {
        setPrice(basePrice + basePrice * urgencySurcharge); // Add 10% for urgent services
      } else {
        setPrice(basePrice); // Use base price for standard service
      }

      setStep(2); // Move to step 2 when service and urgency are selected
    } else {
      setStep(1); // If no service or urgency, stay on step 1
      setPrice(0); // Reset the price
    }
  }, [service, urgency, mounted]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const nextStep = () => {
    if (step === 2 && !description) {
      alert("Please provide a brief issue description.");
      return;
    }
    setStep(step + 1);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Booking - Step {step} of 4</h2>

      {/* Show Step 1 if service and urgency are not set */}
      {step === 1 && !service && !urgency && (
        <>
          <p className="text-lg">Please select your service and urgency.</p>
          <select
            value={service || ""}
            onChange={(e) =>
              window.location.href = `/booking?service=${e.target.value}&urgency=${urgency || ""}`
            }
            className="mt-4 p-2 border rounded"
          >
            <option value="">Select a Service</option>
            {Object.keys(baseServicePrices).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={urgency || ""}
            onChange={(e) =>
              window.location.href = `/booking?service=${service || ""}&urgency=${e.target.value}`
            }
            className="mt-4 p-2 border rounded"
          >
            <option value="">Select Urgency</option>
            <option value="Standard">Standard</option>
            <option value="Urgent">Urgent</option>
          </select>
        </>
      )}

      {/* If service and urgency are selected, show estimated price */}
      {(service && urgency && step === 1) && (
        <>
          <p className="mt-2 text-lg">Service: {service}</p>
          <p className="text-lg">Urgency: {urgency}</p>
          {/* Ensure price is valid before calling toFixed() */}
          <p className="text-lg font-semibold">
            Estimated Price: £{price && price !== 0 ? price.toFixed(2) : "N/A"}
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 mt-4"
            onClick={() => setStep(2)}
          >
            Next Step
          </button>
        </>
      )}

      {/* Step 2 - Description and File Upload */}
      {step === 2 && (
        <>
          <p className="mt-2 text-lg">Service: {service}</p>
          <p className="text-lg">Urgency: {urgency}</p>
          {/* Ensure price is valid before calling toFixed() */}
          <p className="text-lg font-semibold">
            Estimated Price: £{price && price !== 0 ? price.toFixed(2) : "N/A"}
          </p>

          <textarea
            className="w-full mt-4 p-3 border"
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            className="mt-4"
            onChange={handleFileChange}
          />
          {selectedImage && <p className="mt-2 text-sm">Selected: {selectedImage.name}</p>}
        </>
      )}

      {/* Step 3 - User Details */}
      {step === 3 && (
        <>
          <h3 className="text-xl font-bold mt-4">Your Details</h3>
          <input className="w-full mt-2 p-3 border" placeholder="Full Name" />
          <input className="w-full mt-2 p-3 border" placeholder="Phone Number" />
          <input className="w-full mt-2 p-3 border" placeholder="Email" />
        </>
      )}

      {/* Step 4 - Payment */}
      {step === 4 && (
        <>
          <h3 className="text-xl font-bold mt-4">Payment</h3>
          {/* Ensure price is valid before calling toFixed() */}
          <p>Total to Pay: £{price && price !== 0 ? price.toFixed(2) : "N/A"}</p>
          <button className="bg-green-500 text-white w-full mt-4">Proceed to Payment</button>
        </>
      )}

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              className="bg-gray-500 text-white px-4 py-2"
              onClick={goBack}
            >
              Previous Step
            </button>
          )}

          <button
            className="bg-blue-600 text-white px-4 py-2"
            onClick={nextStep}
          >
            {step === 4 ? "Complete Booking" : "Next Step"}
          </button>
        </div>
      )}
    </div>
  );
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Booking />
    </Suspense>
  );
}
