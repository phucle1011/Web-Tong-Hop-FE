import { Link } from "react-router-dom";
import ThinBag from "../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function HeaderOne({ className, drawerAction, type = 1 }) {
  return (
    <header className={`${className || ""} header-section-wrapper relative`}>
      <TopBar className="quomodo-shop-top-bar" />
      <Middlebar
        type={type}
        className="quomodo-shop-middle-bar"
      />
      {/* Navbar tự xử lý responsive bên trong:
          - desktop (xl trở lên): hiện navbar ngang đầy đủ
          - mobile (dưới xl): hiện hamburger menu */}
      <Navbar type={type} className="quomodo-shop-nav-bar" />
    </header>
  );
}