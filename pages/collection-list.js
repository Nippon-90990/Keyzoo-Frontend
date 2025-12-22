// // pages/explore.js
// import { useState } from "react"
// import Head from "next/head"
// import AZNav from "@/components/AZNav"
// import AZDirectory from "@/components/AZDirectory"

// export default function ExplorePage() {
//   const [search, setSearch] = useState("")
//   const [activeLetter, setActiveLetter] = useState("A")

//   return (
//     <>
//       <Head>
//         <title>Explore Games & Categories | Keyzoo</title>
//       </Head>

//       <section className="min-h-screen bg-black text-white">
//         <div className="mx-auto max-w-7xl px-6 py-16">

//           {/* Header */}
//           <h1 className="mb-6 text-3xl font-semibold tracking-tight">
//             Explore Games & Categories
//           </h1>

//           {/* Search */}
//           <div className="mb-10 max-w-md">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search games, publishers, categories..."
//               className="
//                 w-full rounded-lg
//                 bg-[#111] border border-white/10
//                 px-4 py-2.5 text-sm
//                 text-white placeholder:text-white/40
//                 focus:outline-none focus:ring-1 focus:ring-white/20
//               "
//             />
//           </div>

//           {/* Alphabet Navigation */}
//           <AZNav activeLetter={activeLetter} />

//           {/* Directory */}
//           <AZDirectory
//             search={search}
//             onActiveChange={setActiveLetter}
//           />

//         </div>
//       </section>
//     </>
//   )
// }





// pages/explore.js
import { useState } from "react"
import Head from "next/head"
import AZNav from "@/components/AZNav"
import AZDirectory from "@/components/AZDirectory"
import { azData } from "@/data/azData"

export default function ExplorePage() {
  const [search, setSearch] = useState("")
  const [activeLetter, setActiveLetter] = useState("A")

  return (
    <>
      <Head>
        <title>Explore Games & Categories | Keyzoo</title>
      </Head>

      <section className="min-h-screen text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <h1 className="mb-6 text-3xl font-semibold tracking-tight">
            Explore Games & Categories
          </h1>

          {/* Search */}
          <div className="mb-10 max-w-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games, publishers, categories..."
              className="
                w-full rounded-lg
                bg-[#111] border border-white/10
                px-4 py-2.5 text-sm
                text-white placeholder:text-white/40
                focus:outline-none focus:ring-1 focus:ring-white/20
              "
            />
          </div>

          {/* Sticky A–Z Nav */}
          <AZNav activeLetter={activeLetter} />

          {/* Directory */}
          <AZDirectory
            data={azData}
            search={search}
            onActiveChange={setActiveLetter}
          />

        </div>
      </section>
    </>
  )
}
