import Link from "next/link";

interface Category {
    nameBn: string;
    slug: string;
    icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data: Category[] = await res.json();
  
  return (
    <nav className="border-t border-gray-100 py-3">
      <div className="flex items-center justify-start gap-5 md:gap-7 mx-auto max-w-7xl px-4 md:px-0 md:pl-14 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {data.map((category, i) => (
          <Link
            key={i}
            href={category.slug}
            className="flex items-center gap-2 text-gray-800 hover:text-green-600 font-medium text-sm md:text-base transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;