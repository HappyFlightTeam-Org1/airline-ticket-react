import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DSTimKiemCBCSS from "../../styles/ChuyenBayCSS/DSTimKiemCB.css";
import Pagination from "./Pagination";
import axios from "axios";

function DanhSachTimKiemChuyenBay() {
  const [chuyenBays, setChuyenBays] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
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
  const ngayKhoiHanh = queryParams.get("ngayDi");
  const ngayKhoiHanh1 = queryParams.get("ngayDiKh");
  const maxPage = Math.ceil(chuyenBays.length / size);

  useEffect(() => {
    fetchChuyenBays();
  }, [page, size, sortBy, sortDirection, diemDi, diemDen, ngayKhoiHanh]);

  const fetchChuyenBays = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/chuyen-bay/listPage",
        {
          params: {
            page,
            size,
            sortBy,
            sortDirection,
            diemDi,
            diemDen,
            ngayKhoiHanh,
          },
        }
      );
      setChuyenBays(response.data.content);
    } catch (error) {
      console.log(error);
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
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
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

        <div className="col-md-10 pd-5">
          {chuyenBays.length === 0 && <h1> Không tìm thấy </h1>}
          {chuyenBays.length > 0 &&
            chuyenBays.map((chuyenBay) => (
              <div className="card my-2 hover-ds">
                <div className="card-body card-bo">
                  <div className="row ">
                    <div className="col-md-2">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem", color: "blue" }}>
                          Sân bay đi:
                        </strong>
                        {chuyenBay.diemDi}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Giờ cất cánh :</strong> {chuyenBay.gioKhoiHanh}
                      </p>
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong>Hãng hàng không:</strong>{" "}
                        {chuyenBay.hangBay.tenHangBay}
                      </p>
                    </div>
                    <div className="col-md-2" style={{ textAlign: "center" }}>
                      <i
                        class="bx bx-transfer-alt"
                        style={{ fontSize: "1.5rem", color: "goldenrod" }}
                      ></i>
                    </div>
                    <div className="col-md-2">
                      <p style={{ fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        <strong style={{ fontSize: "0.8rem", color: "blue" }}>
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
                            <h5
                              className="card-title "
                              style={{ fontSize: "1rem", color: "blue" }}
                            >
                              Khoang Phổ thông
                            </h5>
                            <p
                              className="card-text "
                              style={{
                                textAlign: "center",
                                marginBottom: "0rem",
                                fontSize: "0.8rem",
                              }}
                            >
                              {`${(chuyenBay.giaVe * 1).toLocaleString(
                                "vi-VN"
                              )} VNĐ`}
                            </p>
                            <p
                              className="card-text"
                              style={{ fontSize: "0.6rem" }}
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
                            backgroundColor: "#f4f9f5",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            className="card-body dat-ve "
                            style={{ padding: "0.5rem" }}
                          >
                            <h5
                              className="card-title "
                              style={{ fontSize: "1rem", color: "goldenrod" }}
                            >
                              Khoang Thương gia
                            </h5>
                            <p
                              className="card-text "
                              style={{
                                textAlign: "center",
                                marginBottom: "0rem",
                                fontSize: "0.8rem",
                              }}
                            >
                              {`${(chuyenBay.giaVe * 1.5).toLocaleString(
                                "vi-VN"
                              )} VNĐ`}
                            </p>
                            <p
                              className="card-text"
                              style={{ fontSize: "0.6rem" }}
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
          <Pagination
            currentPage={page}
            totalPages={maxPage}
            onPageChange={fetchChuyenBays}
          />
          {/* <div>
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handleJumpToPage(pageNumber)}
                disabled={page === pageNumber}
              >
                {pageNumber}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={page === maxPage}>
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default DanhSachTimKiemChuyenBay;
