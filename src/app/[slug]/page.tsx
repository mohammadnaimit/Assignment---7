import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryIcon: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  dozen: "ডজন",
  pcs: "পিস",
  piece: "পিস",
  litre: "লিটার",
};

const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);


const fmt = (n: number) =>
  toBn(Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2));

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.products ?? data.data ?? []);
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const { nameBn, image, unit, categoryNameBn, today, yesterday, change } =
    product;

  const unitName = unitBn[unit] ?? unit;
  const pct = Math.abs(Number(change?.pct ?? 0));
  const diff = Math.abs(today - yesterday);
  const isUp = change?.dir === "up" && pct !== 0;
  const isDown = change?.dir === "down" && pct !== 0;

  const statusText = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত";
  const pctColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";
  const pctIcon = isUp ? "▲" : isDown ? "▼" : "−";


  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));

  return (
    <div className="bg-[#F4F7F4] px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-4xl">
     
        <nav className="mb-4 flex items-center gap-2 text-[12px] text-[#6b776f]">
          <Link href="/" className="hover:text-[#0b8a43]">
            হোম
          </Link>
          <span>›</span>
          <span>{categoryNameBn}</span>
          <span>›</span>
          <span className="text-[#1f2a24]">{nameBn}</span>
        </nav>

        {/* Header card */}
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-[#e3e9e5] bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#eef2ef] text-3xl">
              {image}
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-[#1f2a24]">
                {nameBn}
              </h1>
              <p className="text-[12px] text-[#7a867f]">
                প্রতি {unitName} · {categoryNameBn}
              </p>
              <p className="mt-1 text-[12px] text-[#4b5750]">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold text-[#1f2a24]">{statusText}</span>
                {diff !== 0 && <> · {toBn(diff)} টাকা</>}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#eef2ef] px-6 py-3 text-center">
            <p className="text-[11px] text-[#7a867f]">আজকের দাম</p>
            <p className="text-[28px] font-extrabold leading-tight text-[#1f2a24]">
              {toBn(today.toLocaleString("en-US"))}
            </p>
            <p className="text-[11px] text-[#7a867f]">টাকা / {unitName}</p>
            <p className={`mt-1 text-[12px] font-semibold ${pctColor}`}>
              {pctIcon} {toBn(pct.toFixed(1))}%
            </p>
          </div>
        </div>

      
        <div className="rounded-2xl border border-[#e3e9e5] bg-white/80 p-5">
          <h2 className="mb-3 text-[15px] font-semibold text-[#1f2a24]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e3e9e5] p-3">
              <p className="text-[11px] text-[#7a867f]">সর্বনিম্ন দাম</p>
              <p className="text-[20px] font-bold text-green-700">
                {toBn(minPrice.toLocaleString("en-US"))}{" "}
                <span className="text-[12px] font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-[#7a867f]">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#e3e9e5] p-3">
              <p className="text-[11px] text-[#7a867f]">সর্বাধিক দাম</p>
              <p className="text-[20px] font-bold text-red-600">
                {toBn(maxPrice.toLocaleString("en-US"))}{" "}
                <span className="text-[12px] font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-[#7a867f]">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#e3e9e5] p-3">
              <p className="text-[11px] text-[#7a867f]">গড় দাম</p>
              <p className="text-[20px] font-bold text-green-700">
                {toBn(today.toLocaleString("en-US"))}{" "}
                <span className="text-[12px] font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-[#7a867f]">
                প্রতি {unitName}-এর হিসাবে
              </p>
            </div>
          </div>

          
          <h2 className="mb-3 mt-6 text-[15px] font-semibold text-[#1f2a24]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#e3e9e5]">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead>
                <tr className="text-[#6b776f]">
                  <th className="px-4 py-3 text-left font-normal">বাজার</th>
                  <th className="px-4 py-3 text-left font-normal">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-normal">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-3 text-right font-normal">
                    সর্বাধিক
                  </th>
                  <th className="px-4 py-3 text-right font-normal">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m, i) => (
                  <tr
                    key={m.market + m.division}
                    className={`border-t border-[#e3e9e5] ${
                      i % 2 === 1 ? "bg-[#F4F7F4]" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-[#1f2a24]">{m.market}</td>
                    <td className="px-4 py-3 text-[#4b5750]">{m.division}</td>
                    <td className="px-4 py-3 text-right text-[#4b5750]">
                      {fmt(m.min)} টাকা
                    </td>
                    <td className="px-4 py-3 text-right text-[#4b5750]">
                      {fmt(m.max)} টাকা
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-[#1f2a24]">
                      {fmt(m.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;