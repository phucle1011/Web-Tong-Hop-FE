import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import Constants from "../../../Constants";

const URL = Constants.DOMAIN_API;
const ENDPOINT = "admin/routes";

function Header() {
    const [user, setUser] = useState(null);
    const [cookies] = useCookies(["token"]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigator = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        checkCookie();
        getDataOptions();
    }, []);

    const checkCookie = () => {
        const token = cookies.token;
        if (token) {
            try {
                const decode = jwtDecode(token);
                setUser(decode);
            } catch (err) {
                console.error("Lỗi giải mã token:", err);
            }
        } else {
            setUser(null);
        }
    };

    const handleClose = () => setAnchorEl(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleProfile = () => { navigator("/profile"); handleClose(); };
    const handleHistory = () => { navigator("/bookingHistory"); handleClose(); };
    const logout = () => {
        setUser(null);
        navigator("/login");
        Cookies.remove("token", { path: "/" });
        handleClose();
    };

    // ----------------------[ SEARCH OPTION ]--------------------- //
    const [startPointOptions, setStartPointOptions] = useState([]);
    const [endPointOptions, setEndPointOptions] = useState([]);
    const [selectedStartPoint, setSelectedStartPoint] = useState(null);
    const [selectedEndPoint, setSelectedEndPoint] = useState(null);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            width: "100%",
        }),
        option: (provided, state) => ({
            ...provided,
            color: "gray",
            textAlign: "left",
            backgroundColor: state.isSelected ? "#f0f0f0" : state.isFocused ? "#f9f9f9" : "white",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#0F3079",
        }),
    };

    const getDataOptions = async () => {
        try {
            const response = await axios.get(`${URL}/${ENDPOINT}/list`);
            const responseData = response.data;
            if (responseData?.data && Array.isArray(responseData.data)) {
                const data = responseData.data;
                setStartPointOptions(data.map(item => ({ value: item.startPoint, label: item.startPoint })));
                setEndPointOptions(data.map(item => ({ value: item.endPoint, label: item.endPoint })));
                return data;
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            setStartPointOptions([]);
            setEndPointOptions([]);
            return [];
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post('https://web-tong-hop-fe.vercel.app/bus/search', {
                startPoint: selectedStartPoint?.value || '',
                endPoint: selectedEndPoint?.value || '',
                travelTime: selectedDate
            });
            if (response.data.success) {
                navigator('/bus', { state: { tripsData: response.data.data } });
            } else {
                console.error('Lỗi từ server:', response.data.message);
            }
        } catch (err) {
            console.error('Lỗi khi tìm kiếm:', err.response?.data || err.message);
        }
    };

    const navLinks = [
        { to: "/", label: "Đặt vé xe" },
        { to: "/about", label: "Về chúng tôi" },
        { to: "/bus", label: "Lịch trình" },
        { to: "/blog", label: "Tin tức" },
        { to: "/contact", label: "Liên hệ" },
    ];

    return (
        <header className="p-0 mb-3">
            {/* ── FIXED NAVBAR ── */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
                {/* Top bar: logo + auth */}
                <div className="w-[90%] lg:w-[80%] mx-auto flex justify-between items-center py-3">
                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <img
                            src="/assets/images/main/logo.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* Desktop auth links */}
                    <ul className="hidden md:flex gap-1 list-none items-center">
                        <li className="hover:bg-black/10 px-4 py-2 cursor-pointer rounded-md">
                            <Link to="/contact">Hỗ trợ</Link>
                        </li>
                        <li className="hover:bg-black/10 px-4 py-2 cursor-pointer rounded-md">
                            <Link to="/bookingHistory">Đặt chỗ của tôi</Link>
                        </li>
                        {user ? (
                            <>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    {user.fullName}
                                    <i className="fas fa-angle-down ml-2"></i>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                                >
                                    <MenuItem onClick={handleProfile}>Tài khoản của tôi</MenuItem>
                                    <MenuItem onClick={handleHistory}>Lịch sử mua vé</MenuItem>
                                    <MenuItem onClick={logout}>Đăng xuất</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <li className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-black/10 cursor-pointer">
                                    <Link to="/register" className="no-underline">
                                        <i className="fas fa-user mr-2"></i>Đăng ký
                                    </Link>
                                </li>
                                <li className="rounded-lg px-4 py-2 bg-sky-500 hover:bg-sky-600 transition duration-300 font-bold">
                                    <Link to="/login" className="no-underline text-white">Đăng nhập</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 text-gray-700 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>

                <hr className="border-gray-200" />

                {/* Desktop bottom nav */}
                <div className="hidden md:block w-[80%] mx-auto py-1">
                    <ul className="flex flex-wrap gap-1 list-none items-center font-bold">
                        {navLinks.map(({ to, label }) => (
                            <li key={to} className="hover:bg-black/10 px-4 py-2 cursor-pointer rounded-md">
                                <Link to={to}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile dropdown menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#043175] text-white shadow-lg">
                        <ul className="flex flex-col text-center font-bold py-4 list-none">
                            {navLinks.map(({ to, label }) => (
                                <li
                                    key={to}
                                    className="hover:bg-black/20 px-4 py-3 cursor-pointer"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Link to={to} className="text-white no-underline block">{label}</Link>
                                </li>
                            ))}
                            <hr className="border-white/20 my-2" />
                            <li
                                className="hover:bg-black/20 px-4 py-3 cursor-pointer"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Link to="/contact" className="text-white no-underline block">Hỗ trợ</Link>
                            </li>
                            <li
                                className="hover:bg-black/20 px-4 py-3 cursor-pointer"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Link to="/bookingHistory" className="text-white no-underline block">Đặt chỗ của tôi</Link>
                            </li>
                            {user ? (
                                <>
                                    <li
                                        className="hover:bg-black/20 px-4 py-3 cursor-pointer"
                                        onClick={() => { navigator("/profile"); setMobileMenuOpen(false); }}
                                    >
                                        Tài khoản của tôi
                                    </li>
                                    <li
                                        className="hover:bg-black/20 px-4 py-3 cursor-pointer"
                                        onClick={() => { navigator("/bookingHistory"); setMobileMenuOpen(false); }}
                                    >
                                        Lịch sử mua vé
                                    </li>
                                    <li
                                        className="hover:bg-black/20 px-4 py-3 cursor-pointer"
                                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                                    >
                                        Đăng xuất
                                    </li>
                                </>
                            ) : (
                                <li className="flex gap-3 justify-center px-4 py-3">
                                    <Link
                                        to="/register"
                                        className="border border-white rounded-lg px-4 py-2 text-white no-underline"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Đăng ký
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="bg-sky-500 rounded-lg px-4 py-2 text-white no-underline font-bold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Đăng nhập
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </nav>

            {/* ── HERO SECTION ── */}
            {/* pt accounts for fixed navbar height (~112px desktop, ~64px mobile) */}
            <div
                id="homeHeader"
                className="w-full min-h-[320px] md:min-h-[500px] bg-cover bg-center relative text-white flex justify-center items-center pt-28 md:pt-36 pb-10"
            >
                <div className="w-[90%] md:w-3/4 max-w-[1000px] text-center px-2">
                    <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 text-white">
                        Khám Phá Việt Nam, Theo Cách Của Bạn
                    </h1>

                    {/* Search box */}
                    <div className="w-full flex justify-center items-center rounded-2xl border-4 border-white/10">
                        <div className="flex flex-col bg-white shadow-md rounded-xl w-full gap-3 p-4">
                            <div className="flex flex-col md:flex-row w-full items-stretch md:items-center gap-3">

                                {/* Điểm đi */}
                                <div className="flex flex-col flex-1">
                                    <label className="text-blue-950 text-xs text-left px-2 font-semibold mb-1">Từ</label>
                                    <div className="flex items-center border border-gray-200 p-2 rounded-lg">
                                        <i className="fas fa-bus text-sky-700 shrink-0"></i>
                                        <Select
                                            options={startPointOptions}
                                            value={selectedStartPoint}
                                            onChange={setSelectedStartPoint}
                                            placeholder="Nhập điểm đi"
                                            className="outline-none w-full bg-transparent ml-2 text-blue-950"
                                            styles={customStyles}
                                        />
                                    </div>
                                </div>

                                {/* Swap icon */}
                                <div className="hidden md:flex items-center justify-center shrink-0 mt-5">
                                    <i className="fas fa-exchange-alt text-sky-700 text-lg cursor-pointer hover:text-gray-700"></i>
                                </div>

                                {/* Điểm đến */}
                                <div className="flex flex-col flex-1">
                                    <label className="text-blue-950 text-xs text-left px-2 font-semibold mb-1">Đến</label>
                                    <div className="flex items-center border border-gray-200 p-2 rounded-lg">
                                        <i className="fas fa-bus text-sky-700 shrink-0"></i>
                                        <Select
                                            options={endPointOptions}
                                            value={selectedEndPoint}
                                            onChange={setSelectedEndPoint}
                                            placeholder="Nhập điểm đến"
                                            className="outline-none w-full bg-transparent ml-2 text-blue-950"
                                            styles={customStyles}
                                        />
                                    </div>
                                </div>

                                {/* Ngày khởi hành */}
                                <div className="flex flex-col flex-1">
                                    <label className="text-blue-950 text-xs text-left px-2 font-semibold mb-1">Ngày khởi hành</label>
                                    <div className="flex items-center border border-gray-200 p-2 rounded-lg relative">
                                        <i
                                            className="fas fa-calendar-alt text-sky-700 absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                            onClick={() => document.getElementById('departure-date').showPicker()}
                                        ></i>
                                        <input
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            type="date"
                                            id="departure-date"
                                            className="outline-none w-full bg-transparent pl-8 text-blue-950 cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Search button */}
                            <button
                                onClick={handleSearch}
                                className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto md:self-end text-white px-6 py-3 rounded-lg transition duration-300 font-semibold flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-search"></i>
                                <span className="md:hidden">Tìm kiếm</span>
                            </button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-4 text-white justify-start">
                        <span className="font-bold text-sm">Tìm kiếm</span>
                        <Link to="#" className="bg-gray-500 text-white px-3 py-1 rounded text-xs no-underline">
                            Khám phá ý tưởng chuyến đi
                        </Link>
                        <Link to="#" className="bg-gray-500 text-white px-3 py-1 rounded text-xs no-underline">
                            Tin tức
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── COMMENT STRIP ── */}
            <div className="w-full text-center mb-7 px-4">
                <div className="inline-block bg-gray-100 p-3 rounded-lg text-sm text-gray-700 italic">
                    <p>"Tuyến Sài Gòn - Đà Lạt dịch vụ tốt, tài xế vui vẻ, xe sạch sẽ! ⭐⭐⭐⭐⭐"</p>
                </div>
            </div>
        </header>
    );
}

export default Header;