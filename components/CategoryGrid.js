// import { fetchFromStrapi } from '@/lib/strapi';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import React from 'react';


// export default function CategoryGrid() {

//   const [categoriesBanner, setCategoriesBanner] = useState([]);

//   useEffect(() => {
//     async function categoriesBanner() {
//       try {
//         const res = await fetchFromStrapi('/category-banners?populate=image');
//         setCategoriesBanner(res.data || []);
//       } catch (err) {
//         console.error('Failed to load promo banners:', err);
//       }
//     }

//     categoriesBanner();
//   }, []);



//   return (
//     <>
//       {categoriesBanner.map((item) => {
//         const imageUrl = item.image?.url ? `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${item.image.url}` : null;

//         return (
//           <section className='mt-5'>
//             <div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

//                 <Link
//                   key={item.id}
//                   href={'#'}
//                   className="relative aspect-[2.8/1] rounded-2xl overflow-hidden shadow-md group">
//                   <Image
//                     src={imageUrl}
//                     alt={item.title}
//                     fill
//                     className="object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
//                     <span className="bg-white text-black text-xs font-semibold px-4 py-1 rounded-full shadow">
//                       {item.title}
//                     </span>
//                   </div>
//                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
//                 </Link>

//               </div>
//             </div>
//           </section>
//         )
//       })}
//     </>

//   );
// }

import { fetchFromStrapi } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';

export default function CategoryGrid() {
  const [categoriesBanner, setCategoriesBanner] = useState([]);

  useEffect(() => {
    async function getCategoryBanners() {
      try {
        const res = await fetchFromStrapi('api/category-banners?populate=image');
        setCategoriesBanner(res.data || []);
      } catch (err) {
        console.error('Failed to load category banners:', err);
      }
    }

    getCategoryBanners();
  }, []);

  return (
    <section className="mt-5">
      {/* <div className="container mx-auto px-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriesBanner.map((item) => {

          const getStrapiMedia = (url) => {
            if (!url) return '';
            if (url.startsWith('http')) return url;
            return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
          };

          const imgUrl = getStrapiMedia(item.image?.url);
          const linkHref = item.subtitle && item.subtitle.trim() !== '' ? item.subtitle : '#';

          return (
            <Link
              key={item.id}
              href={linkHref}
              className="relative aspect-[2.8/1] rounded-2xl overflow-hidden shadow-md group"
            >
              <Image
                src={imgUrl}
                alt={item.title || 'Banner'}
                fill
                objectFit='center'
                className=" transition-transform duration-300 group-hover:scale-105"
              />
              {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-white text-black text-xs font-semibold px-4 py-1 rounded-full shadow">
                    {item.title}
                  </span>
                </div> */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
            </Link>
          );
        })}
      </div>
      {/* </div> */}
    </section>
  );
}
