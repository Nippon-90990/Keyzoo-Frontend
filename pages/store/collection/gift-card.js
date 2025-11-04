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

    useEffect(() => {
        async function getData() {
            try {
                // Fetch both collections in parallel
                const [PlayStationsGiftCardRes,XboxGiftCardRes,SpotifyGiftCardRes,RobloxGiftCardRes] = await Promise.all([
                    // fetchFromStrapi('api/products?populate=*'),
                    fetchFromStrapi('api/play-station-gift-cards?populate=*'),
                    fetchFromStrapi('api/xbox-gift-cards?populate=*'),
                    fetchFromStrapi('api/spotify-gift-cards?populate=*'),
                    fetchFromStrapi('api/roblox-gift-cards?populate=*')
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

                // Merge both collections
                setProducts([...PlayStationsGiftCard, ...XboxGiftCard, ...SpotifyGiftCard, ...RobloxGiftCard]);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        }

        getData();
    }, []);

    if (!products || products.length === 0) {
        return (
            <section className="my-0 flex items-center justify-center flex-col min-h-screen">
                <Image
                    src="/3d/no-data.png"
                    alt="No Data"
                    width={512}
                    height={512}
                    className="mb-4">
                </Image>
                {/* <h2 className="text-xl font-bold mb-4 dark:text-white">
              Best Selling Games
            </h2>
            <p className="text-gray-500">No products found in Best Selling.</p> */}
            </section>
        );
    }

    return (
        <div className="px-4 md:px-10 py-8">
            <section className="my-0">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Best Selling Gift Cards</h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {products.map((item) => {
                        //   const { title, slug, price, coverImage } = item.attributes;

                        const getStrapiMedia = (url) => {
                            if (!url) return '';
                            if (url.startsWith('http')) return url;
                            return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
                        };

                        const imgUrl = getStrapiMedia(item.image?.url);

                        return (
                            <div key={item.id} className='mb-2 mt-2'>
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
                                        <h3 className="text-md font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
                                        <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
                                            {symbol} {item.discountPrice}
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
                                        <p className="text-lg text-red-800 font-extrabold dark:text-gray-300 px-3 mt-2 mb-2">
                                            Sold Out
                                        </p>
                                    </div>
                                </div>)}
                            </div>
                        );
                    })}
                </div>
                {/* Show All Button */}
                {/* <div className="flex justify-center mt-8">
                    <Link
                        href={`/store/collection/gift-card`}
                        className="px-6 py-2 rounded-full bg-neutral-800 text-white hover:bg-[#1a1a1a] transition"
                    >
                        Show All
                    </Link>
                </div> */}
            </section>
        </div>
    );
}
