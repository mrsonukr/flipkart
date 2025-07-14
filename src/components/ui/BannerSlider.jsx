import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/assets/images/banner/4902ac8d1411e50a.webp",
  "/assets/images/banner/de79f66d25c80afb.webp",
  "/assets/images/banner/36d677f51218c6b8.webp",
  "/assets/images/banner/60f88e6e12d3aeca.webp",
];

const OFFER_DURATION = 10 * 60; // 10 minutes
const STORAGE_KEY = "offer_timer";

const OfferBanner = () => {
  const [timeLeft, setTimeLeft] = useState(OFFER_DURATION);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const now = Math.floor(Date.now() / 1000);
    let remaining = OFFER_DURATION;

    if (saved) {
      const { startTime } = JSON.parse(saved);
      const elapsed = now - startTime;
      remaining = Math.max(OFFER_DURATION - elapsed, 0);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ startTime: now }));
    }

    setTimeLeft(remaining);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const newStart = Math.floor(Date.now() / 1000);
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ startTime: newStart })
          );
          return OFFER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="relative w-full h-full">
      <img
        src="/assets/images/banner/baneer.png"
        alt="Offer Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold whitespace-nowrap text-center">
        ENDS IN {formatTime()} MINUTES
      </div>
    </div>
  );
};

const BannerSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full max-w-7xl mx-auto mb-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const delay = swiper.realIndex === 0 ? 5000 : 2500;
          swiper.params.autoplay.delay = delay;
          swiper.autoplay.start();

          // Update active bullet animation duration
          setTimeout(() => {
            const bullets = document.querySelectorAll(
              ".custom-pagination span"
            );
            bullets.forEach((el) =>
              el.classList.remove("delay-5s", "delay-2s")
            );
            const activeBullet = document.querySelector(
              ".custom-pagination .swiper-pagination-bullet-active"
            );
            if (activeBullet) {
              activeBullet.classList.add(
                swiper.realIndex === 0 ? "delay-5s" : "delay-2s"
              );
            }
          }, 50);
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}" data-index="${index}"></span>`,
        }}
      >
        {/* First Slide: Offer Banner */}
        <SwiperSlide>
          <div className="aspect-[2/1] rounded-lg overflow-hidden mx-3 mb-2">
            <OfferBanner />
          </div>
        </SwiperSlide>

        {/* Other Banners */}
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-[2/1] rounded-lg overflow-hidden mx-3 mb-2">
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination mt-1 flex justify-center items-center"></div>

      {/* Custom styles for pagination bullets and progress */}
      <style>{`
        .custom-pagination span {
          display: inline-block;
          position: relative;
          height: 4px;
          width: 12px;
          background-color: #d1d5db;
          border-radius: 9999px;
          margin: 0 4px;
          opacity: .9;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          width: 50px;
          background-color: #d1d5db;
        }

        .custom-pagination .swiper-pagination-bullet-active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0%;
          background-color: #1f2937;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        .custom-pagination .delay-5s::before {
          animation-name: fillProgress;
          animation-duration: 5s;
        }

        .custom-pagination .delay-2s::before {
          animation-name: fillProgress;
          animation-duration: 2.5s;
        }

        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;
