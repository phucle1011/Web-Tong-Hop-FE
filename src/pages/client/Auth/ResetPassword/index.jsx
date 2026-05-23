import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "../../Partials/LayoutHomeThree";
import Thumbnail from "./Thumbnail";
import Constants from "../../../../Constants";

const URL = Constants.DOMAIN_API;

export default function ResetPassword() {
  console.log("=== RESET PASSWORD COMPONENT LOADED ===");
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: mật khẩu mới
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm();

  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: errorsOTP },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    formState: { errors: errorsPassword },
  } = useForm();

  // Bước 1: Gửi OTP về email
  const onSubmitEmail = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${URL}/auth/reset-password`, { email: data.email });
      setEmail(data.email);
      toast.success("Mã OTP đã được gửi về email của bạn!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Xác thực OTP
  const onSubmitOTP = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/auth/verify-reset-otp`, {
        email,
        otp: data.otp,
      });
      setResetToken(res.data.data.resetToken);
      toast.success("Xác thực OTP thành công!");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Mã OTP không hợp lệ!");
    } finally {
      setLoading(false);
    }
  };

  // Bước 3: Đặt lại mật khẩu
  const onSubmitPassword = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${URL}/auth/update-password`, {
        resetToken,
        password: data.password,
      });
      toast.success("Đặt lại mật khẩu thành công!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  // Gửi lại OTP
  const resendOTP = async () => {
    setLoading(true);
    try {
      await axios.post(`${URL}/auth/reset-password`, { email });
      toast.success("Đã gửi lại mã OTP!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi gửi lại OTP!");
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Nhập email", "Xác thực OTP", "Mật khẩu mới"];

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="login-page-wrapper w-full py-12">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full bg-white flex flex-col justify-center sm:p-12 p-6 border border-[#E0E0E0]">
              <div className="w-full">

                {/* Title */}
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-6">
                  <h1 className="text-[36px] font-bold leading-[80px] text-qblack">
                    Quên mật khẩu
                  </h1>
                  <div className="shape -mt-6">
                    <svg width="354" height="30" viewBox="0 0 354 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1" stroke="#FFBB38" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Thanh tiến trình */}
                <div className="flex items-center justify-center mb-8">
                  {stepLabels.map((label, i) => {
                    const s = i + 1;
                    return (
                      <div key={s} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                            ${step > s ? "bg-green-500 text-white" : step === s ? "bg-qblack text-white" : "bg-gray-200 text-gray-500"}`}>
                            {step > s ? "✓" : s}
                          </div>
                          <span className={`text-xs mt-1 ${step === s ? "text-qblack font-semibold" : "text-gray-400"}`}>
                            {label}
                          </span>
                        </div>
                        {s < 3 && (
                          <div className={`w-14 h-1 mx-1 mb-4 rounded transition-all duration-300 ${step > s ? "bg-green-500" : "bg-gray-200"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* BƯỚC 1: Nhập email */}
                {step === 1 && (
                  <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                    <p className="text-sm text-gray-500 mb-5 text-center">
                      Nhập email đã đăng ký để nhận mã OTP
                    </p>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Nhập email đã đăng ký"
                        className={`w-full px-4 py-2 border ${errorsEmail.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-indigo-500`}
                        {...registerEmail("email", {
                          required: "Vui lòng nhập email",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email không hợp lệ",
                          },
                        })}
                      />
                      {errorsEmail.email && (
                        <p className="text-red-500 text-sm mt-1">{errorsEmail.email.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300 disabled:opacity-60"
                    >
                      {loading ? "Đang gửi..." : "Gửi mã OTP"}
                    </button>

                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500">
                        Đã nhớ mật khẩu?{" "}
                        <Link to="/login" className="text-qblack font-medium hover:underline">
                          Đăng nhập
                        </Link>
                      </p>
                    </div>
                  </form>
                )}

                {/* BƯỚC 2: Nhập OTP */}
                {step === 2 && (
                  <form onSubmit={handleSubmitOTP(onSubmitOTP)}>
                    <p className="text-sm text-gray-500 mb-2 text-center">
                      Mã OTP đã gửi đến <strong>{email}</strong>
                    </p>
                    <p className="text-xs text-center text-orange-500 mb-5">
                      ⏱ Mã có hiệu lực trong <strong>2 phút</strong>
                    </p>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã OTP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="_ _ _ _ _ _"
                        className={`w-full px-4 py-3 border ${errorsOTP.otp ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-indigo-500 text-center text-2xl font-bold tracking-[0.5em]`}
                        {...registerOTP("otp", {
                          required: "Vui lòng nhập mã OTP",
                          minLength: { value: 6, message: "Mã OTP gồm 6 số" },
                          maxLength: { value: 6, message: "Mã OTP gồm 6 số" },
                          pattern: { value: /^[0-9]+$/, message: "Mã OTP chỉ gồm chữ số" },
                        })}
                      />
                      {errorsOTP.otp && (
                        <p className="text-red-500 text-sm mt-1">{errorsOTP.otp.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300 disabled:opacity-60"
                    >
                      {loading ? "Đang xác thực..." : "Xác nhận OTP"}
                    </button>

                    <div className="flex justify-between mt-4 text-sm">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-gray-500 hover:underline"
                      >
                        ← Đổi email
                      </button>
                      <button
                        type="button"
                        onClick={resendOTP}
                        disabled={loading}
                        className="text-qblack font-medium hover:underline disabled:opacity-60"
                      >
                        Gửi lại mã
                      </button>
                    </div>
                  </form>
                )}

                {/* BƯỚC 3: Đặt mật khẩu mới */}
                {step === 3 && (
                  <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                    <p className="text-sm text-gray-500 mb-5 text-center">
                      Nhập mật khẩu mới cho tài khoản của bạn
                    </p>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu mới <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        placeholder="● ● ● ● ● ●"
                        className={`w-full px-4 py-2 border ${errorsPassword.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-indigo-500`}
                        {...registerPassword("password", {
                          required: "Vui lòng nhập mật khẩu",
                          minLength: { value: 6, message: "Mật khẩu phải ít nhất 6 ký tự" },
                        })}
                      />
                      {errorsPassword.password && (
                        <p className="text-red-500 text-sm mt-1">{errorsPassword.password.message}</p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Xác nhận mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        placeholder="● ● ● ● ● ●"
                        className={`w-full px-4 py-2 border ${errorsPassword.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-indigo-500`}
                        {...registerPassword("confirmPassword", {
                          required: "Vui lòng xác nhận mật khẩu",
                          validate: (val) =>
                            val === watch("password") || "Mật khẩu xác nhận không khớp",
                        })}
                      />
                      {errorsPassword.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errorsPassword.confirmPassword.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300 disabled:opacity-60"
                    >
                      {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
                    </button>
                  </form>
                )}

              </div>
            </div>

            {/* Hình ảnh bên phải */}
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
              <div className="absolute xl:-right-20 -right-[138px]" style={{ top: "calc(50% - 258px)" }}>
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}