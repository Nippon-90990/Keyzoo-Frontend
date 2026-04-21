import Link from "next/link";

export default function BlogCard({ post }) {
    const image =
        post.coverImage?.formats?.small?.url || post.coverImage?.url;

    return (
        <Link href={`/blog/${post.slug}`}>
            <div className="group cursor-pointer bg-purple-100/10 rounded-xl p-4">

                <div className="overflow-hidden rounded-xl aspect-[16/9]">
                    <img
                        src={image}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        alt={post.title}
                    />
                </div>

                <p className="text-indigo-400 text-sm mt-3">
                    {post.category?.name || "Guide"}
                </p>

                <h3 className="text-white font-semibold text-lg mt-1 group-hover:text-indigo-400 transition">
                    {post.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {post.excerpt}
                </p>

                <div className="flex items-center gap-2 mt-4">
                    <div className="w-6 h-6 bg-gray-500 rounded-full" />
                    <p className="text-gray-400 text-sm">
                        {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                </div>

            </div>
        </Link>
    );
}