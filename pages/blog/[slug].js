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
    const { title, content, coverImage } = post;

    const imageUrl =
        coverImage?.formats?.large?.url || coverImage?.url;

    return (
        <BlockRenderer blocks={post.content} />
    );
}