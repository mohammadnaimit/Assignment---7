"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  nameBn: string;
  slug: string;
  icon: string;
}

const CategoryNavLinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-start gap-5 overflow-x-auto mx-auto max-w-7xl px-4 md:gap-7 md:px-0 md:pl-14 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {categories.map((category) => {
        const isActive = pathname === `/${category.slug}`;

        return (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-2 py-1 text-sm font-medium transition-colors duration-200 md:text-base ${
              isActive
                ? "bg-[#e8f5e9] text-[#0b8a43]"
                : "text-gray-800 hover:bg-[#f1f5f2] hover:text-green-600"
            }`}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryNavLinks;
