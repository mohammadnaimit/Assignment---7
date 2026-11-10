export default function LoadingProductDetails() {
  return (
    <section className="min-h-[50vh] bg-[#F4F7F4] px-4 py-6 sm:px-8">
      <div
        aria-label="পণ্যের বিস্তারিত লোড হচ্ছে"
        aria-busy="true"
        className="mx-auto max-w-4xl"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="h-3 w-8 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="h-3 w-3 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="h-3 w-20 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="h-3 w-3 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="h-3 w-24 animate-pulse rounded bg-[#e3e9e5]" />
        </div>

        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-[#e3e9e5] bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="size-16 shrink-0 animate-pulse rounded-xl bg-[#e3e9e5]" />
            <div className="space-y-2">
              <div className="h-6 w-36 animate-pulse rounded bg-[#e3e9e5]" />
              <div className="h-3 w-32 animate-pulse rounded bg-[#e3e9e5]" />
              <div className="h-3 w-48 max-w-full animate-pulse rounded bg-[#e3e9e5]" />
            </div>
          </div>
          <div className="h-24 w-full animate-pulse rounded-xl bg-[#eef2ef] sm:w-32" />
        </div>

        <div className="rounded-2xl border border-[#e3e9e5] bg-white/80 p-5">
          <div className="mb-4 h-5 w-36 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl border border-[#e3e9e5] bg-white"
              />
            ))}
          </div>
          <div className="mb-3 mt-6 h-5 w-48 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="overflow-hidden rounded-xl border border-[#e3e9e5]">
            <div className="h-11 animate-pulse bg-[#eef2ef]" />
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="h-11 border-t border-[#e3e9e5] bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
