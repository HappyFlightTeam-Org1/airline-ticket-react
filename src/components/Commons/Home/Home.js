import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import video from "../../../Assets/video.mp4";
import video2 from "../../../Assets/video2.mp4";
import "./Home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import * as Yup from "yup";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const checkFormSearch = Yup.object().shape({
  diemDi: Yup.string().required(" bắt buộc nhập"),
  diemDen: Yup.string()
    .required(" bắt buộc nhập")
    .test(
      "differentFromDiemDi",
      " điểm đến phải khác điểm đi",
      function (value) {
        const { diemDi } = this.parent; // Lấy giá trị của trường "diemDi"
        return value !== diemDi;
      }
    ),
  ngayDi: Yup.date()
    .nullable()
    .required(" bắt buộc nhập")
    .min(yesterday, " phải lớn hơn hoặc bằng ngày hiện tại"),
});

export default function Home({ on }) {
  //DucNh66 useState
  const [loaiChuyenBay, setLoaiChuyenBay] = useState("Một Chiều");
  const [soNguoiLon, setSoNguoiLon] = useState(1);
  const [soTreEm, setSoTreEm] = useState(0);
  const [soEmBe, setSoEmBe] = useState(0);
  const [sanBays, setSanBays] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  //DucNH66 Lấy danh sách sân bay
  useEffect(() => {
    axios
      .get("http://localhost:8080/chuyen-bay/listSelectOption")
      .then((response) => {
        const { sanBays } = response.data;
        setSanBays(sanBays);
      })
      .catch((err) => console.error);
  }, []);

  //DucNH66 Chọn chuyến bay 1chiều/khứ hồi
  useEffect(() => {
    const ngayVe = document.getElementById("ngayDiKh");
    const divNgayVe = document.getElementById("div-NgayVe");
    const labelNgayVe = document.getElementById("label-NgayVe");
    if (loaiChuyenBay === "Một Chiều") {
      divNgayVe.hidden = true;
      labelNgayVe.hidden = true;
      ngayVe.value = "";
    } else {
      divNgayVe.hidden = false;
      labelNgayVe.hidden = false;
    }
  }, [loaiChuyenBay]);

  //DucNH66 lấy dữ liệu từ form nhập dữ liệu tìm kiếm
  const handleChangeInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //DucNH66 Chọn số người lớn
  const chonSoNguoiLon = (event) => {
    setSoNguoiLon(event.target.value);
  };

  //DucNH66 Chọn số trẻ em
  const chonSoTreEm = (event) => {
    setSoTreEm(event.target.value);
  };

  //DucNH66 Chọn số em bé
  const chonSoEmBe = (event) => {
    setSoEmBe(event.target.value);
  };

  //DucNH66 Gởi dữ liệu đi để tìm kiếm chuyến bay
  const handleSubmit = (event) => {
    event.preventDefault();
    checkFormSearch
      .validate(formData, { abortEarly: false })
      .then(() => {
        navigate(
          "/TimKiemChuyenBay?soNguoiLon=" +
            soNguoiLon +
            "&soTreEm=" +
            soTreEm +
            "&soEmBe=" +
            soEmBe +
            "&diemDi=" +
            formData.diemDi +
            "&diemDen=" +
            formData.diemDen +
            "&ngayDi=" +
            formData.ngayDi +
            "&ngayDiKh=" +
            formData.ngayDiKh +
            "&loaiChuyenBay=" +
            loaiChuyenBay
        );
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className={`${on ? "start" : ""}`}>
      <section className="home">
        <div className="overlay"></div>
        {on ? (
          <video
            className="video"
            src={video2}
            muted
            autoPlay
            loop
            type="video/mp4"
          />
        ) : (
          <video
            className="video"
            src={video}
            muted
            autoPlay
            loop
            type="video/mp4"
          />
        )}
        <div className="homeContent">
          <div className="textDiv">
            <h1 data-aos="fade-up" className="homeTitle font-weight-bold">
              Tìm Kiếm Chuyến Bay
            </h1>
          </div>
          {/* Form nhập dữ liệu tìm kiếm */}
          <form onSubmit={handleSubmit}>
            <div data-aos="fade-up" className="cardDiv grid">
              <div className="destinationInput">
                <label className="label" htmlFor="city">
                  Loại Chuyến Bay
                </label>
                <select
                  className="select"
                  id="loaiChuyenBay"
                  name="loaiChuyenBay"
                  value={loaiChuyenBay}
                  onChange={(event) => setLoaiChuyenBay(event.target.value)}
                >
                  <option value="Một Chiều">Một Chiều</option>
                  <option value="Khứ Hồi">Khứ Hồi</option>
                </select>
              </div>
              <div className="destinationInput">
                <label className="label" htmlFor="city">
                  Điểm Đi{" "}
                  {errors.diemDi && (
                    <span style={{ color: "red" }}>{errors.diemDi}</span>
                  )}
                </label>
                <select
                  name="diemDi"
                  id="diemDi"
                  value={formData.diemDi}
                  onChange={handleChangeInput}
                  className="select "
                >
                  <option value="">-- Chọn điểm đi --</option>
                  {sanBays.map((sanBay) => (
                    <option key={sanBay.maSanBay} value={sanBay.thanhPho}>
                      {sanBay.thanhPho}
                    </option>
                  ))}
                </select>
              </div>
              <div className="destinationInput">
                <label className="label" htmlFor="city">
                  Điểm Đến{" "}
                  {errors.diemDen && (
                    <span style={{ color: "red" }}>{errors.diemDen}</span>
                  )}
                </label>
                <select
                  name="diemDen"
                  id="diemDen"
                  value={formData.diemDen}
                  onChange={handleChangeInput}
                  className="select "
                >
                  <option value="">-- Chọn điểm đến --</option>
                  {sanBays.map((sanBay) => (
                    <option key={sanBay.maSanBay} value={sanBay.thanhPho}>
                      {sanBay.thanhPho}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dateInput">
                <label className="label" htmlFor="city">
                  Ngày Đi{" "}
                  {errors.ngayDi && (
                    <span style={{ color: "red" }}>{errors.ngayDi}</span>
                  )}
                </label>
                <div className="input flex">
                  <input
                    type="date"
                    placeholder="name..."
                    value={formData.ngayDi}
                    name="ngayDi"
                    onChange={handleChangeInput}
                  ></input>
                </div>
              </div>
              <div className="dateInput">
                <label id="label-NgayVe" className="label" htmlFor="city">
                  Ngày Về{" "}
                  {errors.ngayDiKh && <strong>{errors.ngayDiKh}</strong>}
                </label>
                <div className="input flex" id="div-NgayVe">
                  <input
                    type="date"
                    placeholder="name..."
                    className="form-control"
                    name="ngayDiKh"
                    id="ngayDiKh"
                    value={formData.ngayDiKh}
                    onChange={handleChangeInput}
                  ></input>
                </div>
              </div>
              <div className="destinationInput">
                <label className="label" htmlFor="city">
                  Người Lớn
                </label>
                <div className="input flex">
                  <input
                    type="number"
                    min="1"
                    defaultValue={1}
                    onChange={chonSoNguoiLon}
                  ></input>
                </div>
              </div>
              <div className="destinationInput">
                <label className="label" htmlFor="city">
                  Trẻ em (dưới 12 tuổi)
                </label>
                <div className="input flex">
                  <input type="number" min="0" onChange={chonSoTreEm}></input>
                </div>
              </div>
              <div className="destinationInput">
                <label className="label" htmlFor="city">
                  Em bé (dưới 24 tháng)
                </label>
                <div className="input flex">
                  <input type="number" min="0" onChange={chonSoEmBe}></input>
                </div>
              </div>
              <div className="searchOptions flex mt-3">
                <button type="submit" className="btn btn-success">
                  {" "}
                  Tìm Chuyến Bay{" "}
                </button>
              </div>
            </div>
          </form>

          <div data-aos="fade-up" className="homeFooterIcons flex">
            <div className="rightIcons">
              <i class="bx bxl-facebook icon"></i>
              <i class="bx bxl-instagram icon"></i>
              <i class="bx bx-layout icon"></i>
            </div>
            <div className="leftIcons">
              <i class="bx bxs-playlist icon"></i>
              <i class="bx bx-qr icon"></i>
            </div>
          </div>
        </div>
      </section>
      <section className="main container section">
        <div className="secTitle">
          <h3 data-aos="fade-right" className={`title ${on ? "white" : ""}`}>
            Bán vé máy bay với giá rẻ hàng đầu Việt Nam
          </h3>
        </div>
        <div className="secContent grid">
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/free-photo/place-flying-sunset-sky_1112-1132.jpg?w=996&t=st=1682598588~exp=1682599188~hmac=689eb5e0df4a7b6fdf1d688c2906fe850d5913caf023bfd5ead33dcf8631274f"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Dịch Vụ Trên Không</h4>
              <span className="continent flex">
                <i class="fa-solid fa-plane-up"></i>
                <span className="name">B53-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Chào mừng đến với trang web bán vé máy bay của chúng tôi.
                  Chúng tôi cung cấp các dịch vụ vé máy bay với giá rẻ, đảm bảo
                  sự thuận tiện và an toàn cho chuyến đi của bạn.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/free-photo/airplane-seats_1308-5011.jpg?w=1800&t=st=1684979099~exp=1684979699~hmac=cc7fb4d31f4c852a1ceb1c217268cc79165ebfc32709ddb5909cb054a1b812c1"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Hạng Thương Gia</h4>
              <span className="continent flex">
                <i class="fa-solid fa-plane-up"></i>
                <span className="name">B53-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Trải nghiệm dịch vụ và công nghệ tân tiến khi bay hạng Thương
                  Gia cùng Vietnam Airlines. Giờ đây hành khách có thể tận hưởng
                  một chuyến bay đầy cảm hứng trên mọi khía cạnh.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/premium-photo/aircraft-cabin-interior_1417-4133.jpg?size=626&ext=jpg"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Hạng Phổ Thông Đặt Biệt</h4>
              <span className="continent flex">
                <i class="fa-solid fa-plane-up"></i>
                <span className="name">B53-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Lý tưởng cho những ai mong muốn có sự linh hoạt và tiện lợi
                  tối đa, hạng Phổ thông đặc biệt sẽ mang lại cho hành khách
                  nhiều tiện nghi và các điều kiện đặc biệt để giúp hành trình
                  trở nên thật thoải mái.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
        </div>
        <div className="secTitle">
          <h3 data-aos="fade-right" className={`title ${on ? "white" : ""}`}>
            Dịch vụ của chúng tôi
          </h3>
        </div>
        <div className="secContent grid">
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/free-photo/air-ticket-flight-booking-concept_53876-132659.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Đặt Vé Trực Tuyến</h4>
              <span className="continent flex">
                <i class="bx bx-phone-call"></i>
                <span className="name">B53-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Chào mừng đến với trang web bán vé máy bay của chúng tôi.
                  Chúng tôi cung cấp các dịch vụ vé máy bay với giá rẻ, đảm bảo
                  sự thuận tiện và an toàn cho chuyến đi của bạn.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/premium-photo/woman-wearing-microphone-headset-working-call-center-office_8087-3585.jpg?size=626&ext=jpg&ga=GA1.2.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Chăm sóc khách hàng</h4>
              <span className="continent flex">
                <i class="bx bx-phone-call"></i>
                <span className="name">B53-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Đội ngũ chăm sóc khách hàng của chúng tôi sẽ luôn sẵn sàng
                  giải đáp mọi thắc mắc và hỗ trợ khách hàng trong quá trình sử
                  dụng dịch vụ của chúng tôi.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/premium-photo/hands-mature-passenger-young-bus-conductor-with-tickets_274679-29240.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Đổi vé và hoàn tiền</h4>
              <span className="continent flex">
                <i class="bx bx-phone-call"></i>
                <span className="name">B53-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Chúng tôi cung cấp dịch vụ đổi vé và hoàn tiền linh hoạt để
                  đảm bảo khách hàng sẽ không gặp phải rủi ro khi thay đổi kế
                  hoạch của mình.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
        </div>
        <div className="secTitle">
          <h3 data-aos="fade-right" className={`title ${on ? "white" : ""}`}>
            Các chuyến bay phổ biến
          </h3>
        </div>
        <div className="secContent grid">
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/free-photo/medium-shot-smiley-women-airport_23-2149142236.jpg?w=996&t=st=1682599049~exp=1682599649~hmac=067a0519edfc0e7993eec722b7c4366287421a4b62dde06850b16d440a18529c"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Hà Nội - Hồ Chí Minh</h4>
              <span className="continent flex">
                <i class="fa-solid fa-plane"></i>
                <span className="name">B53-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Chuyến bay từ Hà Nội đến Hồ Chí Minh với giá vé hấp dẫn và
                  thời gian bay thuận tiện. Đặt vé ngay để trải nghiệm.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/free-photo/beautiful-girl-standing-airport_1157-22077.jpg?size=626&ext=jpg&ga=GA1.2.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Hà Nội - Đà Nẵng</h4>
              <span className="continent flex">
                <i class="fa-solid fa-plane"></i>
                <span className="name">B52-Y1576</span>
              </span>
              <div className="desc">
                <p>
                  Chuyến bay từ Hà Nội đến Đà Nẵng với giá vé hấp dẫn và thời
                  gian bay thuận tiện. Đặt vé ngay để trải nghiệm.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
          <div data-aos="fade-up" className="single">
            <div className="imageDiv">
              <img
                className="img"
                src="https://img.freepik.com/free-photo/beautiful-asian-woman-smiling-with-map-bag-bus-station_1150-12849.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Hồ Chí Minh - Đà Nẵng</h4>
              <span className="continent flex">
                <i class="fa-solid fa-plane"></i>
                <span className="name">B51-X1976</span>
              </span>
              <div className="desc">
                <p>
                  Chuyến bay từ Hồ Chí Minh đến Đà Nẵng với giá vé hấp dẫn và
                  thời gian bay thuận tiện. Đặt vé ngay để trải nghiệm.
                </p>
              </div>
              <button className="btn flex">Đặt vé ngay</button>
            </div>
          </div>
        </div>
      </section>
      <section data-aos="fade-up" className="bottom">
        <h3 data-aos="fade-right" className={`${on ? "white" : ""}`}>
          CÂU HỎI THƯỜNG GẶP
        </h3>
        <div className="question">
          <div className="textbox">
            <i class="bx bxs-plane-alt"></i>
            <h3>Đặt Vé Trực Tuyến</h3>
          </div>
          <div className="textbox">
            <i class="bx bx-handicap"></i>
            <h3>Chỗ Ngồi</h3>
          </div>
          <div className="textbox">
            <i class="bx bxs-backpack"></i>
            <h3>Hành Lý</h3>
          </div>
          <div className="textbox">
            <i class="bx bxs-map"></i>
            <h3>Check-In</h3>
          </div>
          <div className="textbox">
            <i class="bx bxs-plane-take-off"></i>
            <h3>Nối Chuyến</h3>
          </div>
          <div className="textbox">
            <i class="bx bxs-bowl-hot"></i>
            <h3>Xuất Ăn</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
