import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Css from "../../Controller.css";
import ThongTinKhachHangDatyVe from "../DatVeMayBay/ThongTinKhachHangDatVe";

export default function Body() {
  const [loaiChuyenBay, setLoaiChuyenBay] = useState("Một Chiều");
  const [infoNguoiLon, setInfoNguoiLon] = useState([]);
  const [infoTreEm, setInfoTreEm] = useState([]);
  const [infoEmBe, setInfoEmBe] = useState([]);

  // Chọn chuyến bay 1chiều/khứ hồi
  useEffect(() => {
    const ngayVe = document.getElementById("NgayVe");
    const ngayVeLabel = document.getElementById("NgayVe-Label");
    if (loaiChuyenBay === "Một Chiều") {
      ngayVe.hidden = true;
      ngayVeLabel.hidden = true;
      ngayVe.value = "";
    } else {
      ngayVe.hidden = false;
      ngayVeLabel.hidden = false;
    }
  }, [loaiChuyenBay]);

  // Chọn số người lớn
  const chonSoNguoiLon = (event) => {
    const nguoiLon = [];
    for (let i = 0; i < event.target.value; i++) {
      nguoiLon.push({ name: "", birthDay: "", gender: "", idCard: "" });
    }
    setInfoNguoiLon(nguoiLon);
  };

  // Chọn số trẻ em
  const chonSoTreEm = (event) => {
    const treEm = [];
    for (let i = 0; i < event.target.value; i++) {
      treEm.push({ name: "", birthDay: "", gender: "" });
    }
    setInfoTreEm(treEm);
  };

  // Chọn số em bé
  const chonSoEmBe = (event) => {
    const emBe = [];
    for (let i = 0; i < event.target.value; i++) {
      emBe.push({ name: "", birthDay: "", gender: "" });
    }
    setInfoEmBe(emBe);
  };

  return (
    <div>
      <section>
        <div className="silde">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://img.freepik.com/free-vector/plane-fly-blue-sky-with-clouds_107791-9038.jpg?w=1800&t=st=1683706881~exp=1683707481~hmac=33cec136051ede8337920303066e6a4cd6bddbdd1a56146679890d5aa2710fa3"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.freepik.com/free-photo/speed-drive-urban-architecture-city_1112-1198.jpg?w=1800&t=st=1683707033~exp=1683707633~hmac=fd506110772c180c51fd95e2b2a64e52fe50b7236238189174e7683ae60b1a32"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://img.freepik.com/free-photo/airplane-sunset_1150-8338.jpg?w=1800&t=st=1683707689~exp=1683708289~hmac=c4c33e32ea6d393db716d36df0f9c3683d621fc41702deb32f0b83eea7116811"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
          <div className="search">
            <form className="row justify-content-center">
              <div className="form-group col-md-2">
                <label htmlFor="loaiChuyenBay">Loại chuyến bay</label>
                <select
                  id="loaiChuyenBay"
                  className="form-control"
                  name="loaiChuyenBay"
                  value={loaiChuyenBay}
                  onChange={(event) => setLoaiChuyenBay(event.target.value)}
                >
                  <option value="Một Chiều">Một Chiều</option>
                  <option value="Khứ Hồi">Khứ Hồi</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="fromCity">Điểm đi</label>
                <select
                  id="fromCity"
                  type="text"
                  className="form-control"
                  name="fromCity"
                >
                  <option>Sân Bay Nội Bài</option>
                  <option>Sân Bay Đà Nẵng</option>
                  <option>Sân Bay Tân Sơn Nhất</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="toCity">Điểm đến</label>
                <select
                  id="toCity"
                  type="text"
                  className="form-control"
                  name="toCity"
                >
                  <option>Sân Bay Nội Bài</option>
                  <option>Sân Bay Đà Nẵng</option>
                  <option>Sân Bay Tân Sơn Nhất</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="ngayDi">Ngày đi</label>
                <input
                  id="NgayDi"
                  type="date"
                  className="form-control"
                  name="NgayDi"
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="NgayVe" id="NgayVe-Label">
                  Ngày về
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="NgayVe"
                  id="NgayVe"
                />
              </div>
              <div
                className="form-group col-md-2"
                style={{ marginTop: "25px" }}
              >
                <h3>Tìm Nhanh</h3>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="adults">Người lớn (trên 12 tuổi)</label>
                <input
                  id="adults"
                  type="number"
                  name="adults"
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="children">Trẻ em (dưới 12 tuổi)</label>{" "}
                <input
                  id="children"
                  type="number"
                  className="form-control"
                  name="children"
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="baby">Em bé (dưới 24 tháng)</label>{" "}
                <input
                  id="baby"
                  type="number"
                  className="form-control"
                  name="baby"
                />
              </div>
              <div className="form-group col-md-2 text-center">
                <div className="text-white">
                  <Link as={Link} to="TimKiemChuyenBay" className="text-white">
                    <button type="submit" className="btn btn-success">
                      Tìm Chuyến Bay
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <main className="container my-5">
        <hr />
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">
              Bán vé máy bay với giá rẻ hàng đầu Việt Nam
            </h2>
            <p className="lead mb-4">
              Chào mừng đến với trang web bán vé máy bay của chúng tôi. Chúng
              tôi cung cấp các dịch vụ vé máy bay với giá rẻ, đảm bảo sự thuận
              tiện và an toàn cho chuyến đi của bạn.
            </p>
            <a href="datve.html" className="btn btn-success btn-lg mb-5">
              Đặt vé ngay
            </a>
          </div>
          <div className="col-md-4">
            <img
              src="https://img.freepik.com/free-photo/place-flying-sunset-sky_1112-1132.jpg?w=996&t=st=1682598588~exp=1682599188~hmac=689eb5e0df4a7b6fdf1d688c2906fe850d5913caf023bfd5ead33dcf8631274f"
              alt="Giá rẻ"
              className="img-fluid"
            />
          </div>
        </div>
        <hr />
        <h2 className="text-center mb-5">Dịch vụ của chúng tôi</h2>
        <div className="row">
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/free-photo/air-ticket-flight-booking-concept_53876-132659.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Dịch vụ 1"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Đặt vé trực tuyến</h5>
                <p className="card-text">
                  Chúng tôi cung cấp các dịch vụ đặt vé trực tuyến nhanh chóng
                  và thuận tiện. Khách hàng có thể lựa chọn giá vé và chuyến bay
                  phù hợp với nhu cầu của mình.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/premium-photo/woman-wearing-microphone-headset-working-call-center-office_8087-3585.jpg?size=626&ext=jpg&ga=GA1.2.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Dịch vụ 2"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Chăm sóc khách hàng</h5>
                <p className="card-text">
                  Đội ngũ chăm sóc khách hàng của chúng tôi sẽ luôn sẵn sàng
                  giải đáp mọi thắc mắc và hỗ trợ khách hàng trong quá trình sử
                  dụng dịch vụ của chúng tôi.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/premium-photo/hands-mature-passenger-young-bus-conductor-with-tickets_274679-29240.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Dịch vụ 3"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Đổi vé và hoàn tiền</h5>
                <p className="card-text">
                  Chúng tôi cung cấp dịch vụ đổi vé và hoàn tiền linh hoạt để
                  đảm bảo khách hàng sẽ không gặp phải rủi ro khi thay đổi kế
                  hoạch của mình.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h2 className="text-center mb-5">Các chuyến bay phổ biến</h2>
        <div className="row">
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/free-photo/medium-shot-smiley-women-airport_23-2149142236.jpg?w=996&t=st=1682599049~exp=1682599649~hmac=067a0519edfc0e7993eec722b7c4366287421a4b62dde06850b16d440a18529c"
                alt="Chuyến bay 1"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Hà Nội - Hồ Chí Minh</h5>
                <p className="card-text">
                  Chuyến bay từ Hà Nội đến Hồ Chí Minh với giá vé hấp dẫn và
                  thời gian bay thuận tiện. Đặt vé ngay để trải nghiệm.{" "}
                </p>
                <a href="#" className="btn btn-success">
                  Đặt vé ngay
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                src="https://img.freepik.com/free-photo/beautiful-girl-standing-airport_1157-22077.jpg?size=626&ext=jpg&ga=GA1.2.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Chuyến bay 2"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Hà Nội - Đà Nẵng</h5>
                <p className="card-text">
                  {" "}
                  Chuyến bay từ Hà Nội đến Đà Nẵng với giá vé hấp dẫn và thời
                  gian bay thuận tiện. Đặt vé ngay để trải nghiệm.{" "}
                </p>{" "}
                <a href="#" className="btn btn-success">
                  {" "}
                  Đặt vé ngay{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              {" "}
              <img
                src="https://img.freepik.com/free-photo/beautiful-asian-woman-smiling-with-map-bag-bus-station_1150-12849.jpg?size=626&ext=jpg&ga=GA1.1.1656001097.1679482179&semt=robertav1_2_sidr"
                alt="Chuyến bay 3"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Hồ Chí Minh - Đà Nẵng</h5>
                <p className="card-text">
                  {" "}
                  Chuyến bay từ Hồ Chí Minh đến Đà Nẵng với giá vé hấp dẫn và
                  thời gian bay thuận tiện. Đặt vé ngay để trải nghiệm.{" "}
                </p>{" "}
                <a href="#" className="btn btn-success">
                  {" "}
                  Đặt vé ngay{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
