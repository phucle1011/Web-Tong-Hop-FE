import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Arrow from "../../Helpers/icons/Arrow";
import axios from "axios";
import Constants from "../../../../Constants";

export default function Navbar({ className, type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mobilePageOpen, setMobilePageOpen] = useState(false);

  const handler = () => setToggle(!categoryToggle);

  const fetchWishlistCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setWishlistCount(0); return; }
      const decoded = decodeToken(token);
      const userId = decoded?.id;
      if (!userId) { setWishlistCount(0); return; }
      const res = await axios.get(
        `${Constants.DOMAIN_API}/users/${userId}/wishlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      setWishlistCount(list.length);
    } catch (e) {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${Constants.DOMAIN_API}/category/list`);
        if (Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else {
          setCategories([]);
          setError("Dữ liệu danh mục không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        setError("Không thể tải danh mục");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchWishlistCount();

    const onWLChanged = () => fetchWishlistCount();
    window.addEventListener("wishlist:changed", onWLChanged);
    const onStorage = (e) => { if (e.key === "wishlistUpdatedAt") fetchWishlistCount(); };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("wishlist:changed", onWLChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (categoryToggle) {
      setSize(`${42 * (categories.length + 1)}px`);
    } else {
      setSize("0px");
    }
  }, [categoryToggle, categories]);

  const bgColor = type === 3 ? "bg-qh3-blue" : "bg-qyellow";
  const textColor = type === 3 ? "text-white" : "text-qblacktext";
  const hoverBg = type === 3 ? "hover:bg-qh3-blue hover:text-white" : "hover:bg-qyellow";

  const navLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/all-products", label: "Sản phẩm" },
    { to: "/about", label: "Về chúng tôi" },
    { to: "/blogs", label: "Tin tức" },
    { to: "/contact", label: "Liên hệ" },
  ];

  const pageLinks = [
    { to: "/privacy-policy", label: "Chính sách bảo mật" },
    { to: "/terms-condition", label: "Điều khoản - Điều kiện" },
    { to: "/faq", label: "Câu hỏi thường gặp" },
    { to: "/all-products", label: "Sản phẩm" },
  ];

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <div
        className={`nav-widget-wrapper w-full h-[60px] relative z-30 hidden xl:block ${bgColor} ${className || ""}`}
      >
        <div className="container-x mx-auto h-full">
          <div className="w-full h-full flex justify-center items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center justify-center w-full">

              {/* Category dropdown */}
              <div className="category w-[270px] h-[43px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex space-x-3 items-center">
                    <span>
                      <svg className="fill-current" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">Tất cả danh mục</span>
                  </div>
                  <Arrow width="5.78538" height="1.28564" className="fill-current text-qblacktext" />
                </button>

                {categoryToggle && (
                  <div className="fixed top-0 left-0 w-full h-full -z-10" onClick={handler} />
                )}

                <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden z-50"
                  style={{ height: elementsSize }}
                >
                  <ul className="categories-list">
                    {loading && <li className="text-sm text-qblack px-5 h-10 flex items-center">Đang tải...</li>}
                    {error && <li className="text-sm text-red-500 px-5 h-10 flex items-center">{error}</li>}
                    {!loading && categories.length === 0 && (
                      <li className="text-sm text-qblack px-5 h-10 flex items-center">Không có danh mục nào</li>
                    )}
                    {categories.map((category) => (
                      <li key={category.id} className="category-item">
                        <Link to="/all-products" state={{ categoryId: category.id }}>
                          <div className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack ${hoverBg}`}>
                            <span className="text-sm font-600 text-qblacktext">{category.name}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nav links */}
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  {navLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to} className={`text-sm font-600 ${textColor}`}>{label}</Link>
                    </li>
                  ))}
                  <li className="relative group">
                    <Link to="#" className={`flex items-center text-sm font-600 cursor-pointer ${textColor}`}>
                      Trang
                      <span className="ml-1.5 flex items-center"><Arrow className="fill-current" /></span>
                    </Link>
                    <div className="sub-menu w-[220px] absolute left-0 top-[60px] hidden group-hover:block">
                      <div className="w-full bg-white" style={{ boxShadow: "0px 15px 50px 0px rgba(0,0,0,0.14)" }}>
                        <div className="p-5">
                          <ul className="flex flex-col space-y-2">
                            {pageLinks.map(({ to, label }) => (
                              <li key={to}>
                                <Link to={to}>
                                  <span className="text-qgray text-sm font-400 hover:text-qyellow">{label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE NAVBAR ── */}
      <div className={`xl:hidden w-full z-30 relative ${bgColor} ${className || ""}`}>
        <div className="flex justify-between items-center px-4 h-[56px]">
          <span className={`text-sm font-600 ${textColor}`}>Menu</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 ${textColor} focus:outline-none`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="bg-white shadow-lg border-t border-gray-100">
            <ul className="flex flex-col">

              {/* Danh mục accordion */}
              <li>
                <button
                  className="w-full flex justify-between items-center px-5 py-3 text-sm font-600 text-qblacktext border-b border-gray-100"
                  onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                >
                  <span>Tất cả danh mục</span>
                  <span className={`transform transition-transform duration-200 ${mobileCategoryOpen ? "rotate-180" : ""}`}>
                    <Arrow className="fill-current text-qblacktext" />
                  </span>
                </button>
                {mobileCategoryOpen && (
                  <ul className="bg-gray-50">
                    {loading && <li className="text-sm text-qblack px-8 py-2">Đang tải...</li>}
                    {error && <li className="text-sm text-red-500 px-8 py-2">{error}</li>}
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to="/all-products"
                          state={{ categoryId: category.id }}
                          onClick={() => setMobileOpen(false)}
                          className="block px-8 py-2 text-sm text-qblacktext border-b border-gray-100 hover:bg-qyellow"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Nav links */}
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-5 py-3 text-sm font-600 text-qblacktext border-b border-gray-100 hover:bg-gray-50"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* Trang accordion */}
              <li>
                <button
                  className="w-full flex justify-between items-center px-5 py-3 text-sm font-600 text-qblacktext border-b border-gray-100"
                  onClick={() => setMobilePageOpen(!mobilePageOpen)}
                >
                  <span>Trang</span>
                  <span className={`transform transition-transform duration-200 ${mobilePageOpen ? "rotate-180" : ""}`}>
                    <Arrow className="fill-current text-qblacktext" />
                  </span>
                </button>
                {mobilePageOpen && (
                  <ul className="bg-gray-50">
                    {pageLinks.map(({ to, label }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={() => setMobileOpen(false)}
                          className="block px-8 py-2 text-sm text-qgray border-b border-gray-100 hover:text-qyellow"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

            </ul>
          </div>
        )}
      </div>
    </>
  );
}