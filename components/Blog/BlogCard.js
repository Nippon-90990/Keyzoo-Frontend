import Link from "next/link";

export default function BlogCard({ post }) {
    const { title, slug, excerpt, coverImage } = post;

    const imageUrl = post.coverImage?.url;

    return (
        <Link href={`/blog/${slug}`}>
            <div className="bg-[#1e293b] rounded-xl overflow-hidden hover:translate-y-[-5px] transition cursor-pointer">
                <img src={imageUrl} className="w-full h-48 object-cover" />

                <div className="p-4">
                    <h2 className="text-white text-lg font-semibold line-clamp-2">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {excerpt}
                    </p>
                </div>
            </div>
        </Link>
    );
}