import React, { useEffect } from 'react';
import "./Footer.css";
import video1 from "../../../Assets/video1.mp4";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Footer() {

   useEffect(() => {
      Aos.init({ duration: 2000 })
   }, [])
   return (
      <section className='footer'>
         <div className='secContent '>
            <div className='contactDiv flex'>
               <div data-aos="fade-up" className='text'>
                  <small className='small'>KEEP IN TOUCH</small>
                  <h2 className='h2'>Travel with us</h2>
               </div>
            </div>

            <div className='inputDiv flex'>
               <input data-aos="fade-up" type='text' placeholder='Enter Email Address '></input>
               <button data-aos="fade-up" className='nn flex' type='submit'>
                  SEND <i class='bx bx-paper-plane icon'></i>
               </button>
            </div>
            <div className='footerCard flex'>
               <div className='footerIntro flex'>
                  {/* <div data-aos="fade-up" className='logoDiv'>
                     <a href='#' className='logo flex'>
                        <i class='bx bxs-plane-alt'></i>
                        <h2>Fresher</h2>
                     </a>
                  </div> */}
                  <div data-aos="fade-up" className='footerParagraph'>
                     Đăng ký E-Newsletter để cập nhật các thông tin, ưu đãi mới nhất từ Fresher Airlines.
                     (Không bao gồm các thông tin, ưu đãi từ chương trình Bông Sen Vàng)<br></br>
                     Fresher Airlines tự hào là Hãng hàng không quốc tế 5 sao.<br></br>
                     Xin trân trọng cảm ơn sự đồng hành của Quý khách và bạn hàng!
                  </div>
                  <div data-aos="fade-up" className='footerSocials'>
                     <i class='bx bxl-twitter icon'></i>
                     <i class='bx bxl-youtube icon'></i>
                     <i class='bx bxl-instagram icon' ></i>
                     <i class='bx bxl-facebook icon' ></i>
                  </div>
               </div>
               <div className='footerLinks grid'>
                  <div data-aos="fade-up" data-aos-duration="3000" className='linkGroup '>
                     <span className='groupTitle'>
                        Về FresherAirlines
                     </span>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Nhà đầu tư
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Tin tức
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Cơ hội nghề nghiệp
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Liên hệ chúng tôi
                     </li>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="3000" className='linkGroup'>
                     <span className='groupTitle'>
                        Mua vé ở đâu ?
                     </span>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Tổng đài bán vé
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Phòng bán vé
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Đại lý bán vé
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Vé trực tuyến
                     </li>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="3000" className='linkGroup '>
                     <span className='groupTitle'>
                        Mua hành lý xuất ăn
                     </span>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Chọn chỗ ngồi ưu tiên
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Mua trước hành lý
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Đặt trước xuất ăn
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Quà lưu niệm
                     </li>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="3000" className='linkGroup '>
                     <span className='groupTitle'>
                     Để có chuyến bay tốt đẹp
                     </span>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Điều lệ vận chuyển
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Phiếu yêu cầu hoàn vé
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Kênh thanh toán
                     </li>
                     <li className='footerList flex'>
                        <i class='bx bxs-chevron-right icon'></i>
                        Hóa đơn VAT
                     </li>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
