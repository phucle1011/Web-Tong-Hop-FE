import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeThree";

export default function PrivacyPolicy() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: "trang chủ", path: "/" },
              { name: "chính sách bảo mật", path: "privacy-policy" },
            ]}
          />
        </div>
        <div className="w-full">
  <div className="container-x mx-auto">

    <div className="content-item w-full mb-10">
      <h2 className="text-[18px] font-medium text-qblack mb-5">
        1. Mục đích và phạm vi thu thập thông tin
      </h2>
      <ul className="list-disc ml-5 text-[15px] text-qgraytwo leading-7">
        <li>Trong một số trường hợp, chúng tôi sẽ yêu cầu khách hàng cung cấp các thông tin cá nhân về họ tên, số điện thoại, địa chỉ, email. Các thông tin này có mục đích nhằm giúp chúng tôi có thể liên hệ và hỗ trợ khách hàng.

Chúng tôi sẽ thông báo về mục đích cụ thể khi cần thu thập thông tin cá nhân của khách hàng trên trang web này, và mọi thông tin đều phải được khách hàng tự nguyện cung cấp.</li>
        <li>Trong trường hợp phát hiện có hành vi sử dụng trái phép thông tin của khách hàng, vui lòng thông báo kịp thời để chúng tôi nhanh chóng có biện pháp xử lý phù hợp.</li>
      </ul>
    </div>

    <div className="content-item w-full mb-10">
      <h2 className="text-[18px] font-medium text-qblack mb-5">
        2. Phạm vi sử dụng thông tin
      </h2>
      <p className="text-[15px] text-qgraytwo leading-7">
        Chúng tôi sẽ sử dụng thông tin mà khách hàng cung cấp vào những mục đích hợp pháp dưới đây:
      </p>
      <ul className="list-disc ml-5 text-[15px] text-qgraytwo leading-7">
        <li>Dùng để trả lời các thắc mắc của khách hàng thông qua các thông tin liên hệ như địa chỉ email, điện thoại do khách hàng đã cung cấp.</li>
        <li>Dùng để liên lạc khi chúng tôi có nhu cầu tổ chức các đợt khảo sát khách hàng, tổ chức, doanh nghiệp.</li>
        <li>Tiếp nhận, trao đổi các ý kiến, đánh giá, bình luận của khách hàng nhằm cải thiện trải nghiệm của khách hàng khi sử dụng website. </li>
        <li>Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ công ty.</li>
        <li>Không sử dụng thông tin cá nhân của khách hàng ngoài mục đích xác nhận.    </li>
      </ul>
    </div>

    <div className="content-item w-full mb-10">
      <h2 className="text-[18px] font-medium text-qblack mb-5">
       3. Thời gian lưu trữ thông tin
      </h2>
      <p className="text-[15px] text-qgraytwo leading-7">
        Chúng tôi sẽ lưu trữ và bảo mật các thông tin cá nhân do khách hàng cung cấp trên hệ thống nội bộ trong một thời gian cần thiết cho đến khi hoàn thành mục đích thu thập hoặc khi khách hàng có yêu cầu hủy bỏ.
      </p>
    </div>

    <div className="content-item w-full mb-10">
      <h2 className="text-[18px] font-medium text-qblack mb-5">
        4. Phương tiện và công cụ tiếp cận chỉnh sửa thông tin
      </h2>
      <p className="text-[15px] text-qgraytwo leading-7">
        Thông tin cá nhân do khách hàng cung cấp sẽ được lưu trên hệ thống nội bộ của chúng tôi. Nếu có nhu cầu cần chỉnh sửa lại những sai sót trong dữ liệu đã cung cấp, khách hàng có thể liên hệ và yêu cầu chúng tôi điều chỉnh.
      </p>
    </div>

    <div className="content-item w-full mb-10">
      <h2 className="text-[18px] font-medium text-qblack mb-5">
        5. Quyền của người dùng
      </h2>
      <p className="text-[15px] text-qgraytwo leading-7">
        Bạn có quyền kiểm tra, cập nhật, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân bất cứ lúc nào bằng cách liên hệ với chúng tôi.
      </p>
    </div>

    <div className="content-item w-full mb-10">
      <h2 className="text-[18px] font-medium text-qblack mb-5">
        6. Cam kết bảo mật thông tin cá nhân khách hàng
      </h2>
      <ul className="list-disc ml-5 text-[15px] text-qgraytwo leading-7">
        <li>Chúng tôi cam kết sẽ nỗ lực hết sức và sử dụng các biện pháp bảo mật thích hợp để bảo đảm tốt nhất việc bảo mật các thông tin mà khách hàng cung cấp. </li>
        <li>Chúng tôi cam kết không chia sẻ, chuyển giao hay tiết lộ thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào khi không được sự đồng ý của khách hàng.</li>
        <li>Việc thu thập và sử dụng thông tin cá nhân chỉ được thực hiện khi có sự đồng ý của khách hàng, trừ trường hợp buộc phải cung cấp khi Cơ quan chức năng yêu cầu.</li>
      </ul>
    </div>
  </div>
</div>

      </div>
    </Layout>
  );
}
