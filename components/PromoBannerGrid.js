// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { fetchFromStrapi } from '@/lib/strapi';

// const PromoBannerGrid = () => {
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     async function fetchPromoBanners() {
//       try {
//         const res = await fetchFromStrapi('/promo-banners?populate=image');
//         setBanners(res.data || []);
//       } catch (err) {
//         console.error('Failed to load promo banners:', err);
//       }
//     }

//     fetchPromoBanners();
//   }, []);

//   return (
//     <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1200px] mx-auto py-8 px-4">
//       {banners.map((item) => {
//         const { id, attributes } = item;
//         const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${attributes?.image?.data?.attributes?.url}`;

//         return (
//           <Link key={id} href={'/'} className="group">
//             <div className="relative rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-zinc-900">
//               {imageUrl && (
//                 <Image
//                   src={imageUrl}
//                   alt={attributes.title}
//                   width={500}
//                   height={300}
//                   className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
//                 />
//               )}
//               <div className="p-4 text-white text-center">
//                 <h3 className="text-lg font-bold">{attributes.title}</h3>
//                 <p className="text-sm text-zinc-400">{attributes.subtitle}</p>
//               </div>
//             </div>
//           </Link>
//         );
//       })}
//     </section>
//   );
// };

// export default PromoBannerGrid;


// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { fetchFromStrapi } from '@/lib/strapi';

// const PromoBannerGrid = () => {
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     async function fetchPromoBanners() {
//       try {
//         const res = await fetchFromStrapi('/promo-banners');
//         setBanners(res.data || []);
//       } catch (err) {
//         console.error('Failed to load promo banners:', err);
//       }
//     }

//     fetchPromoBanners();
//   }, []);

//   return (
//     <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1200px] mx-auto py-8 px-4">
//       {banners.map((item) => {
//         const imageUrl = item.image?.url
//           ? `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${item.image.url}`
//           : null;

//         return (
//           <Link
//             key={item.id}
//             href={item.link?.startsWith('http') ? item.link : `https://${item.link}`}
//             className="group"
//           >
//             <div className="relative rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-zinc-900">
//               {imageUrl && (
//                 <Image
//                   src={imageUrl}
//                   alt={item.title || 'Promo Banner'}
//                   width={500}
//                   height={300}
//                   className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
//                 />
//               )}
//               <div className="p-4 text-white text-center">
//                 <h3 className="text-lg font-bold">{item.title}</h3>
//                 <p className="text-sm text-zinc-400">{item.subtitle}</p>
//               </div>
//             </div>
//           </Link>
//         );
//       })}
//     </section>
//   );
// };

// export default PromoBannerGrid;



import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFromStrapi } from '@/lib/strapi';

const PromoBannerGrid = () => {
  const [banners, setBanners] = useState([]);


  useEffect(() => {
    async function fetchPromoBanners() {
      try {
        const res = await fetchFromStrapi('api/promo-banners?populate=image');
        setBanners(res.data || []);
      } catch (err) {
        console.error('Failed to load promo banners:', err);
      }
    }

    fetchPromoBanners();
  }, []);

  //   const linkUrl = attributes.link?.startsWith('http') ? attributes.link : `https://${attributes.link}`;


  return (
    <div className="grid gap-4">
    {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">*/}
      {banners.map((item) => {
        const getStrapiMedia = (url) => {
          if (!url) return '';
          if (url.startsWith('http')) return url;
          return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
        };


        const imgUrl = getStrapiMedia(item.image?.url);
        const linkHref = item.subtitle && item.subtitle.trim() !== '' ? item.subtitle : '#';
        

        return (
          <Link key={item.id} href={linkHref} className="group">
            {/* <div className="filter brightness-110 contrast-105 relative h-[215px] w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-[2/1] object-cover"> */}
            <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* {imageUrl && ( */}
              <Image
                src={imgUrl}
                alt={item.title}
                fill
                // objectFit='center'
                className="w-full h-[200px] transition-transform group-hover:scale-105"   // {/* filter brightness-110 contrast-120 saturate-110 */}
              />
              {/* // )} */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4 text-white">
                <h3 className="text-xl font-bold">{item.title}</h3>
                {/* <button className="mt-6 bg-white text-black font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition">{item.button}</button> */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PromoBannerGrid;
