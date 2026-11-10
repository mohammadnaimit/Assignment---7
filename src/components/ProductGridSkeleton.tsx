const ProductGridSkeleton = () => (
  <section
    aria-label="পণ্য লোড হচ্ছে"
    aria-busy="true"
    className="mx-auto min-h-[50vh] max-w-7xl px-8 py-8"
  >
    <div className="mb-6 h-7 w-36 animate-pulse rounded bg-[#e3e9e5]" />
    <div className="mb-8 h-4 w-56 animate-pulse rounded bg-[#e3e9e5]" />

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="rounded-xl border border-[#e3e9e5] bg-white/70 p-4"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="size-10 animate-pulse rounded-lg bg-[#e3e9e5]" />
            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-[#e3e9e5]" />
              <div className="h-3 w-16 animate-pulse rounded bg-[#e3e9e5]" />
            </div>
          </div>
          <div className="h-3 w-20 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="mt-2 h-5 w-24 animate-pulse rounded bg-[#e3e9e5]" />
        </div>
      ))}
    </div>
  </section>
);

export default ProductGridSkeleton;
