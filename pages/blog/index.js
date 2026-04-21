import BlogCard from "@/components/Blog/BlogCard";
import { use } from "react";

// export async function getServerSideProps() {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs?populate=*`
//     );
//     const data = await res.json();

//     return {
//         props: {
//             posts: data.data,
//         },
//     };
// }



export async function getServerSideProps() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs?populate=*`
        );

        const data = await res.json();

        return {
            props: {
                posts: data.data || [],
            },
        };
    } catch (error) {
        return {
            props: {
                posts: [],
            },
        };
    }
}

export default function BlogPage({ posts }) {
    return (
        <div className="min-h-screen px-6 py-10">
            <h1 className="text-3xl text-white font-bold mb-8">Guides</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}