import React from 'react';
import "./DieuKhoan.css";

export default function DieuKhoan() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='dieukhoan'>
      <div className='d-flex justify-content-between'>
        <div>
          <h1>ĐIỀU KHOẢN & ĐIỀU KIỆN</h1>
        </div>
        <div>
          <button className="btn  btn-success bg" onClick={goBack}>
            QUAY LẠI
          </button>{" "}
        </div>
      </div>

      <hr></hr>
      <h6>BẠN PHẢI ĐỌC NHỮNG ĐIỀU KHOẢN SỬ DỤNG DƯỚI ĐÂY TRƯỚC KHI SỬ DỤNG TRANG WEB NÀY. VIỆC SỬ DỤNG TRANG WEB NÀY XÁC
        NHẬN VIỆC CHẤP THUẬN VÀ TUÂN THỦ CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN DƯỚI ĐÂY.</h6>
      <p>Bằng cách truy cập và/hoặc sử dụng Trang Web <a href="http://localhost:3000/">http://localhost:3000/ </a> (“Trang Web”), bạn thừa nhận rằng bạn đã đọc,
        hiểu và đồng ý chịu sự ràng buộc bởi các Điều Khoản Sử Dụng được quy định dưới đây và các điều khoản và điều kiện
        khác liên quan đến Trang Web, bao gồm nhưng không giới hạn ở các điều khoản và điều kiện về bảo mật và Các Câu Hỏi
        Thường Gặp, mà chúng cấu thành các thành phần không thể tách rời của các Điều Khoản Sử Dụng (“Điều Khoản”) này.
        Bạn phải đủ mười tám (18) tuổi trở lên để được phép sử dụng Trang Web.</p>
      <p>Xin lưu ý rằng chúng tôi có thể thay đổi, sửa đổi, bổ sung và loại bỏ các Điều Khoản này vào bất cứ thời điểm nào mà
        không cần thông báo trước. Bạn phải đọc các Điều Khoản này một cách định kỳ. Bằng việc tiếp tục sử dụng Trang Web này
        sau khi đã có những thay đổi như vậy đối với các Điều Khoản, người truy cập, người dùng hoặc Người Dùng Đã Đăng Ký
        (“bạn” hay “Người Dùng”) đồng ý và chấp thuận với những thay đổi đó. Nếu bạn sử dụng bất kỳ dịch vụ nào khác của
        chúng tôi, thì việc sử dụng của bạn được dựa trên sự chấp thuận và tuân thủ các điều khoản và điều kiện được áp
        dụng đối với các dịch vụ đó.</p>
      <p>Các quy định của Điều Khoản Sử Dụng này được dịch từ phiên bản gốc tiếng Anh, và được cung cấp nhằm tạo sự thuận
        tiện cho việc xem xét của bạn. Có thể có một số khác biệt giữa bản dịch và bản gốc tiếng Anh, và trong trường hợp
        có bất kỳ sự khác biệt nào như vậy, thì sự khác biệt đó được coi là lỗi dịch thuật và bản tiếng Anh sẽ được ưu
        tiên áp dụng. Nếu nghi ngờ về tính chính xác của thông tin chứa trong bản dịch, xin vui lòng tham khảo phiên bản
        tiếng Anh.</p>
      <hr></hr>
      <div className='dieukhoancontent'>
        <h6>1. PHẠM VI CÁC DỊCH VỤ CỦA CHÚNG TÔI</h6>
        <p>1.1 Thông qua Trang Web, happyflight cung cấp một nền công cụ trực tuyến, nơi bạn có thể duyệt tìm các hãng hàng không
          khác nhau, và/hoặc nơi lưu trú và phòng ở tạm thời (nếu có), và thực hiện việc đặt chỗ (“Dịch Vụ”). Người Dùng có
          thể đặt trên Trang Web các dịch vụ do các khách sạn, hãng hàng không và/hoặc bất kỳ nhà cung cấp dịch vụ khác
          (“Các Nhà Cung Cấp”) cung cấp. Bằng cách đưa ra một lệnh đặt chỗ thông qua Trang Web, bạn có thể đặt chỗ máy bay,
          phòng khách sạn, hoặc các dịch vụ khác trên Trang Web của chúng tôi. Chúng tôi sẽ gửi một xác nhận lệnh đặt chỗ
          qua email xác nhận. Chúng tôi bảo lưu quyền từ chối lệnh đặt chỗ của bạn theo quy định dưới đây.</p>
        <p>1.2 Mặc dù chúng tôi sẽ sử dụng những kỹ năng chuyên môn với sự cẩn trọng của chúng tôi trong việc thực hiện
          dịch vụ, chúng tôi không xác nhận, và không đảm bảo rằng tất cả các thông tin được cung cấp là chính xác, đầy đủ,
          phù hợp hoặc hiện hành, và chúng tôi không chịu trách nhiệm cho bất kỳ sai sót nào (bao gồm cả các lỗi sắp xếp
          và đánh máy), trở ngại (cho dù do sự hư hỏng, sửa chữa hoặc nâng cấp tạm thời và/hoặc cục bộ đối với Trang Web
          hoặc lý do khác), không chính xác, nhầm lẫn hoặc thông tin sai lệch hoặc việc không thể chuyển thông tin.
          Điều này bao gồm tất cả thông tin trên Trang Web hoặc các nền tảng khác của chúng tôi trong đó liên quan
          đến loại máy bay, sơ đồ chỗ ngồi, khoảng cách ghế, hệ thống giải trí trên chuyến bay và WiFi, hoặc bất kỳ
          thông tin nào khác liên quan đến các tiện ích trên chuyến bay.</p>
        <p>1.3 Xảy ra những thay đổi về điều kiện hoặc hoàn cảnh thị trường mà có thể dẫn đến những thay đổi trong một thời
          gian ngắn khiến thông tin được cung cấp không chính xác hoặc không hiện hành. Trong trường hợp có bất kỳ vấn đề
          gì, bộ phận dịch vụ khách hàng có thể liên hệ để hỗ trợ bạn và giải đáp cho các thắc mắc của bạn.</p>
        <p>1.4 Trang Web này không đưa ra bất cứ tuyên bố nào và không được giải thích là đưa ra bất cứ đề nghị hoặc gợi
          ý nào về mức độ chất lượng dịch vụ hoặc đánh giá xếp hạng về các Nhà Cung Cấp được liệt kê trên Trang Web.
          Chúng tôi tuyên bố khước từ bất kỳ khiếu nại, tổn thất hoặc trách nhiệm nào đối với chất lượng hay tình trạng
          của Nhà Cung Cấp hiện hữu được liệt kê trên Trang Web (cung cấp các dịch vụ hàng không, khách sạn hoặc các
          dịch vụ khác). Các Nhà Cung Cấp có thể được giới thiệu ở hình thức phân loại thứ hạng khác nhau dựa trên
          các yếu tố bao gồm nhưng không giới hạn các đánh giá, xếp hạng hoặc các yếu tố khác của họ. Sự xếp hạng
          đưa ra được tính dựa trên các thuật toán tự động có thể được cập nhật và thay đổi tùy từng thời điểm,
          theo quyết định chỉ của riêng của chúng tôi.</p>
        <p>1.5 Chúng tôi có quyền không chấp nhận bất kỳ Người Dùng hoặc việc đặt chỗ nào (hoặc trong một số trường hợp,
          hủy bỏ xác nhận việc đặt chỗ) theo quyết định của riêng chúng tôi vì bất kỳ nguyên nhân nào và không cần đưa
          ra lý do cho việc bác bỏ/từ chối/hủy bỏ. Những lý do để từ chối Người Dùng hoặc việc đặt chỗ hoặc hủy bỏ
          việc xác nhận đặt chỗ có thể bao gồm nhưng không giới hạn ở: vi phạm các Điều Khoản này, xử phạt về thương
          mại hay kinh tế của các cơ quan thẩm quyền toàn cầu hoặc quốc gia, cấm vận, các quy định cấm, gian lận hoặc
          trộm cắp (hoặc có dấu hiệu hay nghi ngờ gian lận hoặc trộm cắp), nghi ngờ về hoạt động tội phạm, việc đặt
          chỗ có dấu hiệu khả nghi, dịch vụ không có hoặc Nhà Cung Cấp không còn cung cấp, Người Dùng cung cấp thông
          tin không chính xác, thông tin sai hoặc thông tin nhầm lẫn, các vấn đề về trao đổi, thông tin, giao dịch
          điện tử thẻ tín dụng, hành vi không phù hợp, các mối đe dọa, xúc phạm, từ chối cung cấp thông tin, trở ngại
          thực tế, khó khăn hoặc trục trặc trong trao đổi thông tin, Lỗi Thực (được mô tả dưới đây), tiền sử có hành
          vi vi phạm những Điều Khoản này hoặc bị từ chối, hoặc có tên trong bất kỳ “danh sách đen” hay “danh sách
          bị theo dõi” của chính phủ hoặc các tổ chức quốc tế. Trong trường hợp đặt chỗ bị happyflight từ chối hoặc
          hủy bỏ và việc thanh toán đã được thực hiện, happyflight sẽ hoàn trả số tiền đã được thanh toán mà không
          tính thêm khoản phí nào. Chúng tôi có thể xóa hoặc gỡ bỏ (“Bị Gỡ Bỏ”) tư cách thành viên của Người Dùng
          Trang Web này bất cứ lúc nào, tạm thời hoặc vĩnh viễn. Những Người Dùng Bị Gỡ Bỏ bị cấm việc cố gắng
          sử dụng Trang Web với bất kỳ tên nào khác hoặc thông qua Người Dùng khác (được mô tả dưới đây trong quy định
          về Cơ Chế Phòng Chống Gian Lận).</p>
        <p>1.6 Trong trường hợp cụ thể, chúng tôi có thể hủy bỏ hoặc từ chối giao dịch đặt chỗ đối với các “Lỗi
          Thực”, mà không phụ thuộc vào nguồn gốc các sai sót. Để tránh sự nghi ngờ, Lỗi Thực là lỗi trên Trang
          Web (ví dụ như trong điều khoản về giá cả) mà không có người bình thường nào cho là phù hợp hoặc có ý
          nghĩa trong kinh doanh. Số tiền đã thanh toán sẽ được hoàn trả mà không tính thêm khoản phí nào khác
          trong trường hợp như vậy.</p>
        <h6>2. HỦY BỎ</h6>
        <p>2.1 Bằng cách thực hiện việc đặt chỗ, đăng ký chỗ hoặc giữ chỗ qua Trang Web, bạn chấp nhận và đồng ý
          với các điều khoản và điều kiện của các Nhà Cung Cấp liên quan, bao gồm các chính sách liên quan đến hủy
          bỏ và/hoặc vắng mặt, hoặc đối với các yêu cầu cụ thể mà bạn có thể đưa ra cho Nhà Cung Cấp. happyflight
          không chịu trách nhiệm cho bất kỳ vi phạm các điều khoản và điều kiện này mà đã có sự đồng ý giữa Nhà
          Cung Cấp và Người Dùng, hoặc dựa trên các yêu cầu cụ thể của Người Dùng, vì vậy xin vui lòng đọc các
          điều khoản và điều kiện của các Nhà Cung Cấp một cách cẩn thận.</p>
        <p>2.2 Liên quan đến sự hủy bỏ đặt chỗ của Người Dùng mà đã được hoàn thành, happyflight có thể giữ lại
          hoặc lấy một phần của số tiền đã thanh toán để bồi hoàn những chi phí đã phát sinh liên quan đến việc
          huỷ bỏ.</p>
        <h6>3. NHỮNG YÊU CẦU ĐẶC BIỆT</h6>
        <p>3.1 Trong trường hợp có bất kỳ yêu cầu đặc biệt nào liên quan đến việc đặt chỗ (ví dụ: phòng ở có
          thể đưa xe lăn vào dễ dàng, hỗ trợ xe lăn tại thời điểm giao vé, thay đổi tên, thay đổi ngày, tích
          điểm “người bay thường xuyên” hoặc tương tự), Người Dùng có thể thêm các yêu cầu khi thực hiện đặt
          chỗ trên Trang Web hoặc liên hệ trực tiếp với Nhà Cung Cấp (nếu áp dụng). Các yêu cầu sẽ được phục
          vụ theo quyết định của Nhà Cung Cấp và happyflight, trên cơ sở sự có sẵn và các yếu tố khác.</p>
        <p>3.2 Trong trường hợp đổi lịch bay (bao gồm nhưng không giới hạn đối với các thay đổi về ngày giờ,
          chặng bay và/hoặc hành khách) do người dùng yêu cầu, happyflight bảo lưu quyền được hủy bất kỳ đặt
          chỗ mới nào được hình thành thông qua tiến trình đổi lịch bay nếu phát hiện đặt chỗ ban đầu không
          còn hiệu lực (vd. đặt chỗ đã được sử dụng hoặc hoàn tiền).</p>
        <h6>3. NHỮNG YÊU CẦU ĐẶC BIỆT</h6>
        <p>3.1 Trong trường hợp có bất kỳ yêu cầu đặc biệt nào liên quan đến việc đặt chỗ (ví dụ: phòng ở có
          thể đưa xe lăn vào dễ dàng, hỗ trợ xe lăn tại thời điểm giao vé, thay đổi tên, thay đổi ngày, tích
          điểm “người bay thường xuyên” hoặc tương tự), Người Dùng có thể thêm các yêu cầu khi thực hiện đặt
          chỗ trên Trang Web hoặc liên hệ trực tiếp với Nhà Cung Cấp (nếu áp dụng). Các yêu cầu sẽ được phục
          vụ theo quyết định của Nhà Cung Cấp và happyflight, trên cơ sở sự có sẵn và các yếu tố khác.</p>
        <p>3.2 Trong trường hợp đổi lịch bay (bao gồm nhưng không giới hạn đối với các thay đổi về ngày giờ,
          chặng bay và/hoặc hành khách) do người dùng yêu cầu, happyflight bảo lưu quyền được hủy bất kỳ đặt chỗ
          mới nào được hình thành thông qua tiến trình đổi lịch bay nếu phát hiện đặt chỗ ban đầu không còn
          hiệu lực (vd. đặt chỗ đã được sử dụng hoặc hoàn tiền).</p>
        <h6>4. LỜI KHUYÊN VỀ DU LỊCH</h6>
        <p>4.1 Bằng cách hiển thị các điểm đến cụ thể, happyflight không tuyên bố hoặc bảo đảm rằng việc đến
          các điểm này là nên hoặc không có rủi ro và happyflight không chịu trách nhiệm pháp lý về thiệt hại
          hay tổn thất có thể xảy ra do việc du lịch đến các điểm đó. Trong mọi trường hợp happyflight sẽ không
          chịu trách nhiệm pháp lý về bất kỳ sự cố bất lợi xảy ra trong suốt chuyến đi hoặc sự lưu trú của
          bạn. Bạn tự chịu trách nhiệm về việc lựa chọn chuyến du lịch, lộ trình và điểm đến, cho toàn bộ
          hành trình của bạn. happyflight không chịu trách nhiệm cho bất kỳ tổn thất nào xảy ra khi bạn
          không mang theo giấy tờ cần thiết cho chuyến du lịch, chẳng hạn như hộ chiếu của bạn.</p>
        <p>4.2 Nếu bạn mua vé khứ hồi trong cùng một mã đặt chỗ hàng không (Mã tên hành khách, được
          viết tắt là PNR), vé cả chiều đi và chiều về phải được sử dụng đầy đủ, như được nêu rõ trong hành
          trình của vé điện tử happyflight. Nếu chỉ sử dụng (i) chiều đi hoặc chiều về; hoặc (ii) sử dụng một
          phần của chuyến bay khứ hồi, có thể khiến vé còn lại mất hiệu lực và không thể hoàn tiền. happyflight
          sẽ không chịu bất cứ trách nhiệm nào nếu hành khách vi phạm những điều khoản và điều kiện này.</p>
        <p>4.3 Bạn sẽ hoàn toàn có trách nhiệm xin cấp, giữ gìn và sẵn sàng xuất trình giấy phép du lịch hợp
          lệ và còn hiệu lực hoặc các giấy tờ cần thiết cho việc nhập cảnh của bạn ở nước ngoài (bao gồm, nhưng
          không giới hạn, thị thực nhập cảnh hoặc các loại giấy phép du lịch khác, dùng để quá cảnh hoặc cho mục
          đích khác) trước khi hoàn thành việc đặt chỗ hoặc đặt phòng cho chuyến du lịch của bạn phù hợp với
          pháp luật hiện hành của quốc gia bạn khởi hành, đi đến, ngang qua hoặc quá cảnh. happyflight không
          có nghĩa vụ và trách nhiệm phải thông báo cho bạn về những điều cần chuẩn bị khi đi du lịch
          cũng như các giấy phép cần thiết để bạn có thể thực hiện chuyến đi của mình.happyflight
          có quyền giới hạn trách nhiệm pháp lý của mình trong trường hợp có bất kỳ tổn thất nào nảy sinh bắt
          nguồn hoặc liên quan đến các giấy phép du lịch của bạn.</p>
        <h6>5. XẾP HẠNG</h6>
        <p>5.1 Những xếp hạng được hiển thị trên Trang Web chỉ để cung cấp thông tin cho Người Dùng, và những
          xếp hạng hiện hữu đều dựa trên các thông tin do các bên thứ ba cung cấp, chẳng hạn như các nhà cung
          cấp, Người Dùng hoặc các trang web đánh giá khác. Chúng tôi không xác minh các xếp hạng được đưa ra
          và do đó không chịu trách nhiệm về tính chính xác của các xếp hạng hiện tại. Chúng tôi, tại đây,
          tuyên bố khước từ bất kỳ khiếu nại, tổn thất hoặc trách nhiệm pháp lý nào đối với các xếp hạng
          hiển thị trên Trang Web</p>
        <h6>6. GIÁ CẢ VÀ KHUYẾN MÃI</h6>
        <p>6.1 Tùy từng thời điểm, chúng tôi có thể chào mức giá thấp hơn và/hoặc chương trình khuyến mãi.
          Vui lòng lưu ý rằng những mức giá thấp hơn và chương trình khuyến mãi như vậy liên quan đến các
          điều kiện và yêu cầu khác nhau, ví dụ, liên quan đến việc đặt chỗ và chính sách hoàn trả.</p>
        <hr></hr>
      </div>
    </div>
  )
}
