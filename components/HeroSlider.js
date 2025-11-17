// components/HeroSlider.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { fetchFromStrapi } from '@/lib/strapi';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function getBanners() {
      const res = await fetchFromStrapi('api/hero-banners?populate=*');
      setBanners(res.data || []);
    }

    getBanners();
  }, []);

  if (!banners.length) {
    return (
      // <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="rounded-2xl overflow-hidden">
          <Skeleton height={500} borderRadius={16} />
        </div>
      // </SkeletonTheme>
    );
  }

  return (
    <>
      {/* Custom Swiper arrows styling */}
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #ffffff; /* Tailwind's red-400 */
          background: transparent !important;
          padding: 12px;
          border-radius: 9999px;
          transition: background-color 0.3s;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: rgba(0, 0, 0, 0.7);
          color: #ffffff; /* Tailwind's yellow-400 */
        }
        .swiper-pagination-bullet {
          background: #e5e7eb; /* Tailwind's gray-200 */
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          transition: background-color 0.3s, transform 0.3s;
        }

        .swiper-pagination-bullet:hover {
          background: #ffffff; /* Tailwind's red-400 */
          transform: scale(1.2);
        }

        .swiper-pagination-bullet-active {
          background: #ffffff; /* Tailwind's yellow-400 */
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="w-full h-full rounded-xl overflow-hidden"  //{/* shadow-2xl */}
      >
        {banners.map((banner) => {

          const getStrapiMedia = (url) => {
            if (!url) return '';
            if (url.startsWith('http')) return url;
            return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
          };


          const imgUrl = getStrapiMedia(banner.image?.url);

          // return (
          //   <SwiperSlide key={banner.id} >
          //     <Link href={banner.title || '#'}>
          //       <div className="relative h-[450px] w-full shadow-n">
          //       {/* <div className="relative w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[500px] xl:h-[620px]"> */}
          //         <Image src={imgUrl} alt={banner.title} fill className="object-center filter brightness-110 contrast-120 saturate-110" />
          //         <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white text-center p-6">
          //         {/* <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center p-4 sm:p-6 md:p-10"> */}
          //           {/* <h2 className="text-3xl md:text-5xl font-bold">{banner.link}</h2> */}
          //           <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">{banner.link}</h2>
          //           <p className="mt-2 text-lg md:text-xl">{banner.subtitle}</p>
          //           {/* <button className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition">
          //           Buy Now
          //         </button> */}
          //         </div>
          //       </div>
          //     </Link>
          //   </SwiperSlide>
          // );

          return (
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop
                className="rounded-2xl overflow-hidden"
              >
                {/* {slides.map((slide) => ( */}
                <SwiperSlide key={banner.id}>
                  <div className="relative h-[250px] sm:h-[320px] md:h-[400px] lg:h-[500px] w-full">
                    <Image
                      src={imgUrl}
                      alt={banner.title}
                      fill
                      className="object-center"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-6">
                      <h2 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
                        {banner.title}
                      </h2>
                      {/* <p className="text-xl font-semibold bg-[#ff4e00] px-5 py-2 rounded-md inline-block mb-4">
                          {banner.subtitle}
                        </p> */}
                      {/* <button className="bg-white text-black font-semibold px-8 py-2.5 rounded-lg hover:bg-gray-200 transition">
                          {banner.button}
                        </button> */}
                    </div>
                  </div>
                </SwiperSlide>
                {/* ))} */}
              </Swiper>
            </div>
          );

        })}
      </Swiper>
    </>
  );
};

export default HeroSlider;

