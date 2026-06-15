import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState(null);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      try {
        const decode = jwtDecode(token);
        setUser(decode);
      } catch (err) {
        console.error("Lỗi giải mã token:", err);
      }
    }
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove("token", { path: "/" });
  };

  // Toggle sidebar: thêm/xỏ class "sidebar-open" trên <html> hoặc wrapper
  const handleSidebarToggle = () => {
    // Modernize Bootstrap admin dùng class "show-sidebar" trên body
    // hoặc click vào element có id="sidebarCollapse"
    // Cách đơn giản nhất: toggle class trực tiếp
    document.body.classList.toggle("show-sidebar");

    // Nếu template dùng wrapper .left-sidebar hoặc aside
    const aside = document.querySelector(".left-sidebar");
    if (aside) {
      aside.classList.toggle("open");
    }
  };

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          {/* Hamburger button — chỉ hiện trên mobile */}
          <li className="nav-item d-block d-xl-none">
            <button
              className="nav-link sidebartoggler"
              onClick={handleSidebarToggle}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </li>
          <li className="nav-item"></li>
        </ul>

        <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <Link to="/admin/profile" className="text-nowrap logo-img">
              <img
                src="/assets/images/profile/login.png"
                alt="Ảnh đại diện"
                width="35"
                height="35"
                className="rounded-full border"
              />
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;