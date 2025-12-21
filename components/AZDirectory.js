// // components/AZDirectory.js
// import { azData } from "@/data/azData"

// export default function AZDirectory() {
//     return (
//         <div className="space-y-16">
//             {Object.entries(azData).map(([letter, items]) => (
//                 <section key={letter} id={`section-${letter}`}>
//                     {/* Letter Header */}
//                     <h2 className="mb-6 text-lg font-semibold text-white">
//                         {letter}
//                     </h2>

//                     {/* Two-column premium grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-3">
//                         {items.map((item) => (
//                             <a
//                                 key={item}
//                                 href="#"
//                                 className="
//                   block text-sm
//                   text-white/80
//                   hover:text-white
//                   transition
//                 "
//                             >
//                                 {item}
//                             </a>
//                         ))}
//                     </div>
//                 </section>
//             ))}
//         </div>
//     )
// }




// // components/AZDirectory.js
// import { useEffect, useMemo, useState } from "react"
// import { azData } from "@/data/azData"

// export default function AZDirectory({ search, onActiveChange }) {
//   // Filtered data based on search
//   const filteredData = useMemo(() => {
//     if (!search) return azData

//     const lower = search.toLowerCase()
//     const result = {}

//     Object.entries(azData).forEach(([letter, items]) => {
//       const matched = items.filter((i) =>
//         i.toLowerCase().includes(lower)
//       )
//       if (matched.length) result[letter] = matched
//     })

//     return result
//   }, [search])

//   // Scroll spy
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const letter = entry.target.id.replace("section-", "")
//             onActiveChange(letter)
//           }
//         })
//       },
//       { rootMargin: "-40% 0px -55% 0px" }
//     )

//     Object.keys(filteredData).forEach((l) => {
//       const el = document.getElementById(`section-${l}`)
//       if (el) observer.observe(el)
//     })

//     return () => observer.disconnect()
//   }, [filteredData, onActiveChange])

//   return (
//     <div className="space-y-16">
//       {Object.entries(filteredData).map(([letter, items]) => (
//         <section key={letter} id={`section-${letter}`}>
//           <h2 className="mb-6 text-lg font-semibold text-white">
//             {letter}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-3">
//             {items.map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="
//                   block text-sm
//                   text-white/80
//                   hover:text-white
//                   transition
//                 "
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   )
// }


// // components/AZDirectory.js
// import { useEffect, useRef } from "react"

// export default function AZDirectory({ data, search, onActiveChange }) {
//   const observer = useRef(null)

//   useEffect(() => {
//     const sections = document.querySelectorAll("[data-letter]")

//     observer.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             onActiveChange(entry.target.dataset.letter)
//           }
//         })
//       },
//       {
//         rootMargin: "-40% 0px -50% 0px",
//         threshold: 0
//       }
//     )

//     sections.forEach((s) => observer.current.observe(s))
//     return () => observer.current.disconnect()
//   }, [onActiveChange])

//   return (
//     <div className="space-y-20">
//       {Object.entries(data).map(([letter, items]) => {
//         const filtered = items.filter((item) =>
//           item.toLowerCase().includes(search.toLowerCase())
//         )

//         if (!filtered.length) return null

//         return (
//           <section
//             key={letter}
//             id={`section-${letter}`}
//             data-letter={letter}
//           >
//             <h2 className="mb-6 text-xl font-semibold tracking-wide">
//               {letter}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-24">
//               {filtered.map((name) => (
//                 <a
//                   key={name}
//                   href="#"
//                   className="
//                     text-white/80
//                     hover:text-white
//                     transition
//                   "
//                 >
//                   {name}
//                 </a>
//               ))}
//             </div>
//           </section>
//         )
//       })}
//     </div>
//   )
// }
// components/AZDirectory.js
import { useEffect, useRef } from "react"

export default function AZDirectory({ data, search, onActiveChange }) {
  const observer = useRef(null)

  useEffect(() => {
    const sections = document.querySelectorAll("[data-letter]")

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onActiveChange(entry.target.dataset.letter)
          }
        })
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
      }
    )

    sections.forEach((s) => observer.current.observe(s))
    return () => observer.current.disconnect()
  }, [onActiveChange])

  return (
    <div className="space-y-20">
      {Object.entries(data).map(([letter, items]) => {
        const filtered = items.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        )

        if (!filtered.length) return null

        return (
          <section
            key={letter}
            id={`section-${letter}`}
            data-letter={letter}
          >
            <h2 className="mb-6 text-xl font-semibold tracking-wide">
              {letter}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-24">
              {filtered.map((name) => (
                <a
                  key={name}
                  href="#"
                  className="
                    text-white/80
                    hover:text-white
                    transition
                  "
                >
                  {name}
                </a>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
