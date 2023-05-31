/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import css from "../../styles/ChuyenBayCSS/DSTimKiemCB.css";
import axios from "axios";

//DucNH66 Danh sách khách hàng tìm kiếm thấy
function DanhSachTimKiemChuyenBay() {
  //DucNH66 lấy data
  const [tiketType, setTiketType] = useState();
  const [tiketTypeKhuHoi, setTiketTypeKhuHoi] = useState();
  const [idChuyenBayDi, setIdChuyenBayDi] = useState();
  const [idChuyenBayKhuHoi, setIdChuyenBayKhuHoi] = useState();
  const [chuyenBay, setChuyenBay] = useState();
  const [chuyenBayKhuHoi, setChuyenBayKhuHoi] = useState();
  const [hidden1Chieu, setHidden] = useState(false);
  const [hiddenKhuHoi, setHidden1] = useState(false);
  const [chuyenBays, setChuyenBays] = useState([]);
  const [chuyenBayKhuHois, setChuyenBayKhuHois] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalElement, setTotalElement] = useState(0);
  const [totalElement1, setTotalElement1] = useState(0);
  const [sortBy, setSortBy] = useState("giaVe");
  const [sortDirection, setSortDirection] = useState("ASC");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const soNguoiLon = queryParams.get("soNguoiLon");
  const soTreEm = queryParams.get("soTreEm");
  const soEmBe = queryParams.get("soEmBe");
  const diemDi = queryParams.get("diemDi");
  const diemDen = queryParams.get("diemDen");
  const ngayDi = queryParams.get("ngayDi");
  const ngayDiKh = queryParams.get("ngayDiKh");
  const loaiChuyenBay = queryParams.get("loaiChuyenBay");

  //DucNH66 xử lý ẩn hiện danh sách chuyến bay 1 chiều
  useEffect(() => {
    setHidden(!hiddenKhuHoi);
    setHidden1(!hiddenKhuHoi);
  }, [idChuyenBayDi]);

  //DucNH66 xử lý ẩn hiện danh sách chuyến bay khừ hồi
  useEffect(() => {
    setHidden1(!hiddenKhuHoi);
  }, [idChuyenBayKhuHoi]);

  //DucNH66 thông tin chuyến bay vừa được chọn
  useEffect(() => {
    if (idChuyenBayDi) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + idChuyenBayDi)
        .then((response) => {
          setChuyenBay(response.data);
        });
    }

    if (idChuyenBayKhuHoi) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + idChuyenBayKhuHoi)
        .then((response) => {
          setChuyenBayKhuHoi(response.data);
        });
    }
  }, [idChuyenBayDi, idChuyenBayKhuHoi]);

  //DucNH66 load lại danh sách chuyến bay được tìm kiếm thấy khi có sự thay đổi
  useEffect(() => {
    fetchChuyenBays();
  }, [page, size, sortBy, sortDirection, diemDi, diemDen, ngayDi, ngayDiKh]);

  //DucNH66  lấy danh sách chuyến bay từ db
  const fetchChuyenBays = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/chuyen-bay/listPageUser",
        {
          params: {
            page,
            size,
            sortBy,
            sortDirection,
            diemDi,
            diemDen,
            ngayDi,
            ngayDiKh,
          },
        }
      );
      setChuyenBays(response.data.chuyenBay1Chieu.content);
      setChuyenBayKhuHois(response.data.chuyenBayKhuHoi.content);
      setTotalElement(response.data.chuyenBay1Chieu.totalElements);
      setTotalElement1(response.data.chuyenBayKhuHoi.totalElements);
    } catch (error) {
      console.log(error);
    }
  };

  //DucNH66 chọn kiểu sắp xếp tăng/giảm
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  //DucNH66 chọn field để sắp xếp
  const handleSortFieldChange = (event) => {
    setSortDirection(event.target.value);
  };

  //DucNH66 Lấy id và hạng ghế chuyến bay 1 chiều
  const handleGetData = (chuyenBay, value) => {
    setTiketType(value);
    setIdChuyenBayDi(chuyenBay.maChuyenBay);
  };

  //DucNH66 Lấy id và hạng ghế chuyến bay khứ hồi
  const handleGetDataKhuHoi = (chuyenBayKhuHoi, value) => {
    setTiketTypeKhuHoi(value);
    setIdChuyenBayKhuHoi(chuyenBayKhuHoi.maChuyenBay);
  };

  //DucNH66 gởi dữ liệu đến trang thêm hành khách
  const handleNext = (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams();
    queryParams.set("soNguoiLon", soNguoiLon);
    queryParams.set("soTreEm", soTreEm);
    queryParams.set("soEmBe", soEmBe);
    queryParams.set("chuyenBay", JSON.stringify(chuyenBay));
    queryParams.set("chuyenBayKhuHoi", JSON.stringify(chuyenBayKhuHoi));
    queryParams.set("tiketType", tiketType);
    queryParams.set("tiketTypeKhuHoi", tiketTypeKhuHoi);
    const queryString = queryParams.toString();
    navigate(`/ThongTinKhachHangDatVe?${queryString}`);
  };

  //DucNH66 RELOAD lại trang để chọn lại chuyến bay
  const goBack = () => {
    window.location.reload();
  };

  //DucNH66 Về lại trang home
  const handleBackHome = () => {
    navigate("/");
  };

  const convertBoardingTime = (fullBoaringTime) => {
    const boardingTime = fullBoaringTime.substr(0, 5);
    return boardingTime;
  };

  return (
    <div className="container duc mb-5 ">
      {/* Danh sách chuyến bay tìm kiếm được */}
      <div className="row my-4 ">
        {/* Div trang trí */}
        <div className="col-md-2 shadow order-sidebar ">
          <img src="https://www.onlygfx.com/wp-content/uploads/2021/07/paper-plane-1.png" />
        </div>

        {/* Div tổng của danh sách chuyến bay đi và về */}
        <div className="col-md-10 pd-5">
          {/* Chọn mục để sắp xếp */}
          <nav
            class="navbar navbar-expand-lg navbar-dark mb-3 pd-5 "
            style={{
              background:
                "linear-gradient( to right,hsl(187, 85%, 43%),hsl(199, 100%, 33%)",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            <div className="row collapse navbar-collapse">
              <div className="col-6">
                <ul className="navbar-nav">
                  <a className="navbar-brand" href="#">
                    Lọc
                  </a>
                  <li className="nav-item dropdown">
                    <div className="input-group">
                      <select
                        className="custom-select form-control"
                        id="sortBySelect"
                        value={sortBy}
                        onChange={handleSortChange}
                      >
                        <optgroup label="Lựa chọn">
                          <option value="giaVe">Giá vé</option>
                          <option value="gioKhoiHanh">Giờ khởi hành</option>
                        </optgroup>
                      </select>
                      <select
                        className="custom-select form-control"
                        value={sortDirection}
                        onChange={handleSortFieldChange}
                      >
                        <option value="ASC">Tăng dần</option>
                        <option value="DESC">Giảm dần</option>
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Phổ Thông*/}
              <div className="col-md-3 ml-1">
                <div
                  className="card"
                  style={{
                    backgroundColor: "#f4f9f5",
                    borderRadius: "10px",
                  }}
                >
                  <div className="card-body  " style={{ padding: "0.5rem" }}>
                    <p
                      className="card-text "
                      style={{
                        textAlign: "center",
                        marginBottom: "0rem",
                        fontSize: "1.25rem",
                        color: "#222",
                      }}
                    >
                      Hạng Phổ Thông
                    </p>
                  </div>
                </div>
              </div>

              {/* Thương Gia */}
              <div className="col-md-3 ">
                <div
                  className="card"
                  style={{
                    backgroundColor: "#fbf9e4",
                    borderRadius: "10px",
                  }}
                >
                  <div className="card-body    " style={{ padding: "0.5rem" }}>
                    <p
                      className="card-text "
                      style={{
                        textAlign: "center",
                        marginBottom: "0rem",
                        fontSize: "1.25rem",
                        color: "#222",
                      }}
                    >
                      Hạng Thương Gia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/*Tiêu đề Danh sách chuyến bay đi */}
          {hidden1Chieu && chuyenBays.length > 0 && (
            <h2 style={{ color: "#005f6e" }}>
              Danh sách chuyến bay đi{" "}
              <span class="navbar-brand" style={{ color: "orange" }}>
                {totalElement} kết quả
              </span>{" "}
            </h2>
          )}
          {loaiChuyenBay === "Một Chiều" && chuyenBays.length === 0 && (
            <h1> Không tìm thấy </h1>
          )}
          {/* Danh sách chuyến bay đi */}
          {hidden1Chieu &&
            chuyenBays.length > 0 &&
            chuyenBays.map((chuyenBay) => (
              <div data-aos="fade-up" className="card my-2 hover-ds">
                <div className="card-body card-bo">
                  <div className="row ">
                    {/* Thông tin chuyến bay */}
                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>
                          Điểm đi :{chuyenBay.diemDi}
                        </strong>
                      </p>

                      <parent
                        style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}
                      >
                        <strong>
                          Giờ cất cánh :{" "}
                          {convertBoardingTime(chuyenBay.gioKhoiHanh)}
                        </strong>
                      </parent>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>
                          Hãng bay : {chuyenBay.hangBay.tenHangBay}
                        </strong>{" "}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>
                          Điểm đến : {chuyenBay.diemDen}
                        </strong>
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>
                          Giờ hạ cánh :{" "}
                          {convertBoardingTime(chuyenBay.gioHaCanh)}{" "}
                        </strong>
                      </p>
                      <p style={{ fontSize: "0.8rem" }}>
                        <strong>
                          Thời gian bay : {chuyenBay.thoiGianBay}{" "}
                        </strong>{" "}
                      </p>
                    </div>

                    {/* Phổ Thông */}
                    <div className="col-md-3 ">
                      <a onClick={() => handleGetData(chuyenBay, "Phổ Thông")}>
                        <div
                          className="card my-1"
                          style={{
                            backgroundColor: "#f4f9f5",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            className="card-body dat-ve "
                            style={{ padding: "0.5rem" }}
                          >
                            <p
                              className="card-text "
                              style={{
                                textAlign: "center",
                                marginBottom: "0rem",
                                fontSize: "1.25rem",
                                color: "#005f6e",
                              }}
                            >
                              {`${(chuyenBay.giaVe * 1).toLocaleString(
                                "vi-VN"
                              )} `}
                              <sup>VND</sup>
                            </p>
                            <p
                              className="card-text"
                              style={{ fontSize: "0.8rem", color: "orange" }}
                            >
                              Còn {chuyenBay.mayBay.slghePhoThong} ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    {/* Thương Gia */}
                    <div className="col-md-3 ">
                      <a onClick={() => handleGetData(chuyenBay, "Thương Gia")}>
                        <div
                          className="card my-1"
                          style={{
                            backgroundColor: "#fbf9e4",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            className="card-body dat-ve "
                            style={{ padding: "0.5rem" }}
                          >
                            <p
                              className="card-text "
                              style={{
                                textAlign: "center",
                                marginBottom: "0rem",
                                fontSize: "1.25rem",
                                color: "#222",
                              }}
                            >
                              {`${(chuyenBay.giaVe * 1.5).toLocaleString(
                                "vi-VN"
                              )} `}
                              <sup>VND</sup>
                            </p>

                            <p
                              className="card-text"
                              style={{ fontSize: "0.8rem" }}
                            >
                              Còn {chuyenBay.mayBay.slgheThuongGia} ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Hiển thị thêm dữ liệu của danh sách chuyến bay đi */}
          {hidden1Chieu &&
            chuyenBays.length > 0 &&
            (totalElement - size > 0 ? (
              <button
                className="btn btn-primary bg"
                onClick={() => setSize(totalElement)}
              >
                Xem thêm {totalElement - size} chuyến bay khác
              </button>
            ) : (
              <button
                hidden={chuyenBays.length <= 3}
                className="btn btn-primary  bg"
                onClick={() => setSize(3)}
              >
                Thu gọn
              </button>
            ))}

          {/* Tiêu đề danh sách chuyến bay về */}
          {!hiddenKhuHoi && chuyenBayKhuHois.length > 0 && (
            <h2 style={{ color: "#005f6e" }}>
              Danh sách chuyến bay về{" "}
              <span class="navbar-brand" style={{ color: "orange" }}>
                {totalElement1} kết quả
              </span>{" "}
            </h2>
          )}

          {/* Danh sách chuyến bay về */}
          {!hiddenKhuHoi &&
            chuyenBayKhuHois.length > 0 &&
            chuyenBayKhuHois.map((chuyenBayKhuHoi) => (
              <div data-aos="fade-up" className="card my-2 hover-ds">
                <div className="card-body card-bo">
                  {/* Thông tin chuyến bay */}
                  <div className="row ">
                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>
                          Điểm đi : {chuyenBayKhuHoi.diemDi}
                        </strong>
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>
                          Giờ cất cánh :{" "}
                          {convertBoardingTime(chuyenBayKhuHoi.gioKhoiHanh)}{" "}
                        </strong>{" "}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>
                          Hãng bay : {chuyenBayKhuHoi.hangBay.tenHangBay}
                        </strong>{" "}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>
                          Điểm đến : {chuyenBayKhuHoi.diemDen}
                        </strong>
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>
                          Giờ hạ cánh :{" "}
                          {convertBoardingTime(chuyenBayKhuHoi.gioHaCanh)}
                        </strong>{" "}
                      </p>
                      <p style={{ fontSize: "0.8rem" }}>
                        <strong>
                          Thời gian bay : {chuyenBayKhuHoi.thoiGianBay}
                        </strong>{" "}
                      </p>
                    </div>
                    {/* Phổ Thông */}
                    <div className="col-md-3 ">
                      <a
                        onClick={() =>
                          handleGetDataKhuHoi(chuyenBayKhuHoi, "Phổ Thông")
                        }
                      >
                        <div
                          className="card my-1"
                          style={{
                            backgroundColor: "#f4f9f5",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            className="card-body dat-ve "
                            style={{ padding: "0.5rem" }}
                          >
                            <p
                              className="card-text "
                              style={{
                                textAlign: "center",
                                marginBottom: "0rem",
                                fontSize: "1.25rem",
                                color: "#005f6e",
                              }}
                            >
                              {`${(chuyenBayKhuHoi.giaVe * 1).toLocaleString(
                                "vi-VN"
                              )} `}{" "}
                              <sup>VND</sup>
                            </p>
                            <p
                              className="card-text"
                              style={{ fontSize: "0.8rem", color: "orange" }}
                            >
                              Còn {chuyenBayKhuHoi.mayBay.slghePhoThong} ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    {/* Thương Gia */}
                    <div className="col-md-3 ">
                      <a
                        onClick={() =>
                          handleGetDataKhuHoi(chuyenBayKhuHoi, "Thương Gia")
                        }
                      >
                        <div
                          className="card my-1"
                          style={{
                            backgroundColor: "#fbf9e4",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            className="card-body dat-ve "
                            style={{ padding: "0.5rem" }}
                          >
                            <p
                              className="card-text "
                              style={{
                                textAlign: "center",
                                marginBottom: "0rem",
                                fontSize: "1.25rem",
                                color: "#222",
                              }}
                            >
                              {`${(chuyenBayKhuHoi.giaVe * 1.5).toLocaleString(
                                "vi-VN"
                              )} `}
                              <sup>VND</sup>
                            </p>

                            <p
                              className="card-text"
                              style={{ fontSize: "0.8rem" }}
                            >
                              Còn {chuyenBayKhuHoi.mayBay.slgheThuongGia} ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Hiển thị thêm danh sách bay về */}
          {!hiddenKhuHoi &&
            chuyenBayKhuHois.length > 0 &&
            (totalElement1 - size > 0 ? (
              <button
                className="btn btn-primary bg"
                onClick={() => setSize(totalElement1)}
              >
                Xem thêm {totalElement1 - size} chuyến bay khác
              </button>
            ) : (
              <button
                hidden={chuyenBayKhuHois.length <= 3}
                className="btn btn-primary bg"
                onClick={() => setSize(3)}
              >
                Thu gọn
              </button>
            ))}

          {/* Chuyến bay đi đã được chọn */}
          {chuyenBay != null && (
            <div className="m-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body box-shadow-tt-ve">
                      <div className="row">
                        <strong className="d-flex justify-content-between">
                          Chuyến bay đi • {chuyenBay.ngayKhoiHanh}
                          <img
                            style={{ height: "25px", width: "auto" }}
                            src={chuyenBay.hangBay.logoURL}
                          />
                        </strong>{" "}
                        <div style={{ height: "10px" }}></div>
                        <div className="col-md-4">
                          <p>
                            <strong>Điểm đi : {chuyenBay.diemDi}</strong>
                          </p>{" "}
                          <p>
                            <strong>
                              Giờ cất cạnh :{" "}
                              {convertBoardingTime(chuyenBay.gioKhoiHanh)}{" "}
                            </strong>{" "}
                          </p>
                          <p>
                            <strong>
                              Thời gian bay : {chuyenBay.thoiGianBay}
                            </strong>{" "}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Điểm đến : {chuyenBay.diemDen} </strong>
                          </p>{" "}
                          <p>
                            <strong>
                              Giờ hạ cánh :{" "}
                              {convertBoardingTime(chuyenBay.gioHaCanh)}{" "}
                            </strong>
                          </p>
                          <p>
                            <strong>
                              Khối lượng hành lý : {chuyenBay.klhanhLy}{" "}
                            </strong>{" "}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong> Hạng vé : {tiketType} </strong>
                          </p>
                          <p>
                            <strong>
                              Giá vé :{" "}
                              {tiketType === "Phổ Thông"
                                ? `${(chuyenBay.giaVe * 1).toLocaleString(
                                    "vi-VN"
                                  )} `
                                : `${(chuyenBay.giaVe * 1.5).toLocaleString(
                                    "vi-VN"
                                  )} `}{" "}
                              <sup>VND</sup>
                            </strong>
                          </p>
                          <p>
                            <strong>
                              Hãng bay : {chuyenBay.hangBay.tenHangBay}
                            </strong>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* chuyến bay về đã được chọn */}
          {chuyenBayKhuHoi != null && (
            <div className="m-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body box-shadow-tt-ve">
                      <div className="row">
                        <strong className="d-flex justify-content-between">
                          Chuyến bay đi • {chuyenBayKhuHoi.ngayKhoiHanh}
                          <img
                            style={{ height: "25px", width: "auto" }}
                            src={chuyenBayKhuHoi.hangBay.logoURL}
                          />
                        </strong>{" "}
                        <div style={{ height: "10px" }}></div>
                        <div className="col-md-4">
                          <p>
                            <strong>
                              Sân bay đi : {chuyenBayKhuHoi.diemDi}
                            </strong>{" "}
                          </p>
                          <p>
                            <strong>
                              Giờ cất cánh :{" "}
                              {convertBoardingTime(chuyenBayKhuHoi.gioKhoiHanh)}
                            </strong>{" "}
                          </p>
                          <p>
                            <strong>
                              Thời gian bay : {chuyenBayKhuHoi.thoiGianBay}
                            </strong>{" "}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>
                              Sân bay đến : {chuyenBayKhuHoi.diemDen}
                            </strong>{" "}
                          </p>
                          <p>
                            <strong>
                              Giờ hạ cánh :{" "}
                              {convertBoardingTime(chuyenBayKhuHoi.gioHaCanh)}
                            </strong>{" "}
                          </p>
                          <p>
                            <strong>
                              Khối lượng hành lý : {chuyenBayKhuHoi.klhanhLy}
                            </strong>{" "}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <strong>Hạng vé : {tiketTypeKhuHoi} </strong>
                          </p>
                          <p>
                            <strong>
                              Gía vé :{" "}
                              {tiketTypeKhuHoi === "Phổ Thông"
                                ? `${(chuyenBayKhuHoi.giaVe * 1).toLocaleString(
                                    "vi-VN"
                                  )} `
                                : `${(
                                    chuyenBayKhuHoi.giaVe * 1.5
                                  ).toLocaleString("vi-VN")} `}
                              <sup>VND</sup>
                            </strong>
                          </p>
                          <p>
                            <strong>
                              Hãng bay : {chuyenBayKhuHoi.hangBay.tenHangBay}{" "}
                            </strong>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ẨN HIỆN NÚT CHỌN LẠI  */}
          {loaiChuyenBay === "Một Chiều" && chuyenBay && (
            <a className="btn btn-primary bg" onClick={goBack}>
              Chọn lại
            </a>
          )}

          {loaiChuyenBay === "Khứ Hồi" && chuyenBay && chuyenBayKhuHoi && (
            <a className="btn btn-primary bg" onClick={goBack}>
              Chọn lại
            </a>
          )}

          {/* Back Home */}

          {hiddenKhuHoi &&
            loaiChuyenBay === "Khứ Hồi" &&
            chuyenBays.length === 0 &&
            chuyenBayKhuHois.length > 0 && (
              <h1>
                Chỉ tìm thấy chuyến bay khứ hồi phù hợp{" "}
                <a
                  onClick={() => {
                    setHidden1(!setHidden1);
                  }}
                  style={{ color: "Red" }}
                >
                  Click{" "}
                </a>
                để xem chi tiết
              </h1>
            )}
          {loaiChuyenBay === "Khứ Hồi" &&
            chuyenBays.length === 0 &&
            chuyenBayKhuHois.length === 0 && <h1> Không tìm thấy </h1>}

          <button className="btn btn-success bg" onClick={handleBackHome}>
            Tìm chuyến bay khác
          </button>
          {loaiChuyenBay === "Khứ Hồi" &&
            chuyenBays.length > 0 &&
            chuyenBayKhuHois.length === 0 && (
              <h1>Chỉ tìm thấy chuyến bay đi phù hợp</h1>
            )}
          {/* ẨN HIỆN NÚT TIẾP TỤC  */}
          {loaiChuyenBay === "Một Chiều" && chuyenBay && (
            <button className="btn btn-primary bg" onClick={handleNext}>
              Tiếp tục{" "}
            </button>
          )}

          {loaiChuyenBay === "Khứ Hồi" && chuyenBay && chuyenBayKhuHoi && (
            <button className="btn btn-primary bg" onClick={handleNext}>
              Tiếp tục{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default DanhSachTimKiemChuyenBay;
