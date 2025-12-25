export default function HeroCenterContent() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
        Keyzoo is a{" "}
        <span className="text-emerald-400">one-stop shop</span>
        {/* <br /> */}
        {" "} for all your gaming needs.
      </h1>

      <p className="mt-6 max-w-xl text-white/70 text-base sm:text-lg">
        A global digital marketplace for games, gift cards, DLCs, and subscriptions —
        instant delivery, secure payments, unbeatable value.
      </p>

      <a
        href="/store"
        className="mt-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/20"
      >
        Visit Our Store
      </a>
    </div>
  )
}
