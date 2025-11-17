import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const platforms = [
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/Rockstar_Games_Logo_caa1722b2e.svg',
        bg: 'bg-gradient-to-r from-indigo-800 to-pink-800',
        className: 'h-[85px] ',
    },
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/ea_082d338eac.svg',
        bg: 'bg-[#FF4747]',
        className: 'h-[75px]',
    },
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/Steam_icon_logo_svg_325f27f4ae.png',
        bg: 'bg-[#0e5d8e]',
        className: 'h-[75px]',
    },
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/Xbox_app_logo_3894c51d92.svg',
        bg: 'bg-[#107c10]',
        className: 'h-[75px]',
    },
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/playstation_8be52254c2.svg',
        bg: 'bg-[#0080FF]',
        className: 'h-[75px]',
    },
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/Nintendo_Logo_2016_78bc27d713.png',
        bg: 'bg-red-600',
        className: 'h-[75px]',
    },
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/epic_8cfb24ec4b.svg',
        bg: 'bg-[#1b1775]',
        className: 'h-[75px]',
    },
    {
        name: '',
        img: 'https://steadfast-gem-fdb13b7584.media.strapiapp.com/platform_e2194d5753.svg',
        bg: 'bg-[#4e21be]',
        className: 'h-[75px]',
    },

];

export default function PlatformSlider() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading 0.8–1 sec
        const timeout = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timeout);
    }, []);

    // ⭐ Skeleton Loader
    if (loading) {
        return (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div className="my-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Explore By Platforms
                    </h2>

                    <div className="flex gap-4 overflow-hidden no-scrollbar">
                        {Array(6)
                            .fill(0)
                            .map((_, i) => (
                                <Skeleton
                                    key={i}
                                    height={200}
                                    width={298}
                                    borderRadius={16}
                                    className="rounded-xl"
                                />
                            ))}
                    </div>
                </div>
            </SkeletonTheme>
        );
    }

    return (
        <div className="my-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Explore By Platforms</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView="auto"
                centeredSlides={false}
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 0, // No delay between transitions
                    disableOnInteraction: false,
                }}
                speed={2500} // Smooth continuous speed
                loop={true} // Infinite loop
                allowTouchMove={true}
                freeMode={true} // Enables smooth continuous flow
                grabCursor={true}
                breakpoints={{
                    375: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {platforms.map((platform, index) => (
                    <SwiperSlide key={index} className="w-[150px]">
                        <div className={`rounded-xl p-4 ${platform.bg} flex flex-col items-center justify-center h-40 text-white`}>

                            {platform.img && (
                                <img src={platform.img} alt={platform.name} className={`mb-2 rounded-lg ${platform.className || 'h-[75px]'}`} />
                            )}

                            {platform.svg && (
                                <svg className="h-[75px] w-[75px] mb-2 fill-current text-white">
                                    <use href={`/sprite/platform.svg#${platform.svg}`} />
                                </svg>
                            )}
                            <p className="text-sm font-semibold">{platform.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
