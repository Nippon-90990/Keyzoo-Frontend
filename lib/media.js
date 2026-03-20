// this file is used to load media files (images, audio, video) using cloudinary and also strapi media library

export function getStrapiMedia(url) {
    if (!url) return null;

    // If already absolute (Cloudinary or external)
    if (url.startsWith("http") || url.startsWith("https")) {
        return url;
    }

    // If relative (Strapi local upload)
    return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
}