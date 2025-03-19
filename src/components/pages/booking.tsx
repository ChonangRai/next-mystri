// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { Button } from "../ui/button";

// const servicePrices = {
//   Plumbing: { Standard: 30, Urgent: 33 },
//   Electrical: { Standard: 40, Urgent: 44 },
//   "Painting & Denting": { Standard: 15, Urgent: 16.5 },
//   "General Repairs": { Standard: 35, Urgent: 38.5 },
// };

// const Booking = () => {
//   const router = useRouter();
//   const { service, urgency } = router.query;
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [step, setStep] = useState(1);
//   const [mounted, setMounted] = useState(false);

//   // Ensure the component is mounted before using router.query
//   useEffect(() => {
//     setMounted(true);
//   }, []);

// //   useEffect(() => {
// //     if (service && urgency && mounted) {
// //       setPrice(servicePrices[service]?.[urgency] || 0);
// //       setStep(2); // Move to step 2 if service and urgency are provided
// //     }
// //   }, [service, urgency, mounted]);

// //   const handleFileChange = (event) => {
// //     setSelectedImage(event.target.files[0]);
// //   };

//   const nextStep = () => {
//     if (step === 2 && !description) {
//       alert("Please provide a brief issue description.");
//       return;
//     }
//     setStep(step + 1);
//   };

//   const goBack = () => {
//     setStep(step - 1);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold">Booking - Step {step} of 4</h2>

//       {step === 1 && (
//         <>
//           <p className="text-lg">Please select your service and urgency.</p>
//           <select
//             value={service || ""}
//             onChange={(e) =>
//               router.push(`/booking?service=${e.target.value}&urgency=${urgency || ""}`)
//             }
//             className="mt-4 p-2 border rounded"
//           >
//             <option value="">Select a Service</option>
//             {Object.keys(servicePrices).map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>

//           <select
//             value={urgency || ""}
//             onChange={(e) =>
//               router.push(`/booking?service=${service || ""}&urgency=${e.target.value}`)
//             }
//             className="mt-4 p-2 border rounded"
//           >
//             <option value="">Select Urgency</option>
//             <option value="Standard">Standard</option>
//             <option value="Urgent">Urgent</option>
//           </select>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <p className="mt-2 text-lg">Service: {service}</p>
//           <p className="text-lg">Urgency: {urgency}</p>
//           <p className="text-lg font-semibold">Estimated Price: £{price}</p>

//           <textarea
//             className="w-full mt-4 p-3 border"
//             placeholder="Describe the issue"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />

//           <input
//             type="file"
//             className="mt-4"
//             onChange={handleFileChange}
//           />
//           {selectedImage && <p className="mt-2 text-sm">Selected: {selectedImage.name}</p>}
//         </>
//       )}

//       {step === 3 && (
//         <>
//           <h3 className="text-xl font-bold mt-4">Your Details</h3>
//           <input className="w-full mt-2 p-3 border" placeholder="Full Name" />
//           <input className="w-full mt-2 p-3 border" placeholder="Phone Number" />
//           <input className="w-full mt-2 p-3 border" placeholder="Email" />
//         </>
//       )}

//       {step === 4 && (
//         <>
//           <h3 className="text-xl font-bold mt-4">Payment</h3>
//           <p>Total to Pay: £{price}</p>
//           <Button className="bg-green-500 text-white w-full mt-4">Proceed to Payment</Button>
//         </>
//       )}

//       {/* Navigation Buttons */}
//       {step < 4 && (
//         <div className="mt-4 flex justify-between">
//           {step > 1 && (
//             <Button
//               className="bg-gray-500 text-white px-4 py-2"
//               onClick={goBack}
//             >
//               Previous Step
//             </Button>
//           )}

//           <Button
//             className="bg-blue-600 text-white px-4 py-2"
//             onClick={nextStep}
//           >
//             {step === 4 ? "Complete Booking" : "Next Step"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;
