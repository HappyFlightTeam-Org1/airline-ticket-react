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
      setChuyenBays(chuyenBay1Chieu.content);
      setChuyenBayKhuHois(chuyenBayKhuHoi.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortDirectionChange = (event) => {
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
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="giaVe">Giá vé</option>
                  <option value="gioKhoiHanh">Giờ khởi hành</option>
                </select>
                <select
                  value={sortDirection}
                  onChange={handleSortDirectionChange}
                >
                  <option value="ASC">Tăng dần</option>
                  <option value="DESC">Giảm dần</option>
                </select>
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
          <h2>Danh sách chuyến bay đi</h2>
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
          {/* Pagination */}
          {/* <Pagination
            currentPage={page}
            totalPages={totalPages}
            fetchChuyenBays={fetchChuyenBays}
          /> */}
          

          {/* Danh sách chuyến bay về */}
          {chuyenBayKhuHois.length > 0 && <h2>Danh sách chuyến bay về</h2>}
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
          {chuyenBayKhuHois.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              fetchChuyenBays={fetchChuyenBays}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default DanhSachTimKiemChuyenBay;
