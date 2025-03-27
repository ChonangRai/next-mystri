import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "Jane D., Homeowner",
    text: "I had a plumbing emergency at home, and their team was there within the hour! Not only did they fix the issue quickly, but they also explained everything they were doing. It's rare to find such friendly and professional service these days. Highly recommended!",
    rating: 5,
    profileImage: null,
  },
  {
    name: "Michael S., Small Business Owner",
    text: "I needed renovations done for my shop, and this handyman service delivered ahead of schedule, without compromising on quality. They handled everything—from electrical work to painting—with precision and care. The results speak for themselves, and my customers have noticed the improvement too!",
    rating: 5,
    profileImage: null,
  },
  {
    name: "Emily R., Landowner",
    text: "From repairing leaks to installing fixtures, this team has been a lifesaver for my rental properties. What impresses me the most is their punctuality and dedication to delivering top-notch results. They truly understand the importance of timely service, and I couldn't be happier with the outcomes!",
    rating: 5,
    profileImage: null,
  },
];

const Testimonials = () => {
  return (
    <div className="py-20 bg-gray-200 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Image Gallery */}
        <section className="flex flex-col justify-center items-center h-full flex-1 min-h-[500px]">
          <h2 className="text-3xl font-bold mb-6">Some of our recent works</h2>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-full"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center h-full"
              >
                <Zoom>
                  <Image
                    src={`/images/works/${index}.jpeg`}
                    alt="Recent work"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-md cursor-pointer object-cover"
                  />
                </Zoom>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Testimonials */}
        <section className="flex flex-col justify-center items-center h-full flex-1 min-h-[400px]">
          <h2 className="text-2xl font-bold mb-6">
            What Our Customers Say About Our Works
          </h2>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full h-full"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center h-full"
              >
                <div className="relative bg-white p-6 rounded-lg shadow-md flex flex-col h-full w-full">
                  {/* Testimonial Text - Centered */}
                  <div className="flex-grow flex items-center justify-center text-center px-4">
                    <p className="text-lg italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>

                  {/* Profile Image & Name - Fixed at Bottom */}
                  <div className="flex flex-col items-center mt-auto pt-4 pb-2">
                    {testimonial.profileImage ? (
                      <Image
                        src={testimonial.profileImage}
                        alt=""
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="text-gray-500 text-4xl" />
                    )}
                    <p className="font-semibold mt-2">{testimonial.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

      </div>
    </div>
  );
};

export default Testimonials;
