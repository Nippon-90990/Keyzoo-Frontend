// // components/AZNav.js
// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

// export default function AZNav() {
//     const scrollTo = (letter) => {
//         const el = document.getElementById(`section-${letter}`)
//         if (el) {
//             el.scrollIntoView({ behavior: "smooth", block: "start" })
//         }
//     }

//     return (
//         <div className="sticky top-20 z-20 mb-12">
//             <div className="mx-auto max-w-6xl rounded-xl border border-white/10 bg-[#0e0e0e] px-4 py-3">
//                 <div className="flex flex-wrap justify-center gap-4">
//                     {letters.map((l) => (
//                         <button
//                             key={l}
//                             onClick={() => scrollTo(l)}
//                             className="
//                 text-sm font-medium
//                 text-white/60
//                 hover:text-white
//                 transition
//               "
//                         >
//                             {l}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }





// components/AZNav.js
import { useEffect, useState } from "react"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export default function AZNav({ activeLetter }) {
//   const scrollTo = (letter) => {
//     const el = document.getElementById(`section-${letter}`)
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "start" })
//     }
//   }

const scrollTo = (letter) => {
  const el = document.getElementById(`section-${letter}`)
  if (!el) return

  const y =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    120 // header + nav offset

  window.scrollTo({
    top: y,
    behavior: "smooth"
  })
}


  return (
    <div className="sticky top-30 z-30 mb-12">
      <div className="mx-auto max-w-6xl rounded-xl border border-white/10 bg-gradient-to-b from-[#111] to-[#0a0a0a] backdrop-blur px-4 py-3">
        <div className="flex flex-wrap justify-center gap-4">
          {letters.map((l) => {
            const isActive = activeLetter === l

            return (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`
                  text-sm font-medium transition
                  ${isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white"}
                `}
              >
                {l}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
