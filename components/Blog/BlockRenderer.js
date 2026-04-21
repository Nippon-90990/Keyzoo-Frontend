export default function BlockRenderer({ blocks }) {
    if (!blocks) return null;

    return (
        <div className="space-y-8">
            {blocks.map((block, index) => {
                switch (block.__component) {
                    case "blog.heading-block":
                        return (
                            <h2 key={index} className="text-2xl font-bold text-white">
                                {block.text}
                            </h2>
                        );

                    case "blog.text-block":
                        return (
                            <div
                                key={index}
                                className="prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: block.text }}
                            />
                        );

                    case "blog.image-block": {
                        const imageUrl = block.image?.url;
                        return (
                            <div key={index}>
                                <img
                                    src={imageUrl}
                                    className="rounded-xl w-full"
                                    alt="blog"
                                />
                                {block.caption && (
                                    <p className="text-gray-400 text-sm mt-2">
                                        {block.caption}
                                    </p>
                                )}
                            </div>
                        );
                    }

                    case "blog.step-block": {
                        const imageUrl = block.image?.url;
                        return (
                            <div key={index} className="space-y-4">
                                <h3 className="text-xl font-semibold text-white">
                                    {block.stepNumber}. {block.title}
                                </h3>

                                <div
                                    className="prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: block.description,
                                    }}
                                />

                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        className="rounded-xl w-full"
                                        alt={block.title}
                                    />
                                )}
                            </div>
                        );
                    }

                    default:
                        return null;
                }
            })}
        </div>
    );
}