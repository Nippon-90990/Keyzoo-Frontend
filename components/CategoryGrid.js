import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFromStrapi } from '@/lib/strapi';
import Skeleton from 'react-loading-skeleton';

const CategoryGrid = () => {
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

  if (!banners.length) {
      return (
        // <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton height={210} borderRadius={16} />
        // </SkeletonTheme>
      );
    }

  return (
    <div>
      {banners.map((item) => {
        const getStrapiMedia = (url) => {
          if (!url) return '';
          if (url.startsWith('http')) return url;
          return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
        };

        const imgUrl = getStrapiMedia(item.image?.url);
        const linkHref = item.subtitle && item.subtitle.trim() !== '' ? item.subtitle : '#';

        return (
          <div className="flex flex-col gap-4.5">
            <Link key={item.id} href="#">
              <div className="relative h-[210px] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition">
                <Image
                  src={imgUrl}
                  alt={item.title}
                  fill
                  className="object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5 text-white">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  {/* <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold px-4 py-1 rounded-full w-fit">
                    {item.button}
                  </span> */}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
