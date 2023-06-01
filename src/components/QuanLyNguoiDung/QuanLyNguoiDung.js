import React, { useEffect, useState } from 'react';
import "./QuanLyNguoiDung.css"
import axios from 'axios';
import * as XLSX from 'xlsx/xlsx.mjs';
export default function QuanLyNguoiDung() {
  const [dataNguoiDung, setDataNguoiDung] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(3);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [name, setName] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [email, setEmail] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  const [dataExcel, setDataExcel] = useState({});
  const [buttonToggleState, setButtonToggleState] = useState([]);
  const [isToggle, setIsToggle] = useState(true);

  useEffect(() => {
    const url = isSearching
      ? `http://localhost:8080/nguoi-dung/search?hoVaTen=${name}&soDienThoai=${soDienThoai}&email=${email}&page=${currentPage}&size=${pageSize}`
      // : `http://localhost:8080/nguoi-dung/list-page?page=${currentPage}&size=${pageSize}`;
      : `http://localhost:8080/nguoi-dung/search?page=${currentPage}&size=${pageSize}`
    axios
      .get(
        url
      )
      .then((response) => {
        const data = response.data;
        setTotalPage(data.totalPages);
        setPageNumbers(Array.from(Array(data.totalPages).keys()));
        setDataNguoiDung([...data.content]);
        setButtonToggleState(data.content.map((data, index) => ({
          index: index,
          toggle: data.trangThaiXoa === 0,
        })));
      })
      .catch((error) => console.error);

    axios
      .get("http://localhost:8080/nguoi-dung/list")
      .then((response) => {
        const users = response.data.map((user) => ({
          ...user,
          quocTich: user.quocTich.tenQuocTich,
          taiKhoan: user.taiKhoan.tenTaiKhoan
        }));
        setDataExcel(users);
      })
      .catch((err) => console.error);

  }, [currentPage, pageSize, isStatus, isToggle]);

  function handleNextPageClick() {
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePreviousPageClick() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handlePageNumberClick(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const handleSearch = (event) => {
    event.preventDefault();
    setName(event.target.elements.name.value);
    setSoDienThoai(event.target.elements.soDienThoai.value);
    setEmail(event.target.elements.email.value);
    setIsSearching(true);
    isStatus === true ? setIsStatus(false) : setIsStatus(true);
  };

  const handleOnExport = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataExcel);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  }

  function handleBeginPageClick() {
    if (currentPage > 0) {
      setCurrentPage(0);
    }
  }
  function handleEndPageClick() {
    if (currentPage < totalPage-1) {
      setCurrentPage(totalPage-1);
    }
  }

  function handleDeleteNguoiDung(email) {
    // setButtonToggleState([...buttonToggleState, buttonToggleState.find(item => item.index === index)]);
    setIsToggle(!isToggle);
    let formData = new FormData();
    formData.append("email", email);
    axios
      .post("http://localhost:8080/nguoi-dung/delete-nguoi-dung", formData, {
        withCredentials: true,
      })
      .catch(err => console.log(err));
  }

  function handleRemoveDeleteNguoiDung(email) {
    // setButtonToggleState([...buttonToggleState, buttonToggleState.find(item => item.index === index)]);
    setIsToggle(!isToggle);
    let formData = new FormData();
    formData.append("email", email);
    axios
      .post("http://localhost:8080/nguoi-dung/remove-delete-nguoi-dung", formData, {
        withCredentials: true,
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='container bg-body table-shadow'>
      <div className="pt-5 pb-3">
        {/* <button onClick={hanldeOnExport} >Excel</button> */}
        <div className="text-center pb-3">
          <h1>DANH SÁCH NGƯỜI DÙNG</h1>
        </div>
        <form className="row justify-content-center search" onSubmit={handleSearch}>
          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <h5>Tìm Kiếm Theo</h5>
          </div>
          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <input id="adults" type="text" name="name" className="form-control" placeholder="Tên Người Dùng" />
          </div>
          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <input id="adults" type="text" name="soDienThoai" className="form-control" placeholder="Số Điện Thoại" />
          </div>
          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <input id="adults" type="text" name="email" className="form-control" placeholder="Địa Chỉ Email" />
          </div>
          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-success bg"> Tìm Kiếm</button>
          </div>
        </form>
      </div>
      <div class="table-responsive">
      <table className="table table-striped shadow text-nowrap">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Họ Và Tên</th>
            <th scope="col">Địa chỉ email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Hộ Chiếu</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Quốc tịch</th>
            <th scope="col">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {dataNguoiDung.map((data, index) => (
            <tr className="align-middle" key={index}>
              <th scope="row">{index + 1 +currentPage*pageSize}</th>
              <td>{data.hoVaTen}</td>
              <td>{data.email}</td>
              <td>{data.soDienThoai}</td>
              <td>{data.gioiTinh}</td>
              <td>{data.ngaySinh}</td>
              <td>{data.hoChieu}</td>
              <td>{data.diaChi}</td>
              <td>{data.quocTich.tenQuocTich}</td>
              <td>
                {data.trangThaiXoa === 0
                ? <button className="btn btn-danger" type="button" onClick={() => handleDeleteNguoiDung(data.email, index)}>Khoá</button>
                : <button className="btn btn-info bg" type="button" onClick={() => handleRemoveDeleteNguoiDung(data.email, index)}>Mở</button>
                }
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
      {dataNguoiDung.length === 0 && (
        <h1 style={{ textAlign: "center" }}>Không tìm thấy người dùng</h1>
      )}
      {dataNguoiDung.length > 0 && (
        <div className="pagination justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
              >
                <button className="page-link bg" onClick={handleBeginPageClick}>
                   <i class="fa-solid fa-angles-left"></i>
                </button>
                <button className="page-link bg" onClick={handlePreviousPageClick}>
                  <i class="fa-solid fa-angle-left"></i>
                  </button>
              </li>
              {pageNumbers
                .slice(currentPage, currentPage + 3)
                .map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${currentPage === pageNumber ? "active" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageNumberClick(pageNumber)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
              {currentPage + 3 < totalPage && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li
                className={`page-item ${currentPage === totalPage - 1 ? "disabled" : ""
                  }`}
              >
                 <button className="page-link bg" onClick={handleNextPageClick}>
                  <i class="fa-solid fa-chevron-right"></i>
                  </button>
                  <button className="page-link bg" onClick={handleEndPageClick}>
                  <i class="fa-solid fa-angles-right"></i>
                  </button>
              </li>
            </ul>
          </nav>
          <div className="form-group col-md-2 export d-flex justify-content-center align-items-center">
            <button onClick={handleOnExport} className="btn btn-success bg">Excel <i class="fa-sharp fa-regular fa-file-excel"></i></button>

          </div>
        </div>
      )}
    </div>
  )
}
