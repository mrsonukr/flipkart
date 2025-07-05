import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/assets/images/slider/slider1.jpg",
  "/assets/images/slider/slider2.jpg",
  "/assets/images/slider/slider3.jpg",
];

const BannerSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mb-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="w-full h-[200px] md:h-[300px] object-cover rounded-lg p-2"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots below image */}
      <div className="custom-pagination mt-1 flex justify-center items-center"></div>

      {/* 👇 Embedded Style */}
      <style>{`
        .custom-pagination span {
          display: inline-block;
          position: relative;
          height: 4px;
          width: 12px;
          background-color: #d1d5db; /* gray-300 */
          border-radius: 9999px;
          margin: 0 4px;
          overflow: hidden;
          transition: all 0.3s ease;
          opacity: 1;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          width: 50px;
          background-color: #d1d5db; /* keep base color visible */
        }

        .custom-pagination .swiper-pagination-bullet-active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background-color: #1f2937; /* black progress fill */
          animation: fillProgress 3s linear forwards;
        }

        @keyframes fillProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;
