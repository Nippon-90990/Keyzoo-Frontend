import BlockRenderer from "@/components/Blog/BlockRenderer";

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}api/blogs?filters[slug][$eq]=${params.slug}&populate=*`
    );

    const data = await res.json();

    return {
        props: {
            post: data.data[0],
        },
    };
}

export default function BlogPost({ post }) {
    const { title, content } = post;

    return (
        <div className="min-h-screen">

            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {title}
                </h1>

                {/* Content */}
                <BlockRenderer blocks={content} />

            </div>

        </div>
    );
}