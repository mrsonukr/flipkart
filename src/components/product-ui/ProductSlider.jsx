import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const images = [
  "https://cdn.shopify.com/s/files/1/0637/4834/1981/files/1_AARD-2108-GREEN-PEACHMODE_04a20e2a-15b1-481d-8ab7-e97ef7613572.jpg?v=1725963629",
  "https://cdn.shopify.com/s/files/1/0886/3665/3863/files/41bbh12MXrL._SX679.jpg?v=1721769745",
  "https://cdn.shopify.com/s/files/1/0637/4834/1981/files/1_AARD-2108-GREEN-PEACHMODE_04a20e2a-15b1-481d-8ab7-e97ef7613572.jpg?v=1725963629",
  "https://cdn.shopify.com/s/files/1/0886/3665/3863/files/41bbh12MXrL._SX679.jpg?v=1721769745",
  "https://cdn.shopify.com/s/files/1/0637/4834/1981/files/1_AARD-2108-GREEN-PEACHMODE_04a20e2a-15b1-481d-8ab7-e97ef7613572.jpg?v=1725963629",
  "https://cdn.shopify.com/s/files/1/0886/3665/3863/files/41bbh12MXrL._SX679.jpg?v=1721769745",
  "https://cdn.shopify.com/s/files/1/0637/4834/1981/files/1_AARD-2108-GREEN-PEACHMODE_04a20e2a-15b1-481d-8ab7-e97ef7613572.jpg?v=1725963629",
  "https://cdn.shopify.com/s/files/1/0886/3665/3863/files/41bbh12MXrL._SX679.jpg?v=1721769745",
];

const ProductSlider = () => {
  return (
    <div className="w-full max-w-7xl mx-auto my-4 relative">
      {/* Icon container on top-right */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-5">
        {/* Heart Icon */}
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h256v256H0z" />
            <path
              d="M128 216S28 160 28 92a52 52 0 0 1 100-20h0a52 52 0 0 1 100 20c0 68-100 124-100 124Z"
              fill="#fff"
              stroke="#717478"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </div>

        {/* Share Icon */}
        <div>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.187 2.316v4.323c-7.655 1.08-10.936 6.484-12.03 11.887 2.735-3.782 6.562-5.511 12.03-5.511v4.43l7.655-7.564-7.655-7.565Z"
              fill="#fff"
              stroke="#717478"
            />
          </svg>
        </div>
      </div>

      {/* Swiper */}
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
            <div className="h-[450px] flex items-center justify-center">
              <img
                src={src}
                alt={`Product ${index + 1}`}
                className="max-h-full h-auto w-auto max-w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots below image */}
      <div className="custom-pagination mt-4 flex justify-center items-center"></div>

      {/* 👇 Embedded Style */}
      <style>{`
  .custom-pagination span {
    display: inline-block;
    height: 6px;
    width: 6px;
    background-color: #d1d5db; /* gray-300 */
    border-radius: 9999px;
    margin: 0 5px;
    transition: all 0.3s ease;
    opacity: 1;
  }

  .custom-pagination .swiper-pagination-bullet-active {
    width: 12px;
    background-color: #9ca3af; /* gray-400 */
  }

  .custom-pagination .swiper-pagination-bullet-active::before {
    display: none;
  }
`}</style>
    </div>
  );
};

export default ProductSlider;
