import { Link } from "react-router-dom";
import Facebook from "../../Helpers/icons/Facebook";
import Instagram from "../../Helpers/icons/Instagram";
import Youtube from "../../Helpers/icons/Youtube";

export default function Footer({ type }) {
  return (
 <footer className="footer-section-wrapper bg-white print:hidden">
  <div className="container-x block mx-auto pt-[56px]">
  

    {/* Nội dung chính: 3 cột */}
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 mb-[50px]">

      {/* Cột 1 - Giới thiệu */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[16px] font-bold text-[#2F2F2F] uppercase tracking-wide border-b-2 border-orange-400 pb-2 w-fit">
          Về chúng tôi
        </h2>
        <p className="text-[#9A9A9A] text-[14px] leading-[26px]">
          Chúng tôi tự hào là đơn vị cung cấp thực phẩm chất lượng cao, uy tín trên thị trường hơn 10 năm qua. Cam kết mang đến sản phẩm sạch, an toàn cho người tiêu dùng.
        </p>
        <p className="text-[#9A9A9A] text-[13px]">
          MST: 3702504726 · Sở Kế Hoạch Và Đầu Tư Tỉnh Bình Dương
          <br />
          Cấp lần 1: 07/10/2016 · Thay đổi lần 1: 07/04/2020
        </p>
      </div>

      {/* Cột 2 - Liên kết nhanh */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[16px] font-bold text-[#2F2F2F] uppercase tracking-wide border-b-2 border-orange-400 pb-2 w-fit">
          Liên kết nhanh
        </h2>
        <ul className="flex flex-col gap-3">
          {[
            { to: "/", label: "Trang chủ" },
            { to: "/all-products", label: "Sản phẩm" },
            { to: "/about", label: "Về chúng tôi" },
            { to: "/blogs", label: "Tin tức" },
            { to: "/contact", label: "Liên hệ" },
            { to: "/faq", label: "Câu hỏi thường gặp" },
          ].map((item) => (
            <li key={item.to} className="flex items-center gap-2">
              <span className="text-orange-400 text-[12px]">›</span>
              <Link to={item.to}>
                <span className="text-[#9A9A9A] text-[14px] hover:text-orange-400 transition-colors duration-200">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cột 3 - Liên hệ */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[16px] font-bold text-[#2F2F2F] uppercase tracking-wide border-b-2 border-orange-400 pb-2 w-fit">
          Liên hệ
        </h2>
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-3">
            <span className="text-orange-400 mt-1">🏠</span>
            <span className="text-[#9A9A9A] text-[14px] leading-[24px]">
              Lô D12, Ô 29-30 Khu dân cư Thuận Giao, khu phố Bình Thuận 2, Thuận Giao, Hồ Chí Minh
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-orange-400">📞</span>
            <span className="text-[#9A9A9A] text-[14px]">0274.3746.959 - 0274.3717.885</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-orange-400">✉️</span>
            <a href="mailto:tranhuong888@yahoo.com" className="text-[#9A9A9A] text-[14px] hover:text-orange-400 transition-colors duration-200">
              tranhuong888@yahoo.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-orange-400">🕘</span>
            <span className="text-[#9A9A9A] text-[14px]">Thứ 2 - Thứ 7: 7:30 - 17:30</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Copyright */}
    <div className="bottom-bar border-t border-qgray-border lg:h-[82px] flex justify-center items-center">
      <span className="sm:text-base text-[10px] text-qgray text-center">
        Copyright © 2026
        <span className="font-bold text-qblack mx-1">
          CÔNG TY TNHH THỰC PHẨM THƯƠNG MẠI DỊCH VỤ TRÂN HƯƠNG
        </span>
        · Mọi quyền được bảo lưu
      </span>
    </div>

  </div>
</footer>
  );
}
