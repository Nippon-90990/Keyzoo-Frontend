import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/strapi';
import { useRouter } from "next/router";
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import useCurrency from '@/hook/useCurrency';
import HoverCard from '@/components/HoverCard';

export default function ProductGiftCardCarousel() {

    const { symbol } = useCurrency();
    const router = useRouter();
    const [products, setProducts] = useState([]);

    // Filter states
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [search, setSearch] = useState("");
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(9999);

    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    const [selectedWorksOn, setSelectedWorksOn] = useState([]);

    const [allProducts, setAllProducts] = useState([]);

    // Pagination states
    const [page, setPage] = useState(1);
    const [pageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const clearFilters = () => {
        setSelectedPlatforms([]);
        setSelectedRegions([]);
        setSelectedProductTypes([]);
        setSelectedWorksOn([]);
        setSearch("");
        setOnlyAvailable(false);
        setMinPrice(0);
        setMaxPrice(9999);
    };

    const isFilterActive =
        selectedPlatforms.length ||
        selectedRegions.length ||
        selectedProductTypes.length ||
        selectedWorksOn.length ||
        search ||
        onlyAvailable ||
        minPrice !== 0 ||
        maxPrice !== 9999;


    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             // Fetch both collections in parallel
    //             const [PlayStationsGiftCardRes, XboxGiftCardRes, SpotifyGiftCardRes, RobloxGiftCardRes] = await Promise.all([
    //                 // fetchFromStrapi('api/products?populate=*'),
    //                 fetchFromStrapi('api/play-station-gift-cards?populate=*'),
    //                 fetchFromStrapi('api/xbox-gift-cards?populate=*'),
    //                 fetchFromStrapi('api/spotify-gift-cards?populate=*'),
    //                 fetchFromStrapi('api/roblox-gift-cards?populate=*')
    //             ]);

    //             // Normalize gift cards
    //             const PlayStationsGiftCard = (PlayStationsGiftCardRes.data || []).map((item) => ({
    //                 ...item,
    //                 type: "psn"
    //             }));

    //             // Normalize gift cards
    //             const XboxGiftCard = (XboxGiftCardRes.data || []).map((item) => ({
    //                 ...item,
    //                 type: 'xbox'
    //             }));

    //             // Normalize gift cards
    //             const SpotifyGiftCard = (SpotifyGiftCardRes.data || []).map((item) => ({
    //                 ...item,
    //                 type: 'spotify'
    //             }));

    //             // Normalize gift cards
    //             const RobloxGiftCard = (RobloxGiftCardRes.data || []).map((item) => ({
    //                 ...item,
    //                 type: 'roblox'
    //             }));

    //             // Merge both collections
    //             setProducts([...PlayStationsGiftCard, ...XboxGiftCard, ...SpotifyGiftCard, ...RobloxGiftCard]);
    //         } catch (error) {
    //             console.error('Failed to fetch items:', error);
    //         }
    //     }

    //     getData();
    // }, []);

    useEffect(() => {
        const query = {
            ...(search && { search }),
            ...(selectedPlatforms.length && { platform: selectedPlatforms }),
            ...(selectedRegions.length && { region: selectedRegions }),
            ...(selectedProductTypes.length && { type: selectedProductTypes }),
            ...(selectedWorksOn.length && { worksOn: selectedWorksOn }),
            ...(onlyAvailable && { available: true }),
            ...(minPrice && { min: minPrice }),
            ...(maxPrice !== 9999 && { max: maxPrice }),
            page,
        };

        router.push({
            pathname: router.pathname,
            query,
        }, undefined, { shallow: true });

    }, [
        search,
        selectedPlatforms,
        selectedRegions,
        selectedProductTypes,   // ✅ add
        selectedWorksOn,        // ✅ add
        onlyAvailable,          // ✅ add
        minPrice,
        maxPrice,
        page,
    ]);

    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             const [
    //                 PlayStationsGiftCardRes,
    //                 XboxGiftCardRes,
    //                 SpotifyGiftCardRes,
    //                 RobloxGiftCardRes
    //             ] = await Promise.all([
    //                 fetchFromStrapi('api/play-station-gift-cards?populate=*'),
    //                 fetchFromStrapi('api/xbox-gift-cards?populate=*'),
    //                 fetchFromStrapi('api/spotify-gift-cards?populate=*'),
    //                 fetchFromStrapi('api/roblox-gift-cards?populate=*')
    //             ]);

    //             const PlayStationsGiftCard = (PlayStationsGiftCardRes.data || []).map(item => ({
    //                 ...item,
    //                 type: "psn"
    //             }));

    //             const XboxGiftCard = (XboxGiftCardRes.data || []).map(item => ({
    //                 ...item,
    //                 type: "xbox"
    //             }));

    //             const SpotifyGiftCard = (SpotifyGiftCardRes.data || []).map(item => ({
    //                 ...item,
    //                 type: "spotify"
    //             }));

    //             const RobloxGiftCard = (RobloxGiftCardRes.data || []).map(item => ({
    //                 ...item,
    //                 type: "roblox"
    //             }));

    //             const allProducts = [
    //                 ...PlayStationsGiftCard,
    //                 ...XboxGiftCard,
    //                 ...SpotifyGiftCard,
    //                 ...RobloxGiftCard
    //             ];

    //             setProducts(allProducts);
    //             setFilteredProducts(allProducts);

    //         } catch (error) {
    //             console.error('Failed to fetch items:', error);
    //         }
    //     }

    //     getData();
    // }, []);

    const fetchProducts = async () => {
        try {
            const query = new URLSearchParams();

            // 🔍 Search
            if (search) {
                query.append("filters[title][$containsi]", search);
            }

            // 🎮 Platform
            selectedPlatforms.forEach((p, i) => {
                query.append(`filters[platform][$in][${i}]`, p);
            });

            // 🌍 Region
            selectedRegions.forEach((r, i) => {
                query.append(`filters[card_region][$in][${i}]`, r);
            });

            // 📦 Product Type
            selectedProductTypes.forEach((t, i) => {
                query.append(`filters[item_type][$in][${i}]`, t);
            });

            // 🖥️ Works On
            selectedWorksOn.forEach((w, i) => {
                query.append(`filters[workPlatform][$in][${i}]`, w);
            });

            // 💰 Price
            if (minPrice > 0) {
                query.append("filters[discountPrice][$gte]", minPrice);
            }

            if (maxPrice < 9999) {
                query.append("filters[discountPrice][$lte]", maxPrice);
            }

            // ✅ Available
            if (onlyAvailable) {
                query.append("filters[Available][$eq]", true);
            }

            query.append("populate", "*");
            query.append("pagination[page]", page);
            query.append("pagination[pageSize]", pageSize);

            const res = await fetchFromStrapi(`api/gift-cards?${query.toString()}`);

            setProducts(res.data || []);
            setFilteredProducts(res.data || []);
            setTotalPages(res.meta?.pagination?.pageCount || 1);

        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        if (!router.isReady) return;

        fetchProducts();

    }, [
        search,
        selectedPlatforms,
        selectedRegions,
        selectedProductTypes,
        selectedWorksOn,
        minPrice,
        maxPrice,
        onlyAvailable,
        page,
    ]);

    useEffect(() => {
        if (!router.isReady) return;

        const { search, platform, region, min, max, type, worksOn, available } = router.query;

        if (type) setSelectedProductTypes(Array.isArray(type) ? type : [type]);
        if (worksOn) setSelectedWorksOn(Array.isArray(worksOn) ? worksOn : [worksOn]);
        if (available) setOnlyAvailable(true);

        if (search) setSearch(search);

        if (platform) {
            setSelectedPlatforms(Array.isArray(platform) ? platform : [platform]);
        }

        if (region) {
            setSelectedRegions(Array.isArray(region) ? region : [region]);
        }

        if (min) setMinPrice(Number(min));
        if (max) setMaxPrice(Number(max));

        if (router.query.page) {
            setPage(Number(router.query.page));
        }

    }, [router.isReady]);

    useEffect(() => {
        async function fetchAll() {
            const res = await fetchFromStrapi("api/gift-cards?fields[0]=platform&fields[1]=card_region&fields[2]=item_type&fields[3]=workPlatform");
            setAllProducts(res.data || []);
        }
        fetchAll();
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        setPage(1);
    }, [
        search,
        selectedPlatforms,
        selectedRegions,
        selectedProductTypes,
        selectedWorksOn,
        minPrice,
        maxPrice,
        onlyAvailable
    ]);

    // useEffect(() => {
    //     let temp = [...products];

    //     // 🔍 Search
    //     if (search) {
    //         temp = temp.filter(item =>
    //             item.title.toLowerCase().includes(search.toLowerCase())
    //         );
    //     }

    //     // 🎮 Platform
    //     // 🎮 Platforms (multi)
    //     if (selectedPlatforms.length > 0) {
    //         temp = temp.filter(item => selectedPlatforms.includes(item.type));
    //     }

    //     // 🌍 Region (multi)
    //     if (selectedRegions.length > 0) {
    //         temp = temp.filter(item => selectedRegions.includes(item.card_region));
    //     }

    //     // ✅ Available
    //     if (onlyAvailable) {
    //         temp = temp.filter(item => item.Available);
    //     }

    //     // 📦 Product Type
    //     if (selectedProductTypes.length > 0) {
    //         temp = temp.filter(item => selectedProductTypes.includes(item.item_type));
    //     }

    //     // 🖥️ Works On
    //     if (selectedWorksOn.length > 0) {
    //         temp = temp.filter(item => selectedWorksOn.includes(item.workPlatform));
    //     }

    //     // 💰 Price
    //     temp = temp.filter(item =>
    //         item.discountPrice >= minPrice && item.discountPrice <= maxPrice
    //     );

    //     setFilteredProducts(temp);

    // }, [search, selectedPlatforms, onlyAvailable, minPrice, maxPrice, products, selectedProductTypes, selectedWorksOn, selectedRegions]);

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

    const platforms = [...new Set(allProducts.map(p => p.platform).filter(Boolean))];
    const productTypes = [...new Set(allProducts.map(p => p.item_type).filter(Boolean))];
    const worksOn = [...new Set(allProducts.map(p => p.workPlatform).filter(Boolean))];
    const regions = [...new Set(allProducts.map(p => p.card_region).filter(Boolean))];

    return (

        <div className="px-4 md:px-10 py-8">

            <h2 className="text-xl font-bold mb-6 dark:text-white">
                Best Selling Gift Cards
            </h2>

            {/* 🔥 MAIN LAYOUT */}
            <div className="flex gap-6">

                {/* 🧱 LEFT FILTER SIDEBAR */}
                <div className="hidden lg:block w-[300px] shrink-0">
                    <div className="bg-[#121216] border border-white/10 p-5 rounded-2xl backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sticky top-24">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-semibold text-lg">Filters</h3>

                            <button
                                onClick={clearFilters}
                                disabled={!isFilterActive}
                                className={`text-sm ${isFilterActive ? "text-purple-400 hover:text-purple-300" : "text-gray-500 cursor-not-allowed"}`}>
                                Clear All
                            </button>
                        </div>

                        {/* 🔍 MAIN SEARCH */}
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-2">Product Name</p>

                            <input
                                type="text"
                                placeholder="Search for games, gift cards"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-[#1a1a1f] text-white text-sm"
                            />

                            <div className="mt-3 space-y-2 text-sm">
                                <label className="flex items-center gap-2 text-white">
                                    <input
                                        type="checkbox"
                                        checked={selectedRegions.includes("INDIA")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRegions(["INDIA"]);
                                            } else {
                                                setSelectedRegions([]);
                                            }
                                        }}
                                        className="accent-blue-500"
                                    />
                                    Works in India
                                </label>

                                <label className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer transition">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setOnlyAvailable(e.target.checked)}
                                        className="accent-blue-500"
                                    />
                                    Exclude out of stock products
                                </label>
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                        {/* 💰 PRICE */}
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-2">Price Range (₹)</p>

                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="0"
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                    className="w-full px-2 py-2 bg-[#1a1a1f] text-white rounded-lg text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="9999"
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full px-2 py-2 bg-[#1a1a1f] text-white rounded-lg text-sm"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/5 my-5" />

                        {/* 🎮 PLATFORM */}
                        <FilterSection
                            title="Platforms"
                            items={platforms}
                            selected={selectedPlatforms}
                            onChange={(value, checked) => {
                                setSelectedPlatforms(prev =>
                                    checked
                                        ? [...prev, value]
                                        : prev.filter(v => v !== value)
                                );
                            }}
                        />

                        {/* 📦 PRODUCT TYPE */}
                        <FilterSection
                            title="Product Type"
                            items={productTypes}
                            selected={selectedProductTypes}
                            onChange={(value, checked) => {
                                setSelectedProductTypes(prev =>
                                    checked
                                        ? [...prev, value]
                                        : prev.filter(v => v !== value)
                                );
                            }}
                        />

                        {/* 🎯 GENRES */}
                        <FilterSection
                            title="Genres"
                            items={["Action", "Adventure", "RPG", "Shooter", "Horror"]}
                            onChange={() => { }}
                        />

                        {/* 🌐 REGION */}
                        <FilterSection
                            title="Region"
                            items={regions}
                            selected={selectedRegions}
                            onChange={(value, checked) => {
                                setSelectedRegions(prev =>
                                    checked
                                        ? [...prev, value]
                                        : prev.filter(v => v !== value)
                                );
                            }}
                        />

                        {/* 🖥️ WORKS ON */}
                        <FilterSection
                            title="Works On"
                            items={worksOn}
                            selected={selectedWorksOn}
                            onChange={(value, checked) => {
                                setSelectedWorksOn(prev =>
                                    checked
                                        ? [...prev, value]
                                        : prev.filter(v => v !== value)
                                );
                            }}
                        />

                    </div>
                </div>

                {/* 🧱 RIGHT SIDE (YOUR ORIGINAL GRID — UNTOUCHED) */}
                <div className="flex-1">

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.map((item) => {
                            const getStrapiMedia = (url) => {
                                if (!url) return '';
                                if (url.startsWith('http')) return url;
                                return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
                            };

                            const imgUrl = getStrapiMedia(item.image?.url);

                            return (
                                <div key={item.id} className='mb-2 mt-2'>
                                    {item.Available ? (
                                        <Link
                                            href={`/store/category/gift-card/${item.platform}/${item.slug}`}
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
                                                <HoverCard title={item.title}>
                                                    <h3 className="text-md font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
                                                </HoverCard>
                                                <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
                                                <p className="text-lg text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
                                                    {symbol} {item.discountPrice}
                                                </p>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
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
                                                <HoverCard title={item.title}>
                                                    <h3 className="text-md font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
                                                </HoverCard>
                                                <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
                                                <p className="text-lg text-red-800 font-extrabold dark:text-gray-300 px-3 mt-2 mb-2">
                                                    Sold Out
                                                </p>
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center mt-10 gap-2 flex-wrap">

                        {/* PREV */}
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            className="px-3 py-2 rounded-lg bg-[#1a1a1f] text-white disabled:opacity-40"
                        >
                            ‹
                        </button>

                        {/* PAGE NUMBERS */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .slice(
                                Math.max(0, page - 3),
                                Math.min(totalPages, page + 2)
                            )
                            .map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-2 rounded-lg text-sm transition
                ${p === page
                                            ? "bg-purple-600 text-white"
                                            : "bg-[#1a1a1f] text-gray-300 hover:bg-white/10"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}

                        {/* NEXT */}
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            className="px-3 py-2 rounded-lg bg-[#1a1a1f] text-white disabled:opacity-40"
                        >
                            ›
                        </button>

                    </div>

                </div>
            </div>
        </div >

    );

    function FilterSection({ title, items = [], selected = [], onChange }) {
        const [search, setSearch] = useState("");

        const filteredItems = items.filter((item) =>
            String(item).toLowerCase().includes(search.toLowerCase())
        );

        return (
            <div className="mb-6">

                {/* HEADER */}
                <details className="group">

                    <summary className="flex justify-between items-center cursor-pointer text-white text-sm font-semibold hover:text-purple-400 transition">
                        {title}
                        <span className="text-gray-400 group-open:rotate-180 transition-transform duration-300">
                            ⌄
                        </span>
                    </summary>

                    {/* CONTENT */}
                    <div className="mt-4 space-y-3">

                        {/* 🔍 SEARCH */}
                        <input
                            type="text"
                            placeholder={`Search ${title}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#18181c] text-white text-sm border border-white/5 focus:border-purple-500 outline-none"
                        />

                        {/* LIST */}
                        <div className="max-h-[180px] overflow-y-auto space-y-2 pr-1 custom-scroll">

                            {filteredItems.map((item, i) => {
                                const isChecked = selected.includes(item);

                                return (
                                    <label
                                        key={i}
                                        className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-md cursor-pointer transition
                                        ${isChecked ? "bg-purple-500/10" : "hover:bg-white/5"}
                                    `}
                                    >

                                        {/* LEFT */}
                                        <div className="flex items-center gap-2">

                                            {/* CUSTOM CHECKBOX */}
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition
                                            ${isChecked
                                                    ? "bg-purple-500 border-purple-500"
                                                    : "border-white/20"}
                                        `}>
                                                {isChecked && (
                                                    <span className="text-xs text-white">✓</span>
                                                )}
                                            </div>

                                            <span className="text-sm text-white font-medium">
                                                {formatLabel(item)}
                                            </span>
                                        </div>

                                        {/* COUNT */}
                                        <span className="text-xs text-gray-500">
                                            ({
                                                allProducts.filter(p =>
                                                    p.platform === item ||
                                                    p.card_region === item ||
                                                    p.item_type === item ||
                                                    p.workPlatform === item
                                                ).length
                                            })
                                        </span>

                                        {/* INPUT (hidden but functional) */}
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => onChange(item, e.target.checked)}
                                            className="hidden"
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </details>
            </div>
        );
    }

    function formatLabel(value) {
        if (!value) return "";

        const str = String(value);

        // Special cases (important for premium feel)
        const special = {
            psn: "PlayStation",
            xbox: "Xbox",
            steam: "Steam",
            spotify: "Spotify",
            roblox: "Roblox",
            binance: "Binance"
        };

        if (special[str.toLowerCase()]) {
            return special[str.toLowerCase()];
        }

        // General capitalize
        return str
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase());
    }
}

// {/* <div className="px-4 md:px-10 py-8">
//     <section className="my-0">
//         <h2 className="text-xl font-bold mb-4 dark:text-white">Best Selling Gift Cards</h2>

//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//             {filteredProducts.map((item) => {
//                 //   const { title, slug, price, coverImage } = item.attributes;

//                 const getStrapiMedia = (url) => {
//                     if (!url) return '';
//                     if (url.startsWith('http')) return url;
//                     return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
//                 };

//                 const imgUrl = getStrapiMedia(item.image?.url);

//                 return (
//                     <div key={item.id} className='mb-2 mt-2'>
//                         {item.Available ? (<Link
//                             href={`/store/category/gift-card/${item.type}/${item.slug}`}
//                             // className="block p-1 rounded-lg hover:shadow-md transition bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto"
//                             className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
//                             <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
//                                 {/* {imageUrl && ( */}
//                                 <Image
//                                     src={imgUrl}
//                                     alt={item.title}
//                                     fill
//                                     className={`object-center transition ${item.Available ? '' : 'grayscale opacity-60'}`}
//                                 />
//                                 {/* )} */}

//                                 {/* Platform badge */}
//                                 {item.platform && (
//                                     <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded uppercase">
//                                         {item.platform}
//                                     </span>
//                                 )}

//                                 {/* Discount ribbon */}
//                                 {item.originalPrice && item.originalPrice > item.price && (
//                                     <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
//                                         -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
//                                     </span>
//                                 )}
//                             </div>
//                             <div className='bg-gray-100 dark:bg-black/30 backdrop-blur-sm px-1 py-1 rounded-b-md'>
//                                 <h3 className="text-md font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
//                                 <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
//                                 <p className="text-lg text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
//                                     {symbol} {item.discountPrice}
//                                 </p>
//                             </div>
//                         </Link>) : (<div
//                             // href={`/gift-card/${item.slug}`}
//                             // className="block p-1 rounded-lg hover:shadow-md transition bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto"
//                             className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 cursor-not-allowed">
//                             <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
//                                 {/* {imageUrl && ( */}
//                                 <Image
//                                     src={imgUrl}
//                                     alt={item.title}
//                                     fill
//                                     className={`object-center transition ${item.Available ? '' : 'grayscale opacity-60'}`}
//                                 />
//                                 {/* )} */}

//                                 {/* Platform badge */}
//                                 {item.platform && (
//                                     <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded uppercase">
//                                         {item.platform}
//                                     </span>
//                                 )}

//                                 {/* Discount ribbon */}
//                                 {item.originalPrice && item.originalPrice > item.price && (
//                                     <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">
//                                         -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
//                                     </span>
//                                 )}
//                             </div>
//                             <div className='bg-gray-100 dark:bg-black/30 backdrop-blur-sm px-1 py-1 rounded-b-md'>
//                                 <h3 className="text-md font-semibold line-clamp-2 px-3 mt-1 text-black">{item.title}</h3>
//                                 <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">{item.card_region}</h3>
//                                 <p className="text-lg text-red-800 font-extrabold dark:text-gray-300 px-3 mt-2 mb-2">
//                                     Sold Out
//                                 </p>
//                             </div>
//                         </div>)}
//                     </div>
//                 );
//             })}
//         </div>
//         {/* Show All Button */}
//         {/* <div className="flex justify-center mt-8">
//             <Link
//                 href={`/store/collection/gift-card`}
//                 className="px-6 py-2 rounded-full bg-neutral-800 text-white hover:bg-[#1a1a1a] transition"
//             >
//                 Show All
//             </Link>
//         </div> */}
//     </section>
// </div> */}

{/* <Link
    href={`/store/category/gift-card/${item.platform}/${item.slug}`}
    className="block p-1 rounded-lg bg-white dark:bg-[#1a1a1a] relative max-w-[260px] mx-auto shadow-sm dark:shadow-none hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
>
    {/* ✅ YOUR CARD UI — SAME */}
// <div className="relative w-full aspect-[3/5] mb-1.5 rounded-md overflow-hidden">
//     <Image
//         src={imgUrl}
//         alt={item.title}
//         fill
//         className="object-center"
//     />
// </div>

// <div className='bg-gray-100 dark:bg-black/30 px-1 py-1 rounded-b-md'>
//     <h3 className="text-md font-semibold line-clamp-2 px-3 mt-1 text-black">
//         {item.title}
//     </h3>
//     <h3 className="text-lg font-semibold text-blue-600 px-3 mt-1">
//         {item.card_region}
//     </h3>
//     <p className="text-lg text-gray-600 dark:text-gray-300 px-3 mt-2 mb-2">
//         {symbol} {item.discountPrice}
//     </p>
// </div>
// </Link> */}