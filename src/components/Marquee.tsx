import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface HeadLines {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data: HeadLines[] = await res.json();

  return (
    <div className="bg-[#fcfcfc] border-y border-gray-100 py-2">
      <MarqueeText direction="right" duration={10}>
        <div className="flex items-center">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 px-5 border-r border-gray-200 text-sm whitespace-nowrap shrink-0 hover:bg-[#f4f7f4]"
            >
              <span>{item.categoryIcon}</span>
              <span className="font-medium text-gray-800">{item.nameBn}</span>
              <span className="font-semibold text-gray-700">
                {item.today} টাকা/কেজি
              </span>
              <span
                className={`text-xs font-semibold flex items-center gap-0.5 ${
                  item.change?.dir === "up" ? "text-red-500" : "text-green-600"
                }`}
              >
                <span>{item.change?.dir === "up" ? "▼" : "▼"}</span>
                <span>{item.change?.pct}%</span>
              </span>
            </Link>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
