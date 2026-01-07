// export const getStrapiMedia = (url) => {
//     if (!url) return "";

//     if (url.startsWith("http")) {
//         if (url.includes("res.cloudinary.com")) {
//             return url.replace(
//                 "/image/upload/",
//                 // "/image/upload/f_auto,q_auto,e_auto_color,e_saturation:30,e_vibrance:40,e_contrast:20,e_sharpen:150/"
//                 "/f_auto,q_auto,e_auto_color,e_saturation:60,e_vibrance:70,e_contrast:35,e_sharpen:200/"
//             );
//         }
//         return url;
//     }

//     return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
// };



export const getStrapiMedia = (url) => {
    if (!url) return "";

    // Cloudinary image
    if (url.includes("res.cloudinary.com")) {
        const [base, rest] = url.split("/image/upload/");
        if (!rest) return url;

        return `${base}/image/upload/f_auto,q_auto,e_auto_color,e_brightness:35,e_saturation:60,e_vibrance:70,e_contrast:35,e_sharpen:200/${rest}`;
    }

    // Absolute non-cloudinary URL
    if (url.startsWith("http")) return url;

    // Local Strapi media
    return `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${url}`;
};
