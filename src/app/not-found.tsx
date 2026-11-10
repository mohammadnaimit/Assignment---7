import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#e3e9e5] bg-white/80 p-8 text-center">
        <p className="text-sm font-bold tracking-widest text-[#0b8a43]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#1f2a24]">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-[#6b776f]">
          ঠিকানা ভুল হতে পারে, অথবা পেজটি আর নেই।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-[#008744] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#007038]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
