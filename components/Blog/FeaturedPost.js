import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/media";

export default function FeaturedPost({ post }) {
    if (!post) return null;

    const image = getStrapiMedia(post.coverImage?.url);
    const AdBlog_image = post.FeaturedPost_image?.url;

    return (
        <Link href={`/blog/${post.slug}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[16/6] cursor-pointer group">
                <Image
                    src={AdBlog_image}
                    alt={post.title}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                    {/* <h2 className="text-white text-2xl md:text-3xl font-bold">
                        {post.title}
                    </h2> */}

                    {/* <p className="text-gray-300 mt-2 line-clamp-2">
                        {post.excerpt}
                    </p> */}

                    {/* <div className="flex items-center gap-3 mt-4">
                        <div className="w-8 h-8 rounded-full bg-gray-500" />
                        <p className="text-sm text-gray-300">Admin • {post.publishedAt}</p>
                    </div> */}
                </div>
            </div>
        </Link>
    );
}