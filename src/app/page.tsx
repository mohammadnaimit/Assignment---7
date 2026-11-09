
import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import LowPrice from "@/components/LowPrice";
import Marquee from "@/components/Marquee";
import MostPrice from "@/components/MostPrice";

export default async function Home() {
  
  return (
    <div className="bg-[#F4F7F4]">
      <Marquee />
      <Banner />
      <MostPrice/>
      <LowPrice/>
      <AllProducts/>
      
    </div>
  );
}