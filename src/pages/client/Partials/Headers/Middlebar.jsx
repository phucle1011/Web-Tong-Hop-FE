import Cart from "../../Cart";
import Compair from "../../Helpers/icons/Compair";
import ThinBag from "../../Helpers/icons/ThinBag";
import ThinLove from "../../Helpers/icons/ThinLove";
import ThinPeople from "../../Helpers/icons/ThinPeople";
import SearchBox from "../../Helpers/SearchBox";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Constants from "../../../../Constants";
import Wishlist from "../../Helpers/Wishlist";
import { decodeToken } from "../../Helpers/jwtDecode";

export default function Middlebar({ className, type }) {
  const [count, setCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  const loadCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) { setCount(0); return; }
    try {
      const res = await axios.get(`${Constants.DOMAIN_API}/carts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCount(res?.data?.count ?? 0);
    } catch (e) {}
  };

  const loadWishlistCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) { setWishlistCount(0); return; }
    try {
      const decoded = decodeToken(token);
      const userId = decoded?.id;
      if (!userId) return;
      const response = await axios.get(
        `${Constants.DOMAIN_API}/users/${userId}/wishlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistCount(response?.data?.data?.length || 0);
    } catch (e) {}
  };

  useEffect(() => {
    loadCartCount();
    loadWishlistCount();
  }, []);

  useEffect(() => {
    const updateCompareCount = () => {
      const list = JSON.parse(localStorage.getItem("compareVariants") || "[]");
      setCompareCount(list.filter(Boolean).length);
    };
    updateCompareCount();
    window.addEventListener("storage", updateCompareCount);
    return () => window.removeEventListener("storage", updateCompareCount);
  }, []);

  useEffect(() => {
    const onCartChanged = () => loadCartCount();
    window.addEventListener("cart:changed", onCartChanged);

    const onStorage = (e) => {
      if (e.key === "cartUpdatedAt") loadCartCount();
    };
    window.addEventListener("storage", onStorage);

    const onVisible = () => {
      if (document.visibilityState === "visible") loadCartCount();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("cart:changed", onCartChanged);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const handleSearch = ({ keyword, brandIds, attributeValues, attributeIds }) => {
    const params = new URLSearchParams();
    if (keyword?.trim()) params.append("keyword", keyword.trim());
    if (brandIds?.length) params.append("brand_ids", brandIds.join(","));
    if (attributeValues?.length) params.append("attribute_values", attributeValues.join(","));
    if (attributeIds?.length) params.append("attribute_ids", attributeIds.join(","));
    navigate(`/all-products?${params.toString()}`);
  };

  // Icons + counts — dùng lại ở cả desktop lẫn mobile
  const actionIcons = (
    <div className="flex space-x-6 items-center">
      {/* So sánh */}
      <div className="compaire relative">
        <Link to="/products-compaire"><span><Compair /></span></Link>
        {compareCount > 0 && (
          <span className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"}`}>
            {compareCount}
          </span>
        )}
      </div>

      {/* Wishlist */}
      <div className="cart-wrapper group relative py-4">
        <div className="cart relative cursor-pointer">
          <Link to="/wishlist"><span><ThinLove /></span></Link>
          <span className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"}`}>
            {wishlistCount}
          </span>
        </div>
        <Wishlist type={type} className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
      </div>

      {/* Cart */}
      <div className="cart-wrapper group relative py-4">
        <div className="cart relative cursor-pointer">
          <Link to="/cart"><span><ThinBag /></span></Link>
          <span className={`w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"}`}>
            {count}
          </span>
        </div>
        <Cart type={type} className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
      </div>

      {/* Profile */}
      <div>
        <Link to="/profile"><span><ThinPeople /></span></Link>
      </div>
    </div>
  );

  return (
    <div className={`w-full bg-white ${className}`}>
      <div className="container-x mx-auto">

        {/* ── DESKTOP: 1 hàng ngang (logo + search + icons) ── */}
        <div className="hidden lg:flex justify-between items-center h-[86px]">
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dyu8kdule/image/upload/v1779260296/logo_h62roc.jpg"
                alt="logo"
                style={{ height: "60px", width: "auto" }}
              />
            </Link>
          </div>
          <div className="w-[517px] h-[44px]">
            <SearchBox type={type} className="search-com" onSearch={handleSearch} />
          </div>
          {actionIcons}
        </div>

        {/* ── MOBILE: 2 hàng (logo+icons / search) ── */}
        <div className="lg:hidden flex flex-col py-3 gap-3">
          {/* Hàng 1: logo + icons */}
          <div className="flex justify-between items-center">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dyu8kdule/image/upload/v1779260296/logo_h62roc.jpg"
                alt="logo"
                style={{ height: "44px", width: "auto" }}
              />
            </Link>
            {actionIcons}
          </div>
          {/* Hàng 2: search full width */}
          <div className="w-full h-[44px]">
            <SearchBox type={type} className="search-com" onSearch={handleSearch} />
          </div>
        </div>

      </div>
    </div>
  );
}