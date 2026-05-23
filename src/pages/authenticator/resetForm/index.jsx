import { useState } from "react";
import { useForm } from "react-hook-form";
import Constants from "../../../Constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const URL = Constants.DOMAIN_API;

function ResetForm() {
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

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <ToastContainer position="top-right" autoClose={2000} />

            <div className="w-full max-w-md bg-white p-6 my-[50px] rounded-lg shadow-lg">
                <a href="/" className="text-[#043175] hover:underline hover:text-blue-800 text-sm">
                    &larr; Quay về trang chủ
                </a>

                <h2 className="text-2xl font-bold text-center text-[#043175] mt-2">
                    Quên mật khẩu
                </h2>

                {/* Thanh tiến trình */}
                <div className="flex items-center justify-center gap-2 mt-4 mb-6">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                ${step >= s ? "bg-[#043175] text-white" : "bg-gray-200 text-gray-500"}`}>
                                {s}
                            </div>
                            {s < 3 && (
                                <div className={`w-10 h-1 rounded transition-all ${step > s ? "bg-[#043175]" : "bg-gray-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* BƯỚC 1: Nhập email */}
                {step === 1 && (
                    <form onSubmit={handleSubmitEmail(onSubmitEmail)} className="p-3">
                        <p className="text-sm text-gray-500 mb-4 text-center">
                            Nhập email đăng ký để nhận mã OTP
                        </p>
                        <div>
                            <label className="block text-sm mb-2 font-bold text-[#043175]">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Nhập email đã đăng ký"
                                {...registerEmail("email", {
                                    required: "Vui lòng nhập email",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                            />
                            {errorsEmail.email && (
                                <small className="text-red-600">{errorsEmail.email.message}</small>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#043175] text-white py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Đang gửi..." : "Gửi mã OTP"}
                        </button>

                        <p className="text-center text-sm mt-3">
                            Đã nhớ mật khẩu?{" "}
                            <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a>
                        </p>
                    </form>
                )}

                {/* BƯỚC 2: Nhập OTP */}
                {step === 2 && (
                    <form onSubmit={handleSubmitOTP(onSubmitOTP)} className="p-3">
                        <p className="text-sm text-gray-500 mb-4 text-center">
                            Mã OTP đã được gửi đến <strong>{email}</strong>.<br />
                            Mã có hiệu lực trong <strong>2 phút</strong>.
                        </p>
                        <div>
                            <label className="block text-sm mb-2 font-bold text-[#043175]">Mã OTP</label>
                            <input
                                type="text"
                                maxLength={6}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center text-2xl font-bold tracking-widest"
                                placeholder="______"
                                {...registerOTP("otp", {
                                    required: "Vui lòng nhập mã OTP",
                                    minLength: { value: 6, message: "Mã OTP gồm 6 số" },
                                    maxLength: { value: 6, message: "Mã OTP gồm 6 số" },
                                    pattern: { value: /^[0-9]+$/, message: "Mã OTP chỉ gồm chữ số" },
                                })}
                            />
                            {errorsOTP.otp && (
                                <small className="text-red-600">{errorsOTP.otp.message}</small>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#043175] text-white py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Đang xác thực..." : "Xác nhận OTP"}
                        </button>

                        <div className="flex justify-between mt-3 text-sm">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-gray-500 hover:underline"
                            >
                                &larr; Đổi email
                            </button>
                            <button
                                type="button"
                                onClick={resendOTP}
                                disabled={loading}
                                className="text-blue-600 hover:underline disabled:opacity-60"
                            >
                                Gửi lại mã
                            </button>
                        </div>
                    </form>
                )}

                {/* BƯỚC 3: Đặt mật khẩu mới */}
                {step === 3 && (
                    <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="p-3">
                        <p className="text-sm text-gray-500 mb-4 text-center">
                            Nhập mật khẩu mới cho tài khoản của bạn
                        </p>
                        <div className="mb-3">
                            <label className="block text-sm mb-2 font-bold text-[#043175]">Mật khẩu mới</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Nhập mật khẩu mới"
                                {...registerPassword("password", {
                                    required: "Vui lòng nhập mật khẩu",
                                    minLength: { value: 6, message: "Mật khẩu phải ít nhất 6 ký tự" },
                                })}
                            />
                            {errorsPassword.password && (
                                <small className="text-red-600">{errorsPassword.password.message}</small>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm mb-2 font-bold text-[#043175]">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Nhập lại mật khẩu"
                                {...registerPassword("confirmPassword", {
                                    required: "Vui lòng xác nhận mật khẩu",
                                    validate: (val) =>
                                        val === watch("password") || "Mật khẩu xác nhận không khớp",
                                })}
                            />
                            {errorsPassword.confirmPassword && (
                                <small className="text-red-600">{errorsPassword.confirmPassword.message}</small>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#043175] text-white py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}

export default ResetForm;