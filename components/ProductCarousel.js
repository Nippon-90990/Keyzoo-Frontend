// // components/ProductCarousel.js
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Image from 'next/image';
// import Link from 'next/link';

// const products = [
//     {
//         id: 1,
//         title: 'Elden Ring',
//         price: 49.99,
//         image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//         slug: 'elden-ring',
//     },
//       {
//         id: 2,
//         title: 'FIFA 24',
//         price: 39.99,
//         image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//         slug: 'fifa-24',
//       },
//       {
//         id: 3,
//         title: 'Cyberpunk 2077',
//         price: 29.99,
//         image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//         slug: 'cyberpunk-2077',
//       },
//       {
//         id: 4,
//         title: 'God of War Ragnarok',
//         price: 59.99,
//         image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//         slug: 'god-of-war-ragnarok',
//       },
// ];

// export default function ProductCarousel() {
//     return (
//         <section className="my-10">
//             <h2 className="text-xl font-bold mb-4 dark:text-white">Featured Products</h2>
//             <Swiper
//                 modules={[Navigation]}
//                 spaceBetween={20}
//                 slidesPerView={1}
//                 navigation
//                 breakpoints={{
//                     640: { slidesPerView: 2 },
//                     768: { slidesPerView: 3 },
//                     1024: { slidesPerView: 4 },
//                 }}
//             >
//                 {products.map((product) => (
//                     <SwiperSlide key={product.id}>
//                         <Link
//                             href={`/product/${product.slug}`}
//                             className="block p-2 rounded-lg shadow hover:shadow-md transition bg-white dark:bg-[#1a1a1a] max-w-[250px] mx-auto relative"
//                         >
//                             {/* Discount Ribbon */}
//                             {product.originalPrice && product.originalPrice > product.price && (
//                                 <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded z-10">
//                                     -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
//                                 </div>
//                             )}

//                             <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
//                                 <Image
//                                     src={product.image}
//                                     alt={product.title}
//                                     fill
//                                     className="object-cover"
//                                 />
//                             </div>

//                             {/* Platform Badge */}
//                             {product.platform && (
//                                 <span className={`text-[10px] font-semibold text-white px-2 py-0.5 rounded ${platformColors[product.platform] || 'bg-gray-500'}`}>
//                                     {product.platform}
//                                 </span>
//                             )}

//                             <h3 className="text-sm font-semibold truncate mt-1 dark:text-white">
//                                 {product.title}
//                             </h3>
//                             <p className="text-sm text-gray-600 dark:text-gray-300">
//                                 ${product.price.toFixed(2)}
//                                 {product.originalPrice && (
//                                     <span className="line-through text-xs text-gray-400 ml-1">
//                                         ${product.originalPrice.toFixed(2)}
//                                     </span>
//                                 )}
//                             </p>

//                         </Link>
//                     </SwiperSlide>

//                 ))}
//             </Swiper>
//         </section>
//     );
// }

// components/ProductCarousel.js
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Image from 'next/image';
// import Link from 'next/link';

// const products = [
//   {
//     id: 1,
//     title: 'Elden Ring',
//     price: 49.99,
//     platform: 'Steam',
//     image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//     slug: 'elden-ring',
//     originalPrice: 59.99,
//   },
//   {
//     id: 2,
//     title: 'FIFA 24',
//     price: 39.99,
//     platform: 'PS5',
//     image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//     slug: 'fifa-24',
//     originalPrice: 49.99,
//   },
//   {
//     id: 3,
//     title: 'Cyberpunk 2077',
//     price: 29.99,
//     platform: 'Steam',
//     image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//     slug: 'cyberpunk-2077',
//     originalPrice: 39.99,
//   },
//   {
//     id: 4,
//     title: 'God of War Ragnarok',
//     price: 59.99,
//     platform: 'PS5',
//     image: 'https://static.driffle.com/fit-in/720x512/media-gallery/production/a280f68b-b11a-468d-bddb-77d95e4231a4_library-600x900-2xjpg',
//     slug: 'god-of-war-ragnarok',
//   },
// ];

// const platformColors = {
//   Steam: 'bg-blue-600',
//   PS5: 'bg-indigo-500',
// };

// export default function ProductCarousel() {
//   return (
//     <section className="my-10">
//       <h2 className="text-xl font-bold mb-4 dark:text-white">Featured Products</h2>
//       <Swiper
//         modules={[Navigation]}
//         spaceBetween={0}
//         slidesPerView={2}
//         navigation
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 5 },
//         }}
//         className="-mx-2"
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product.id} className="px-2">
//             <Link
//               href={`/product/${product.slug}`}
//               className="block rounded-xl bg-white dark:bg-[#1a1a1a] overflow-hidden relative"
//             >
//               {product.originalPrice && product.originalPrice > product.price && (
//                 <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded z-10">
//                   -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
//                 </div>
//               )}

//               <div className="relative w-full aspect-[3/4]">
//                 <Image
//                   src={product.image}
//                   alt={product.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-2">
//                 {product.platform && (
//                   <span className={`text-[10px] font-semibold text-white px-2 py-0.5 rounded ${platformColors[product.platform] || 'bg-gray-500'}`}>
//                     {product.platform}
//                   </span>
//                 )}

//                 <h3 className="text-[13px] font-semibold mt-1 truncate dark:text-white">{product.title}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-300">
//                   ${product.price.toFixed(2)}
//                   {product.originalPrice && (
//                     <span className="line-through text-xs text-gray-400 ml-1">
//                       ${product.originalPrice.toFixed(2)}
//                     </span>
//                   )}
//                 </p>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// }



import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import useCurrency from '@/hook/useCurrency';

export default function ProductCarousel() {
    const { symbol } = useCurrency();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const res = await fetchFromStrapi('api/products?filters[hideRecomend][$eq]=false&populate=*');
                // const resImage = await fetchFromStrapi('/products?populate=image');
                setProducts(res.data || []);
                // setProducts(resImage.data || []);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        }

        getProducts();
    }, []);

    return (
        <section className="my-10">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Recommended For You</h2>
            <Swiper
                // modules={[Navigation]}
                autoplay
                spaceBetween={20}
                slidesPerView={1}
                // navigation
                breakpoints={{
                    375: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 6 },
                }}
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
                                href={`/product/${item.slug}`}
                                // className="block p-1 rounded-lg hover:shadow-md transition bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto"
                                className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
                                    {/* {imageUrl && ( */}
                                    <Image
                                        src={imgUrl}
                                        alt={item.title}
                                        fill
                                        className="object-center"
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
                                    <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
                                        {symbol} {Number(item.discountPrice).toFixed(2)}
                                    </p>
                                </div>
                            </Link>) : (<div
                                href={`/product/${item.slug}`}
                                // className="block p-1 rounded-lg hover:shadow-md transition bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto"
                                className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 cursor-not-allowed"
                            >
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
                                    <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
                                        Sold Out
                                    </p>
                                </div>
                            </div>)}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}
