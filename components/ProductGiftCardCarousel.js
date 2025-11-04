import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import useCurrency from '@/hook/useCurrency';

export default function ProductGiftCardCarousel() {
    const { symbol } = useCurrency();
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     async function getProducts() {
    //         try {
    //             const res = await fetchFromStrapi('api/gift-cards?populate=*');
    //             // const res = await fetchFromStrapi('api/products?filters[isGiftCard][$eq]=true&populate=*');
    //             // const resImage = await fetchFromStrapi('/products?populate=image');
    //             setProducts(res.data || []);
    //             // setProducts(resImage.data || []);
    //         } catch (error) {
    //             console.error('Failed to fetch products:', error);
    //         }
    //     }

    //     getProducts();
    // }, []);

    useEffect(() => {
        async function getData() {
            try {
                // Fetch both collections in parallel
                const [PlayStationsGiftCardRes, XboxGiftCardRes, SpotifyGiftCardRes, RobloxGiftCardRes, BinanceGiftCardRes, SteamGiftCardRes] = await Promise.all([
                    // fetchFromStrapi('api/products?populate=*'),
                    fetchFromStrapi('api/play-station-gift-cards?populate=*'),
                    fetchFromStrapi('api/xbox-gift-cards?populate=*'),
                    fetchFromStrapi('api/spotify-gift-cards?populate=*'),
                    fetchFromStrapi('api/roblox-gift-cards?populate=*'),
                    fetchFromStrapi('api/binance-gift-cards?populate=*'),
                    fetchFromStrapi('api/steam-gift-cards?populate=*')
                ]);

                // Normalize gift cards
                const PlayStationsGiftCard = (PlayStationsGiftCardRes.data || []).map((item) => ({
                    ...item,
                    type: "psn"
                }));

                // Normalize gift cards
                const XboxGiftCard = (XboxGiftCardRes.data || []).map((item) => ({
                    ...item,
                    type: 'xbox'
                }));

                // Normalize gift cards
                const SpotifyGiftCard = (SpotifyGiftCardRes.data || []).map((item) => ({
                    ...item,
                    type: 'spotify'
                }));

                // Normalize gift cards
                const RobloxGiftCard = (RobloxGiftCardRes.data || []).map((item) => ({
                    ...item,
                    type: 'roblox'
                }));

                // Normalize gift cards
                const BinanceGiftCard = (BinanceGiftCardRes.data || []).map((item) => ({
                    ...item,
                    type: 'binance'
                }));

                // Normalize gift cards
                const SteamGiftCard = (SteamGiftCardRes.data || []).map((item) => ({
                    ...item,
                    type: 'steam'
                }));

                // Merge both collections
                setProducts([...PlayStationsGiftCard, ...XboxGiftCard, ...SpotifyGiftCard, ...RobloxGiftCard, ...BinanceGiftCard, ...SteamGiftCard]);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        }

        getData();
    }, []);

    return (
        <section className="my-10">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Best Selling Gift Cards</h2>

            {/* Custom Swiper arrows styling */}
            <style>
                {`
                    #swiper {
                        position: relative;
                        padding: 0 40px; /* adds space on both sides for arrows */
                    }
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
                `}
            </style>

            <Swiper
                modules={[Navigation]}
                autoplay
                spaceBetween={30}
                slidesPerView={1}
                navigation
                breakpoints={{
                    375: { slidesPerView: 1.5 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 6 },
                }}
                id='swiper'
            // className='max-w-[1500px] mx-auto'
            >
                {products.map((item) => {
                    //   const { title, slug, price, coverImage } = item.attributes;

                    const getStrapiMedia = (url) => {
                        if (!url) return '';
                        if (url.startsWith('http')) return url;
                        return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
                    };

                    const imgUrl = getStrapiMedia(item.image?.url);

                    return (
                        <SwiperSlide key={item.id} className='mb-2 mt-2'>
                            {item.Available ? (<Link
                                href={`/store/category/gift-card/${item.type}/${item.slug}`}
                                // className="block p-1 rounded-lg hover:shadow-md transition bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto"
                                className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
                                <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
                                    {/* {imageUrl && ( */}
                                    <Image
                                        src={imgUrl}
                                        alt={item.title}
                                        fill
                                        className={`object-center transition ${item.Available ? '' : 'grayscale opacity-60'}`}
                                    />
                                    {/* )} */}

                                    {/* Platform badge */}
                                    {item.platform && (
                                        <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded uppercase">
                                            {item.platform}
                                        </span>
                                    )}

                                    {/* Discount ribbon */}
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
                                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                        </span>
                                    )}
                                </div>
                                <div className='bg-gray-100 dark:bg-black/30 backdrop-blur-sm px-1 py-1 rounded-b-md'>
                                    <h3 className="text-sm font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
                                    <h3 className="text-sm font-semibold text-blue-600 px-3 mt-1 line-clamp-1">{item.card_region}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
                                        {symbol} {Number(item.discountPrice).toFixed(2)}
                                    </p>
                                </div>
                            </Link>) : (<div
                                // href={`/gift-card/${item.slug}`}
                                // className="block p-1 rounded-lg hover:shadow-md transition bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto"
                                className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 cursor-not-allowed">
                                <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
                                    {/* {imageUrl && ( */}
                                    <Image
                                        src={imgUrl}
                                        alt={item.title}
                                        fill
                                        className={`object-center transition ${item.Available ? '' : 'grayscale opacity-60'}`}
                                    />
                                    {/* )} */}

                                    {/* Platform badge */}
                                    {item.platform && (
                                        <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded uppercase">
                                            {item.platform}
                                        </span>
                                    )}

                                    {/* Discount ribbon */}
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
                                            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                        </span>
                                    )}
                                </div>
                                <div className='bg-gray-100 dark:bg-black/30 backdrop-blur-sm px-1 py-1 rounded-b-md'>
                                    <h3 className="text-md font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
                                    <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
                                    <p className="text-lg text-[#B22222] font-extrabold dark:text-gray-300 px-3 mt-2 mb-2">
                                        Sold Out
                                    </p>
                                </div>
                            </div>)}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {/* Show All Button */}
            <div className="flex justify-center mt-8">
                <Link
                    href={`/store/collection/gift-card`}
                    className="px-6 py-2 rounded-full bg-neutral-800 text-white hover:bg-[#1a1a1a] transition"
                >
                    Show All
                </Link>
            </div>
        </section>
    );
}
