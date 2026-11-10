"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

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

type SortOrder =
  | "default"
  | "name-asc"
  | "price-asc"
  | "price-desc"
  | "increase"
  | "decrease";

const ProductList = ({
  products,
  showCount = true,
}: {
  products: Product[];
  showCount?: boolean;
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    switch (sortOrder) {
      case "name-asc":
        return items.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
      case "price-asc":
        return items.sort((a, b) => a.today - b.today);
      case "price-desc":
        return items.sort((a, b) => b.today - a.today);
      case "increase":
        return items.sort((a, b) => b.change.pct - a.change.pct);
      case "decrease":
        return items.sort((a, b) => a.change.pct - b.change.pct);
      default:
        return items;
    }
  }, [products, sortOrder]);

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <label htmlFor="category-product-sort" className="text-sm text-[#6b776f]">
          সাজান
        </label>
        <select
          id="category-product-sort"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
          className="rounded-lg border border-[#d8e0db] bg-white px-3 py-2 text-sm text-[#1f2a24] outline-none focus:border-[#0b8a43]"
        >
          <option value="default">ডিফল্ট</option>
        
          <option value="price-asc">দাম (কম থেকে বেশি)</option>
          <option value="price-desc">দাম (বেশি থেকে কম)</option>
          
        </select>
      </div>

      {showCount && (
        <p className="mb-3 text-sm text-[#6b776f]">
          মোট {products.length} টি পণ্য দেখানো হচ্ছে
        </p>
      )}

      {sortedProducts.length > 0 ? (
        <div className="mb-15 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-sm text-[#6b776f]">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </>
  );
};

export default ProductList;
