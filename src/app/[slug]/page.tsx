import Link from "next/link";
import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
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
  markets: unknown[];
}

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

const toBn = (value: number) =>
  String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Categories fetch failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : (data.categories ?? data.data ?? []);
}

async function getCategoryProducts(category: string): Promise<Product[]> {
  const res = await fetch(
    `${API_URL}/products?category=${encodeURIComponent(category)}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) {
    throw new Error(
      `Category products fetch failed: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return Array.isArray(data) ? data : (data.products ?? data.data ?? []);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const products = await getCategoryProducts(category.slug);

  return (
    <section className="bg-[#F4F7F4] py-7">
      <div className="mx-auto max-w-7xl px-8">
        <nav className="mb-4 text-[12px] text-[#6b776f]">
          <Link href="/" className="hover:text-[#0b8a43]">
            হোম
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#1f2a24]">{category.nameBn}</span>
        </nav>

        <div className="mb-5">
          <div className="flex items-center gap-4 rounded-xl border border-[#e3e9e5] bg-white/80 p-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#eef2ef] text-2xl">
              {category.icon}
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#1f2a24] sm:text-2xl">
                {category.nameBn}
              </h1>
              <p className="mt-1 text-sm text-[#6b776f]">
                {toBn(products.length)} টি পণ্যের আজকের দামের পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        <ProductList products={products} />
      </div>
    </section>
  );
}
