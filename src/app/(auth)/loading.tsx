export default function LoadingAuth() {
  return (
    <section
      aria-label="অ্যাকাউন্ট পেজ লোড হচ্ছে"
      aria-busy="true"
      className="bg-[#F4F7F4] px-4 py-12"
    >
      <div className="mx-auto max-w-[420px]">
        <div className="mb-6 space-y-2">
          <div className="mx-auto h-7 w-40 animate-pulse rounded bg-[#e3e9e5]" />
          <div className="mx-auto h-4 w-64 max-w-full animate-pulse rounded bg-[#e3e9e5]" />
        </div>
        <div className="space-y-4 rounded-2xl border border-[#e3e9e5] bg-white/80 p-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-20 animate-pulse rounded bg-[#e3e9e5]" />
              <div className="h-10 animate-pulse rounded-lg bg-[#eef2ef]" />
            </div>
          ))}
          <div className="h-10 animate-pulse rounded-lg bg-[#dcefe3]" />
        </div>
      </div>
    </section>
  );
}
