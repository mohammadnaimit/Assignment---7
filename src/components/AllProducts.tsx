
import ProductList from "./ProductList";
interface Product  {
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
};



const AllProducts = async() => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data: Product[] = await res.json();
    return (
        <div>
            <div className="max-w-7xl mx-auto px-8 py-7">
          <h1 className="mb-2 text-xl font-bold text-[#1f2a24] sm:text-2xl">সব পণ্য</h1>
          <p className="text-sm text-[#6b776f]">
            মোট {data.length} টি পণ্য দেখানো হচ্ছে
          </p>

        </div>
        <div className="max-w-7xl mx-auto px-8">
          <ProductList products={data} showCount={false} />
        </div>
        </div>
    );
};

export default AllProducts;