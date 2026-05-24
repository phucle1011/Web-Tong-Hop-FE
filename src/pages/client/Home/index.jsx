import datas from "../../../data/products.json";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Banner from "./Banner";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import LayoutHomeThree from "../Partials/LayoutHomeThree";
import SectionStyleOneHmThree from "../Helpers/SectionStyleOneHmThree";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Constants from "../../../Constants";

/* ─────────────────────────────────────────────
   SECTION: WhyUs
───────────────────────────────────────────── */
function WhyUs() {
  return (
    <div className="bg-white p-2 rounded-lg shadow mt-4 text-center mx-auto mb-[60px]">
      <h2 className="text-xl md:text-2xl font-bold text-[#7a4500]">
        TẠI SAO LẠI LỰA CHỌN CHÚNG TÔI?
      </h2>
      <p className="mb-4">
        Chúng tôi cam kết mang đến sản phẩm tốt nhất cho gia đình bạn
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch p-4">
        {[
          {
            icon: "🥚",
            title: "Chất lượng kiểm định",
            desc: "Toàn bộ trứng được kiểm định kỹ lưỡng, đảm bảo tươi mới và đạt tiêu chuẩn VSATTP.",
          },
          {
            icon: "🤝",
            title: "Hơn 20 năm uy tín",
            desc: "Kinh nghiệm lâu năm là minh chứng cho sự tin tưởng của hàng nghìn khách hàng.",
          },
          {
            icon: "🚚",
            title: "Giao hàng tận nơi",
            desc: "Miễn phí giao hàng tại Bình Dương và các tỉnh lân cận, nhanh chóng và đúng giờ.",
          },
          {
            icon: "📋",
            title: "Minh bạch giá cả",
            desc: "Nguồn gốc rõ ràng, giá công khai, không phát sinh chi phí ẩn.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start text-left rounded-lg shadow-md w-full md:w-1/4 p-3"
          >
            <span className="text-4xl mr-3">{item.icon}</span>
            <p className="max-w-xs">
              <strong>{item.title}</strong>
              <br />
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: FarmGallery
───────────────────────────────────────────── */
const farmImages = [
  { label: "Chuồng trại hiện đại", emoji: "🏗️", bg: "#fff8ed" },
  { label: "Gà được chăm sóc tốt", emoji: "🐔", bg: "#fef3e2" },
  { label: "Trứng sạch kiểm định", emoji: "🥚", bg: "#fff8ed" },
  { label: "Đóng gói vệ sinh", emoji: "📦", bg: "#fef3e2" },
  { label: "Giao hàng tận nơi", emoji: "🚚", bg: "#fff8ed" },
  { label: "Chất lượng cam kết", emoji: "⭐", bg: "#fef3e2" },
];

function FarmGallery() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4 text-center mx-auto mb-[60px]">
      <h2 className="text-xl md:text-2xl font-bold text-[#7a4500]">
        TRANG TRẠI THỰC TẾ CỦA CHÚNG TÔI
      </h2>
      <p className="text-gray-500 mb-4">
        Minh bạch quy trình – từ trang trại đến bàn ăn
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {farmImages.map((img, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 hover:scale-105 transition-transform cursor-pointer"
            style={{ background: img.bg, minHeight: 120 }}
          >
            <div className="text-5xl mb-2">{img.emoji}</div>
            <p className="text-sm font-semibold text-gray-700 text-center">
              {img.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">
        * Chúng tôi chào đón khách tham quan trang trại theo lịch hẹn. Liên
        hệ: 0356 808 561
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: Certifications
───────────────────────────────────────────── */
const certLogos = [
  { label: "ISO 22000:2018", sub: "An toàn thực phẩm", icon: "🏅" },
  { label: "ISO 9001:2015", sub: "Quản lý chất lượng", icon: "🎖️" },
  { label: "VSATTP", sub: "Bộ Y tế chứng nhận", icon: "✅" },
  { label: "Thương hiệu tin dùng", sub: "Việt Nam 2017", icon: "🥇" },
];

function Certifications() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4 text-center mx-auto mb-[60px]">
      <h2 className="text-xl md:text-2xl font-bold text-[#7a4500]">
        CHỨNG NHẬN & UY TÍN
      </h2>
      <p className="text-gray-500 mb-4">
        Được kiểm định và công nhận bởi các tổ chức uy tín
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {certLogos.map((c, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-amber-50 border border-amber-100 rounded-xl px-6 py-4 w-40 hover:shadow-md transition"
          >
            <div className="text-4xl mb-2">{c.icon}</div>
            <p className="font-bold text-sm text-gray-800">{c.label}</p>
            <p className="text-xs text-gray-500 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: StatsSection
───────────────────────────────────────────── */
function StatsSection() {
  const statsRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState({
    years: 0,
    customers: 0,
    orders: 0,
    provinces: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          animateCount("years", 20);
          animateCount("customers", 5000);
          animateCount("orders", 1200);
          animateCount("provinces", 8);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const animateCount = (key, target) => {
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts((prev) => ({
        ...prev,
        [key]: Math.floor(progress * target),
      }));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div
      className="bg-white p-4 pb-4 rounded-lg shadow mt-4 text-center mx-auto mb-[60px]"
      ref={statsRef}
    >
      <h2 className="text-xl md:text-2xl font-bold text-[#7a4500]">
        CHẤT LƯỢNG LÀ DANH DỰ
      </h2>
      <p className="mb-4 text-gray-500">
        Chúng tôi cam kết mang đến sản phẩm tốt nhất
      </p>
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
        {[
          { label: "Năm kinh nghiệm", value: counts.years, suffix: "+" },
          {
            label: "Khách hàng tin dùng",
            value: counts.customers.toLocaleString(),
            suffix: "+",
          },
          {
            label: "Đơn hàng / tháng",
            value: counts.orders.toLocaleString(),
            suffix: "+",
          },
          {
            label: "Tỉnh thành phân phối",
            value: counts.provinces,
            suffix: "+",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-amber-50 p-4 rounded-lg text-center w-full md:w-1/4"
          >
            <h3 className="text-base font-bold text-orange-600 mb-2">
              {s.label}
            </h3>
            <p className="text-4xl font-semibold text-gray-700">
              {animated ? s.value : 0}
              {s.suffix}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: CTASection
───────────────────────────────────────────── */
function CTASection() {
  return (
    <div className="bg-amber-50 p-6 rounded-lg shadow mt-4 text-center mx-auto border border-amber-200 mb-[60px]">
      <div className="inline-block bg-orange-100 text-orange-600 border border-orange-300 px-4 py-1 rounded-full text-sm font-bold mb-3">
        🚚 Miễn phí giao hàng tận nơi khi đặt mua số lượng lớn
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-[#7a4500] mb-2">
        ĐẶT HÀNG NGAY HÔM NAY!
      </h2>
      <p className="text-gray-600 mb-4">
        Giao hàng tận nơi tại Bình Dương và các tỉnh lân cận. Cam kết chất
        lượng — an toàn vệ sinh.
      </p>
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <a
          href="#"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg no-underline transition duration-200"
        >
          📞 0356 808 561
        </a>
        <a
          href="#"
          className="bg-white hover:bg-orange-50 text-orange-500 border border-orange-400 font-bold px-6 py-3 rounded-lg no-underline transition duration-200"
        >
          📞 0938 77 55 99
        </a>
      </div>
      <p className="mt-4 text-gray-500 text-sm">
        📘 Công ty TNHH Thực Phẩm Thương Mại Dịch Vụ Trân
        Hương
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN: HomeThree
───────────────────────────────────────────── */
export default function HomeThree() {
  const { products } = datas;
  const brands = [];
  products.forEach((product) => {
    brands.push(product.brand);
  });
  const [productNew, setProductnew] = useState([]);
  const [productSold, setProductTopsold] = useState([]);
  const [productDiscounted, setProductTopDiscounted] = useState([]);
  const [topBrands, setTopBrands] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [newRes, topSoldRes, topDiscounted, topBrandsRes] =
          await Promise.all([
            axios.get(`${Constants.DOMAIN_API}/products/getallnew`),
            axios.get(`${Constants.DOMAIN_API}/top-sold-products`),
            axios.get(`${Constants.DOMAIN_API}/top-discounted-products`),
            axios.get(`${Constants.DOMAIN_API}/brands/top`),
          ]);

        setProductnew(newRes.data.data || []);
        setProductTopsold(topSoldRes.data || []);
        setProductTopDiscounted(topDiscounted.data || []);
        setTopBrands(topBrandsRes.data.data || []);

        const flashSaleRes = await axios.get(
          `${Constants.DOMAIN_API}/client/flashSale`
        );
        const flashSalesData = flashSaleRes.data?.data || [];
        setFlashSales(flashSalesData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <>
      <LayoutHomeThree type={3} childrenClasses="pt-0">
        {/* ── Các section gốc ── */}
        <Banner className="banner-wrapper mb-[60px]" />
        <BrandSection
          type={3}
          sectionTitle="Shop by Brand"
          className="brand-section-wrapper mb-[60px]"
          brands={topBrands}
        />

        <CampaignCountDown flashSales={flashSales} className="mb-[60px]" />

        <SectionStyleThree
          type={3}
          products={productNew}
          sectionTitle="SẢN PHẨM MỚI"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
          startLength={0}
          endLength={productNew.length}
        />

        <SectionStyleOneHmThree
          type={3}
          products={productSold}
          brands={brands}
          categoryTitle="Mobile & Tablet"
          sectionTitle="SẢN PHẨM BÁN CHẠY"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />

        {productDiscounted.length > 0 ? (
          <SectionStyleOneHmThree
            type={3}
            products={productDiscounted}
            brands={brands}
            categoryTitle="Electronics"
            sectionTitle="SẢN PHẨM GIẢM GIÁ"
            seeMoreUrl="/all-products"
            className="category-products mb-[60px]"
          />
        ) : (
          <div className="mb-[60px] text-center py-10">
            <h2 className="text-xl font-bold mb-2">SẢN PHẨM GIẢM GIÁ</h2>
            <p className="text-red-500">Hiện chưa có sản phẩm giảm giá nào.</p>
          </div>
        )}

        {/* ── Sections mới thêm từ Home ── */}
        <WhyUs />
        <StatsSection />
        <FarmGallery />
        <Certifications />
        <CTASection />
      </LayoutHomeThree>
    </>
  );
}