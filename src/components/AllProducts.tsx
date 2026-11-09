
import ProductCard from './ProductCard';
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
            <div className="max-w-7xl mx-auto px-6 py-7">
          <h1 className="mb-4 text-xl font-bold text-[#1f2a24] sm:text-2xl">সব পণ্য</h1>

          <p>মোট {data.length} টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-15">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        </div>
    );
};

export default AllProducts;