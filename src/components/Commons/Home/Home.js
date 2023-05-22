import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import video from "../../../Assets/video.mp4";
import "./Home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import * as Yup from "yup";

const checkFormSearch = Yup.object().shape({
  diemDi: Yup.string().required("Vui lòng chọn điểm đi"),
  diemDen: Yup.string().required("Vui lòng chọn điểm đến"),
  ngayDi: Yup.date().required("Vui lòng chọn ngày đi"),
});

export default function Home() {
  const [loaiChuyenBay, setLoaiChuyenBay] = useState("Một Chiều");
  const [soNguoiLon, setSoNguoiLon] = useState(1);
  const [soTreEm, setSoTreEm] = useState(0);
  const [soEmBe, setSoEmBe] = useState(0);
  const [sanBays, setSanBays] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  // Lấy danh sách sân bay
  useEffect(() => {
    axios
      .get("http://localhost:8080/chuyen-bay/listSelectOption")
      .then((response) => {
        const { sanBays } = response.data;
        setSanBays(sanBays);
      })
      .catch((err) => console.error);
  }, []);

  // Chọn chuyến bay 1chiều/khứ hồi
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

  const handleChangeInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Chọn số người lớn
  const chonSoNguoiLon = (event) => {
    setSoNguoiLon(event.target.value);
  };

  // Chọn số trẻ em
  const chonSoTreEm = (event) => {
    setSoTreEm(event.target.value);
  };

  // Chọn số em bé
  const chonSoEmBe = (event) => {
    setSoEmBe(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
  };

  const handleSubmits = (event) => {
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
    <div>
      <section className="home">
        <div className="overlay"></div>
        <video
          className="video"
          src={video}
          muted
          autoPlay
          loop
          type="video/mp4"
        ></video>
        <div className="homeContent">
          <div className="textDiv">
            <h1 data-aos="fade-up" className="homeTitle font-weight-bold">
              Tìm Kiếm Chuyến Bay
            </h1>
          </div>

          <form onSubmit={handleSubmits}>
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
                  Điểm Đi
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
                {errors.diemDi && (
                  <strong style={{ color: "red" }}>{errors.diemDi}</strong>
                )}
              </div>
              <div className="destinationInput">
                <label className="label" htmlFor="city">
                  Điểm Đến
                </label>
                <select
                  name="diemDen"
                  id="diemDen"
                  value={formData.diemDen}
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
                {errors.diemDen && <strong>{errors.diemDen}</strong>}
              </div>
              <div className="dateInput">
                <label className="label" htmlFor="city">
                  Ngày Đi
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
                {errors.ngayDi && <strong>{errors.ngayDi}</strong>}
              </div>
              <div className="dateInput">
                <label id="label-NgayVe" className="label" htmlFor="city">
                  Ngày Về
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
                  {errors.ngayDiKh && <strong>{errors.ngayDiKh}</strong>}
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
          <h3 data-aos="fade-right" className="title">
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
              <h4 className="destTitle">Bora Bora</h4>
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
                src="https://img.freepik.com/premium-photo/airplane-taking-off-from-airport_37416-74.jpg?w=1800"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Bora Bora</h4>
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
                src="https://img.freepik.com/premium-photo/airplane-taking-off-from-airport_37416-65.jpg?w=2000"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Bora Bora</h4>
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
        </div>
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
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
              <h4 className="destTitle">Bora Bora</h4>
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
              <h4 className="destTitle">Bora Bora</h4>
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
                src="https://img.freepik.com/premium-photo/hands-mature-passenger-young-bus-conductor-with-tickets_274679-29240.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Bora Bora</h4>
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
        </div>
        <div className="secTitle">
          <h3 data-aos="fade-right" className="title">
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
              <h4 className="destTitle">Bora Bora</h4>
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
                src="https://img.freepik.com/free-photo/beautiful-girl-standing-airport_1157-22077.jpg?size=626&ext=jpg&ga=GA1.2.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Bora Bora</h4>
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
                src="https://img.freepik.com/free-photo/beautiful-asian-woman-smiling-with-map-bag-bus-station_1150-12849.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Giá rẻ"
              />
            </div>
            <div className="cardInfo">
              <h4 className="destTitle">Bora Bora</h4>
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
        </div>
      </section>
      <section data-aos="fade-up" className="bottom">
        <h3 data-aos="fade-right">CÂU HỎI THƯỜNG GẶP</h3>
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