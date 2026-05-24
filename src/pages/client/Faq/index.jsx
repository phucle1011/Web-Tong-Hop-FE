import { useState } from "react";
import Swal from "sweetalert2";
import Accodion from "../Helpers/Accodion";
import InputFaq from "../Helpers/InputFaq";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeThree";

export default function Faq() {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { first_name, email, message } = formData;

  if (!first_name || !email || !message) {
    Swal.fire("Thiếu thông tin", "Vui lòng điền đầy đủ các trường.", "warning");
    return;
  }

  try {
    const res = await fetch("https://web-tong-hop-be.onrender.com/contact/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire(" Gửi thành công!", data.message, "success");
      setFormData({ first_name: "", email: "", message: "" });
    } else {
      Swal.fire(" Lỗi", data.error || "Không thể gửi email.", "error");
    }
  } catch (error) {
    Swal.fire(" Lỗi hệ thống", "Không thể kết nối đến server.", "error");
  }
};


  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="faq-page-wrapper w-full mb-10">
        <div className="page-title w-full">
          <PageTitle
            breadcrumb={[
              { name: "trang chủ", path: "/" },
              { name: "câu hỏi thường gặp", path: "/faq" },
            ]}
          />
        </div>
      </div>
      <div className="contact-wrapper w-full mb-10">
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full lg:flex lg:space-x-[30px]">
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
              <h1 className="text-qblack font-bold text-[22px] mb-4">
                Câu hỏi thường gặp
              </h1>
              <div className="flex flex-col space-y-7 justify-between">
                <Accodion
                  title="01. Làm thế nào để đặt mua trứng?"
                  des="Bạn có thể đặt mua trứng trực tiếp trên website bằng cách chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán.
                                Ngoài ra, bạn cũng có thể liên hệ hotline để được hỗ trợ đặt hàng nhanh chóng."
                />
                <Accodion
                  init
                  title="02. Trứng có đảm bảo tươi và an toàn không?"
                  des="Tất cả trứng đều được lấy từ trang trại uy tín, kiểm định chất lượng kỹ càng trước khi giao đến khách hàng.
                                Chúng tôi cam kết trứng luôn tươi mới và an toàn vệ sinh thực phẩm."
                />
                <Accodion
                  title="03. Tôi nên bảo quản trứng như thế nào?"
                  des="Nên bảo quản trứng trong ngăn mát tủ lạnh ở nhiệt độ ổn định. Tránh rửa trứng trước khi cất để giữ được lớp bảo vệ tự nhiên,
                                giúp trứng tươi lâu hơn."
                />
                <Accodion
                  title="04. Giao hàng trứng mất bao lâu?"
                  des="Thời gian giao hàng thường từ 1–3 ngày tùy khu vực. Chúng tôi luôn đóng gói cẩn thận để đảm bảo trứng không bị vỡ trong quá trình vận chuyển."
                />
                <Accodion
                  title="05. Nếu trứng bị vỡ khi nhận hàng thì sao?"
                  des="Nếu sản phẩm bị vỡ hoặc hư hỏng khi nhận hàng, bạn có thể liên hệ ngay với chúng tôi trong vòng 24 giờ để được hỗ trợ đổi trả hoặc hoàn tiền."
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white sm:p-10 p-5">
                <div className="title flex flex-col items-center">
                  <h1 className="lg:text-[34px] text-xl font-bold text-qblack">
                    Có bất kỳ câu hỏi nào hãy liên hệ chúng tôi
                  </h1>
                  <span className="-mt-5 block">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="inputs mt-5">
                  <div className="mb-4">
                    <InputFaq
                      label="Tên Khách Hàng"
                      placeholder="Họ và tên của bạn"
                      name="first_name"
                      inputClasses="h-[50px]"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <InputFaq
                      label="Địa Chỉ Email"
                      placeholder="điền email của bạn"
                      name="email"
                      inputClasses="h-[50px]"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-5">
                    <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                      Nội Dung
                    </h6>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="mời bạn nhập nội dung câu hỏi của mình"
                      className="w-full h-[105px] focus:ring-0 focus:outline-none p-3 border border-qgray-border placeholder:text-sm"
                    ></textarea>
                  </div>
                  <div>
                    <a href="#" onClick={handleSubmit}>
                      <div className="black-btn text-sm font-semibold w-full h-[50px] flex justify-center items-center">
                        <span>Gửi</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
