import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DSTimKiemCBCSS from "../../styles/ChuyenBayCSS/DSTimKiemCB.css";
import Pagination from "./Pagination";
import axios from "axios";

function DanhSachTimKiemChuyenBay() {
  const [chuyenBays, setChuyenBays] = useState([]);
  const [chuyenBayKhuHois, setChuyenBayKhuHois] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalElement, setTotalElement] = useState(0);
  const [totalElement1, setTotalElement1] = useState(0);
  const [totalPages, setTotalPages] = useState();
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

  useEffect(() => {
    fetchChuyenBays();
  }, [page, size, sortBy, sortDirection, diemDi, diemDen, ngayDi, ngayDiKh]);

  const fetchChuyenBays = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/chuyen-bay/listPageHaiChieu",
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
      setTotalPages(response.data.totalPages);
      const chuyenBay1Chieu = response.data.chuyenBay1Chieu;
      const chuyenBayKhuHoi = response.data.chuyenBayKhuHoi;
      setTotalElement(response.data.chuyenBay1Chieu.totalElements);
      setTotalElement1(response.data.chuyenBayKhuHoi.totalElements);

      setChuyenBays(chuyenBay1Chieu.content);
      setChuyenBayKhuHois(chuyenBayKhuHoi.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortFieldChange = (event) => {
    setSortDirection(event.target.value);
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    navigate(
      "/ThongTinKhachHangDatVe?soNguoiLon=" +
        soNguoiLon +
        "&soTreEm=" +
        soTreEm +
        "&soEmBe=" +
        soEmBe
    );
  };

  return (
    <div className="container my-4 xxx  ">
      {/* Chọn mục để sắp xếp */}
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style={{
          background:
            "linear-gradient( to right,hsl(187, 85%, 43%),hsl(199, 100%, 33%)",
        }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Lọc
          </a>
          <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="sortBySelect">
                      Sắp xếp theo
                    </label>
                  </div>
                  <select
                    class="custom-select"
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
                    class="custom-select"
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
        </div>
      </nav>

      {/* Danh sách chuyến bay tìm kiếm được */}
      <div className="row my-4 ">
        <div
          className="col-md-2 shadow "
          style={{
            background:
              "linear-gradient( to right,hsl(187, 85%, 43%),hsl(199, 100%, 33%)",
          }}
        ></div>
        {/* Danh sách chuyến bay đi */}
        <div className="col-md-10 pd-5">
          <h2 style={{ color: "#005f6e" }}>
            Danh sách chuyến bay đi{" "}
            <span class="navbar-brand" style={{ color: "orange" }}>
              {totalElement} kết quả
            </span>{" "}
          </h2>
          {chuyenBays.length === 0 && <h1> Không tìm thấy </h1>}
          {chuyenBays.length > 0 &&
            chuyenBays.map((chuyenBay) => (
              <div className="card my-2 hover-ds">
                <div className="card-body card-bo">
                  <div className="row ">
                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>Nơi đi:</strong>
                        {chuyenBay.diemDi}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Giờ cất cánh :</strong> {chuyenBay.gioKhoiHanh}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Hãng bay:</strong>{" "}
                        {chuyenBay.hangBay.tenHangBay}
                      </p>
                    </div>

                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>
                          Sân bay đến:
                        </strong>
                        {chuyenBay.diemDen}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Giờ hạ cánh :</strong> {chuyenBay.gioHaCanh}
                      </p>
                      <p style={{ fontSize: "0.8rem" }}>
                        <strong>Thời gian bay :</strong> {chuyenBay.thoiGianBay}
                      </p>
                    </div>

                    <div className="col-md-3 ">
                      <a href="#" onClick={handleLinkClick}>
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
                              Còn 3 ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-3 ">
                      <a href="#" onClick={handleLinkClick}>
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
                              Còn 3 ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {totalElement - size > 0 ? (
            <button
              className="btn btn-primary"
              onClick={() => setSize(totalElement)}
            >
              Xem thêm {totalElement - size} chuyến bay khác
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setSize(3)}>
              Thu gọn
            </button>
          )}
          {/* Danh sách chuyến bay về */}
          {chuyenBayKhuHois.length > 0 && (
            <h2 style={{ color: "#005f6e" }}>
              Danh sách chuyến bay về{" "}
              <span class="navbar-brand" style={{ color: "orange" }}>
                {totalElement1} kết quả
              </span>
            </h2>
          )}
          {chuyenBayKhuHois.length > 0 &&
            chuyenBayKhuHois.map((chuyenBay) => (
              <div className="card my-2 hover-ds">
                <div className="card-body card-bo">
                  <div className="row ">
                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>Nơi đi:</strong>
                        {chuyenBay.diemDi}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Giờ cất cánh :</strong> {chuyenBay.gioKhoiHanh}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Hãng bay:</strong>{" "}
                        {chuyenBay.hangBay.tenHangBay}
                      </p>
                    </div>

                    <div className="col-md-3">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem" }}>
                          Sân bay đến:
                        </strong>
                        {chuyenBay.diemDen}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Giờ hạ cánh :</strong> {chuyenBay.gioHaCanh}
                      </p>
                      <p style={{ fontSize: "0.8rem" }}>
                        <strong>Thời gian bay :</strong> {chuyenBay.thoiGianBay}
                      </p>
                    </div>

                    <div className="col-md-3 ">
                      <a href="#" onClick={handleLinkClick}>
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
                              )} `}{" "}
                              <sup>VND</sup>
                            </p>
                            <p
                              className="card-text"
                              style={{ fontSize: "0.8rem", color: "orange" }}
                            >
                              Còn 3 ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-3 ">
                      <a href="#" onClick={handleLinkClick}>
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
                              Còn 3 ghế
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {totalElement1 - size > 0 ? (
            <button
              className="btn btn-primary"
              onClick={() => setSize(totalElement1)}
            >
              Xem thêm {totalElement1 - size} chuyến bay khác
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setSize(3)}>
              Thu gọn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default DanhSachTimKiemChuyenBay;
