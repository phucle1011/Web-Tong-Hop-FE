import { useRef } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../Helpers/Cards/BlogCard";
import Star from "../Helpers/icons/Star";
import PageTitle from "../Helpers/PageTitle";
import SimpleSlider from "../Helpers/SliderCom";
import Layout from "../Partials/LayoutHomeThree";

import blog from "../../../data/blogs.json";
import DataIteration from "../Helpers/DataIteration";

export default function About() {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: false,
    responsive: [
      {
        breakpoint: 1026,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  const slider = useRef(null);
  const prev = () => {
    slider.current.slickPrev();
  };
  const next = () => {
    slider.current.slickNext();
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="about-page-wrapper w-full">
        <div className="title-area w-full">
          {/* <PageTitle
            breadcrumb={[
              { name: "trang chủ", path: "/" },
              { name: "về chúng tôi", path: "/about" },
            ]}
          /> */}
        </div>

        <div className="aboutus-wrapper w-full">
          <div className="container-x mx-auto">
            <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
              <div className="md:w-[570px] w-full md:h-[100] h-auto rounded overflow-hidden my-5 lg:my-0">
                <img
                  src="https://res.cloudinary.com/dyu8kdule/image/upload/v1779260296/logo_h62roc.jpg"
                  alt="about"
                  className="w-full h-auto"
                />
              </div>
              <div className="content flex-1">
                <h1 className="text-[18px] font-medium text-qblack mb-2.5">Về Chúng Tôi</h1>
                <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                  Ra đời từ năm 2004, Công ty Trân Hương khởi nghiệp với dịch vụ cung cấp suất ăn cho công nhân.
                  Đến nay, chúng tôi đã trở thành doanh nghiệp dẫn đầu trong lĩnh vực cung cấp các dịch vụ
                  thực phẩm đa dạng trên khắp cả nước, được khách hàng tin tưởng và đánh giá cao.
                </p>
                <ul className="text-[15px] text-qgraytwo leading-7 list-disc ml-5 mb-5">
                  <li>Suất ăn công nghiệp & cơm trưa văn phòng chất lượng cao</li>
                  <li>Cung cấp rau sạch và thực phẩm sạch an toàn vệ sinh thực phẩm</li>
                  <li>Đạt chuẩn ISO 22000:2005 và ISO 9001:2008</li>
                  <li>Vinh danh Thương hiệu – Nhãn hiệu tin dùng năm 2017</li>
                  <li>Tổ chức sự kiện & cung cấp thiết bị bếp công nghiệp</li>
                </ul>
                <Link to="/contact">
                  <div className="w-[121px] h-10">
                    <span className="blue-btn">Liên hệ ngay</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 🔵 Phần dịch vụ chuyển sang nền màu xanh nước biển */}
        <div className="container-x mx-auto my-[60px]">
          <div
            data-aos="fade-down"
            className="best-services w-full bg-[#007BFF] text-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
          >
            {/* Đổi toàn bộ chữ sang màu trắng cho dễ đọc */}
            {[
              {
                title: 'Đổi trả miễn phí',
                desc: 'Hỗ trợ đổi trả trong 30 ngày',
                icon: (
                  <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M30.7 2L29.5 10.85L20.5 9.65" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  </svg>
                )
              },
              {
                title: 'Thanh toán an toàn',
                desc: 'Bảo mật tuyệt đối 100%',
                icon: (
                  <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    <path d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    <path d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  </svg>
                )
              },
              {
                title: 'Chất lượng tốt nhất',
                desc: 'Cam kết sản phẩm chính hãng',
                icon: (
                  <svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M16 28V22" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    <path d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <div key={idx} className="item">
                <div className="flex space-x-5 items-center">
                  <div>{item.icon}</div>
                  <div>
                    <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">{item.title}</p>
                    <p className="text-sm text-white">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* <div className="blog-post-wrapper w-full mb-[30px]">
          <div className="container-x mx-auto">
            <div className="blog-post-title flex justify-center items-cente mb-[30px]">
              <h1 className="text-3xl font-semibold text-qblack">
                My Latest News
              </h1>
            </div>

            <div className="blogs-wrapper w-full">
              <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
                <DataIteration datas={blog.blogs} startLength={0} endLength={2}>
                  {({ datas }) => (
                    <div
                      data-aos="fade-up"
                      key={datas.id}
                      className="item w-full"
                    >
                      <BlogCard datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
