import ProductCard from "./ProductCard";

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
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
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

const MostPrice = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } }, // ১ ঘণ্টা পরপর নতুন ডেটা আনবে
  );

  if (!res.ok) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-8 text-sm text-red-500 sm:px-8">
        ডেটা লোড করা যায়নি
      </p>
    );
  }

  const data = await res.json();
  const products: Product[] = Array.isArray(data)
    ? data
    : (data.products ?? data.data ?? []);

  // যেগুলোর দাম বেড়েছে, সবচেয়ে বেশি বাড়া আগে
  const mostPrice = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4  py-8 sm:px-6">
      <h2 className="mb-4 text-xl font-bold text-[#1f2a24] sm:text-2xl">
        <span className="text-red-600 text-sm">▲</span> আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mostPrice.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default MostPrice;