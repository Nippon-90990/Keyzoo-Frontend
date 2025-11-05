// pages/index.tsx or components/HomeHero.tsx
// import HeroSlider from '@/components/HeroSlider';
// import PromoBannerGrid from '@/components/PromoBannerGrid';
// import CategoryGrid from '@/components/CategoryGrid';
import ProductCarousel from '@/components/ProductCarousel';
import PlatformSlider from '@/components/PlatformSlider';
import DrifflePlusSection from '@/components/DrifflePlusSection';
import DiscoverByPrice from '@/components/DiscoverByPrice';
import NewsletterSection from '@/components/NewsletterSection';
import BeastSelling from '@/components/BeastSelling';
import ProductGiftCardCarousel from '@/components/ProductGiftCardCarousel';
import PromoBannerOne from '@/components/PromoBannerOne';
import HomeBanner from '@/components/HomeBanner';

const HomeHero = () => {
  return (
    <div className="px-4 md:px-10 py-8">
      <HomeBanner />
      {/* <CategoryGrid /> */}
      <ProductCarousel />
      <PlatformSlider />
      <BeastSelling />
      <DrifflePlusSection/>
      <ProductGiftCardCarousel />
      <div className='flex justify-center items-center'><DiscoverByPrice /></div>
      <NewsletterSection />
    </div>
  );
};

export default HomeHero;
