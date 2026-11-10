import { Suspense } from "react";
import Link from "next/link";
import CategoryNavLinks from "./CategoryNavLinks";

interface Category {
  nameBn: string;
  slug: string;
  icon: string;
}

const API_URL = "https://api.abcz.workers.dev/api/bazardor/categories";

const fetchData = async (): Promise<Category[]> => {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Categories fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: Category[] = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Categories fetch error:", error);
    return [];
  }
};

const Navlinks = async () => {
  const data = await fetchData();

  if (data.length === 0) return null;

  return (
    <nav className="border-t border-gray-100 py-3">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl overflow-x-auto px-4 md:px-0 md:pl-14">
            <div className="flex items-center gap-5 md:gap-7">
              {data.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-2 py-1 text-sm font-medium text-gray-800 md:text-base"
                >
                  <span className="text-base">{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              ))}
            </div>
          </div>
        }
      >
        <CategoryNavLinks categories={data} />
      </Suspense>
    </nav>
  );
};

export default Navlinks;
