/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./DanhSachChuyenBay.css";
function DanhSachChuyenBay() {
  const [listCB, setListCB] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({});
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sanBays, setSanBays] = useState([]);
  const [diemDi, setDiemDi] = useState();
  const [diemDen, setDiemDen] = useState();
  const [totalPages, setTotalPages] = useState();

  //DucNH66 Lấy danh sách sân bay  DucNH66
  useEffect(() => {
    axios
      .get("http://localhost:8080/chuyen-bay/listSelectOption")
      .then((response) => {
        const { sanBays } = response.data;
        setSanBays(sanBays);
      })
      .catch((err) => console.error);
  }, []);

  //DucNH66 load lại danh sách chuyến bay khi có thay đổi
  useEffect(() => {
    fetchChuyenBays();
  }, [page, size, diemDi, diemDen]);

  //DucNH66 Lấy danh sách chuyến bay
  const fetchChuyenBays = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/chuyen-bay/listPageAdmin",
        {
          params: {
            page,
            size,
            diemDi,
            diemDen,
          },
        }
      );
      setTotalPages(response.data.totalPages);
      console.log("total element: ", response.data.totalElements);
      if (diemDi || diemDen) {
        setIsSearching(true);
        setSearchResult(response.data.content);
      } else {
        setIsSearching(false);
        setListCB(response.data.content);
      }
    } catch (error) {}
  };
  console.log("listCB_2 : ", listCB);
  console.log("searchResult: ", searchResult);
  //Ducnh66 nhập thông tin tìm kiếm
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //Ducnh66 gởi thông tin search/nếu không nhập gì lấy tìm tất cả
  const handleSearch = (event) => {
    event.preventDefault();
    setPage(0);
    setDiemDi(formData.diemDi);
    setDiemDen(formData.diemDen);
    if (!diemDi && !diemDen) {
      setIsSearching(false);
      fetchChuyenBays();
    }
  };

  //Ducnh66 chọn trang muốn hiển thị
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //Ducnh66 tính toán trang được hiển thị trên màn hình
  const calculatePageNumbers = () => {
    const soTrangToiDa = 3;
    const trangDau = Math.max(0, page - Math.floor(soTrangToiDa / 2));
    const trangCuoi = Math.min(totalPages - 1, trangDau + soTrangToiDa - 1);
    const pageNumbers = [];
    for (let i = trangDau; i <= trangCuoi; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  //Ducnh66 hiển thị giao diện số trang
  const renderPageNumbers = () => {
    const pageNumbers = calculatePageNumbers();
    return pageNumbers.map((pageNumber) => (
      <li
        key={pageNumber}
        className={`page-item ${page === pageNumber ? "active" : ""}`}
      >
        <a
          className="page-link"
          href="#"
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber + 1}
        </a>
      </li>
    ));
  };

  return (
    <div className="container chuyenbay ">
      <h1 className="h1">DANH SÁCH CHUYẾN BAY</h1>
      {/* Form tìm kiếm  DucNH66*/}
      <form
        className="row justify-content-center search"
        onSubmit={handleSearch}
      >
        <div className="form-group col -md-2 d-flex justify-content-center align-items-center">
          <h5>Tìm Kiếm Theo</h5>
        </div>
        <div className="form-group col -md-2 d-flex justify-content-center align-items-center">
          <select
            name="diemDi"
            id="diemDi"
            value={formData.diemDi}
            onChange={handleInputChange}
            className="form-control "
          >
            <option value="">-- Chọn điểm đi --</option>
            {sanBays.map((sanBay) => (
              <option key={sanBay.maSanBay} value={sanBay.thanhPho}>
                {sanBay.thanhPho}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col -md-2 d-flex justify-content-center align-items-center">
          <select
            name="diemDen"
            id="diemDen"
            value={formData.diemDen}
            onChange={handleInputChange}
            className="form-control "
          >
            <option value="">-- Chọn điểm đến --</option>
            {sanBays.map((sanBay) => (
              <option key={sanBay.maSanBay} value={sanBay.thanhPho}>
                {sanBay.thanhPho}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col">
          <button type="submit" className="btn btn-success bg">
            Tìm Kiếm
          </button>
        </div>
      </form>
      {/* Nút thêm mới */}
      <Link as={Link} to="/ThemChuyenBay" className="text-white">
        <button className="btn btn-success bg">Thêm mới</button>
      </Link>

      {/* Table dánh sách */}
      <table className="table table-striped shadow text-nowrap">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Stt</th>
            <th scope="col">Điểm đi</th>
            <th scope="col">Điểm đến</th>
            <th scope="col">Ngày khởi hành</th>
            <th scope="col">Giờ khởi hành</th>
            <th scope="col">Giờ hạ cánh</th>
            <th scope="col">Tên hãng bay</th>
            <th scope="col">Giá vé</th>
            <th scope="col">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {/* Danh sách tìm kiếm  DucNH66 */}
          {isSearching
            ? searchResult.map((item, index) => (
                <tr key={item.maChuyenBay}>
                  <td> {index + 1 + page * size}</td>
                  <td>{item.diemDi}</td>
                  <td>{item.diemDen}</td>
                  <td>{item.ngayKhoiHanh}</td>
                  <td>{item.gioKhoiHanh}</td>
                  <td>{item.gioHaCanh}</td>
                  <td>{item.hangBay.tenHangBay}</td>
                  <td>
                    {item.giaVe.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>

                  <td>
                    <Link
                      as={Link}
                      to={`/CapNhatChuyenBay?id=${item.maChuyenBay.toString()}`}
                      className="text-white"
                    >
                      <button className="btn btn-success bg">Xem</button>
                    </Link>
                  </td>
                </tr>
              ))
            : //   Danh sách tất cả  DucNH66
              listCB.map((item, index) => (
                <tr key={item.maChuyenBay}>
                  <td> {index + 1 + page * size}</td>
                  <td>{item.maChuyenBay}</td>
                  <td>{item.diemDi}</td>
                  <td>{item.diemDen}</td>
                  <td>{item.ngayKhoiHanh}</td>
                  <td>{item.gioKhoiHanh}</td>
                  <td>{item.gioHaCanh}</td>
                  <td>{item.hangBay.tenHangBay}</td>
                  <td>
                    {item.giaVe.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>{" "}
                  <td>{item.trangThaiVanHanh}</td>
                  <td>
                    <Link
                      as={Link}
                      to={`/CapNhatChuyenBay?id=${item.maChuyenBay.toString()}`}
                      className="text-white"
                    >
                      <button className="btn btn-success bg ">Xem</button>
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Hiển thị thông báo khi không có dữ liệu  DucNH66 */}
      {!isSearching
        ? listCB.length === 0 && <h1 className="h1">Không có dữ liệu</h1>
        : searchResult.length === 0 && <h1 className="h1">Không có dữ liệu</h1>}

      {/* Phân trang DucNH66  */}
      {(listCB.length > 0 || searchResult.length > 0) && (
        <div className="pagination">
          <nav aria-label="...">
            <ul className="pagination">
              <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link bg-warning text-white bg"
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
              </li>
              <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link bg-success text-white bg"
                  disabled={page === 0}
                  onClick={() => handlePageChange(page - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
              </li>
              {renderPageNumbers()}

              <li
                className={`page-item   ${
                  page === totalPages - 1 ? "disabled" : ""
                }`}
              >
                <button
                  type="button"
                  className={`page-link  bg-success text-white none bg   ${
                    page === totalPages - 1 ? "disabled" : ""
                  }`}
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages - 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </li>
              <li
                className={`page-item   ${
                  page === totalPages - 1 ? "disabled" : ""
                }`}
              >
                <button
                  className={`page-link bg-danger text-white bg ${
                    page === totalPages - 1 ? "disabled" : ""
                  }`}
                  onClick={() => setPage(totalPages - 1)}
                  disabled={page === totalPages - 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-double-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
export default DanhSachChuyenBay;
