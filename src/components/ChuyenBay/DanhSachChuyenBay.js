import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const [ngayKhoiHanh, setNgayDi] = useState();
  // const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState();

  // Lấy danh sách sân bay  DucNH66
  useEffect(() => {
    axios
      .get("http://localhost:8080/chuyen-bay/listSelectOption")
      .then((response) => {
        const { sanBays } = response.data;
        setSanBays(sanBays);
      })
      .catch((err) => console.error);
  }, []);

  useEffect(() => {
    fetchChuyenBays();
  }, [page, size, diemDi, diemDen, ngayKhoiHanh]);

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
            ngayKhoiHanh,
          },
        }
      );
      setTotalPages(response.data.totalPages);
      // setTotalElements(response.data.totalElements);
      if (diemDi || diemDen || ngayKhoiHanh) {
        setIsSearching(true);
        setSearchResult(response.data.content);
      } else {
        setIsSearching(false);
        setListCB(response.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(0);
    setDiemDi(formData.diemDi);
    setDiemDen(formData.diemDen);
    setNgayDi(formData.ngayKhoiHanh);
    if (!diemDi && !diemDen && !ngayKhoiHanh) {
      setIsSearching(false);
      setListCB([]);
      fetchChuyenBays();
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const calculatePageNumbers = () => {
    const totalVisiblePages = 4;
    const startPage = Math.max(0, page - Math.floor(totalVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + totalVisiblePages - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };
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
    <div className="container chuyenbay mt-3">
      <h1 className="text-center">DANH SÁCH CHUYẾN BAY</h1>
      <hr />
      {/* Form tìm kiếm  DucNH66*/}
      <form class="row justify-content-center search" onSubmit={handleSearch}>
        <div class="form-group col -md-2 d-flex justify-content-center align-items-center">
          <h5>Tìm Kiếm Theo</h5>
        </div>
        <div class="form-group col -md-2 d-flex justify-content-center align-items-center">
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
        <div class="form-group col -md-2 d-flex justify-content-center align-items-center">
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
        <div class="form-group col -md-2 d-flex justify-content-center align-items-center">
          <input
            id="ngayKhoiHanh"
            type="date"
            name="ngayKhoiHanh"
            value={formData.ngayKhoiHanh}
            class="form-control"
            placeholder="Ngày Khởi Hành"
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group col">
          <button type="submit" class="btn btn-success">
            Tìm Kiếm
          </button>
        </div>
      </form>
      <Link as={Link} to="/ThemChuyenBay" className="text-white">
        <button className="btn btn-success">Thêm mới</button>
      </Link>
      <table className="table table-striped shadow">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Stt</th>
            <th scope="col">Mã chuyến bay</th>
            <th scope="col">Điểm đi</th>
            <th scope="col">Điểm đến</th>
            <th scope="col">Ngày khởi hành</th>
            <th scope="col">Giờ khởi hành</th>
            <th scope="col">Giờ hạ cánh</th>
            <th scope="col">Tên hãng bay</th>
            <th scope="col">Giá vé</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Sửa</th>
          </tr>
        </thead>
        <tbody>
          {/* Danh sách tìm kiếm  DucNH66 */}
          {isSearching
            ? searchResult.map((item, index) => (
              <tr key={item.maChuyenBay}>
                <td> {index + 1 + page * size}</td>
                <td>{item.maChuyenBay}</td>
                <td>{item.diemDi}</td>
                <td>{item.diemDen}</td>
                <td>{item.ngayKhoiHanh}</td>
                <td>{item.gioKhoiHanh}</td>
                <td>{item.gioHaCanh}</td>
                <td>{item.hangBay.tenHangBay}</td>

                <td>{item.giaVe}</td>
                <td>{item.trangThaiVanHanh}</td>
                <td>
                  <Link
                    as={Link}
                    to={`/CapNhatChuyenBay?id=${item.maChuyenBay.toString()}`}
                    className="text-white"
                  >
                    <button className="btn btn-success ">Sửa</button>
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
                <td>{item.giaVe}</td>
                <td>{item.trangThaiVanHanh}</td>
                <td>
                  <Link
                    as={Link}
                    to={`/CapNhatChuyenBay?id=${item.maChuyenBay.toString()}`}
                    className="text-white"
                  >
                    <button className="btn btn-success ">Sửa</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Hiển thị thông báo khi không có dữ liệu  DucNH66 */}
      {!isSearching
        ? listCB.length === 0 && (
          <h1 style={{ textAlign: "center" }}>Không có dữ liệu</h1>
        )
        : searchResult.length === 0 && (
          <h1 style={{ textAlign: "center" }}>Không có dữ liệu</h1>
        )}

      {/* Phân trang DucNH66  */}
      {(listCB.length > 0 || searchResult.length > 0) && (
        <div className="pagination">
          <nav aria-label="...">
            <ul className="pagination">
              <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link bg-warning text-white"
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                >
                  Start
                </button>
              </li>
              <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                <button
                  type="button"
                  className="page-link bg-success text-white"
                  disabled={page === 0}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
              </li>
              {renderPageNumbers()}

              <li
                className={`page-item   ${page === totalPages - 1 ? "disabled" : ""
                  }`}
              >
                <button
                  type="button"
                  className={`page-link  bg-success text-white none   ${page === totalPages - 1 ? "disabled" : ""
                    }`}
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages - 1}
                >
                  Next
                </button>
              </li>
              <li
                className={`page-item   ${page === totalPages - 1 ? "disabled" : ""
                  }`}
              >
                <button
                  className={`page-link bg-danger text-white  ${page === totalPages - 1 ? "disabled" : ""
                    }`}
                  onClick={() => setPage(totalPages - 1)}
                  disabled={page === totalPages - 1}
                >
                  End
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
