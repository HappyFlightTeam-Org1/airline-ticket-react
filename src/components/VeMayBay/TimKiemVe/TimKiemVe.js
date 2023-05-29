import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './TimKiemVe.css'
import axios from "axios";
import { toast } from "react-toastify";
function TimKiemVe() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [totalPage, setTotalPage] = useState(3);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    if (orderCode === '') {
      setTickets([]);
    }
    else {
      const apiURLQuery = "http://localhost:8080/VeMayBay/list-page" + `?maHoaDon=${orderCode}&page=${currentPage}&size=${pageSize}`;
      axios
        .get(apiURLQuery)
        .then(response => {
          console.log("response.data.content", response);
          if (response.data !== '') {
            setTotalPage(response.data.totalPages);
            setPageNumbers(Array.from(Array(response.data.totalPages).keys()));
            setTickets(response.data.content);
          } else {
            setTickets([]);
            toast.error("KHÔNG TÌM THẤY VÉ!")
          }
        })
        .catch(err => console.error(err));
    }
  }, [currentPage, orderCode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderCode(event.target.elements.maHoaDon.value);
  };

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

  return (
    <div className='container ticket-container bg-body shadow mg-top-60'>
      <div className="pt-5 pb-2">
        <div className="text-center pb-2">
          <h1>TÌM KIẾM VÉ</h1>
        </div>
        <form onSubmit={handleSubmit} className="row justify-content-center">
          <div className="form-group d-flex justify-content-center align-items-center">
            <div className="form-group col-md-2">
              <input id="maHoaDon" type="text" name="maHoaDon" className="form-control"
                placeholder="Nhập mã đặt chỗ" />
            </div>

            <div className="form-group col-md-2 d-flex justify-content-center">
              <button type="submit" className="btn bg"> Tìm Kiếm</button>
            </div>
          </div>
        </form>
      </div>

      <div className="mh-300">
        {tickets !== [] && (<table className="table table-striped border text-nowrap">
          <thead>
            <tr>
              <th scope="col">Mã Vé</th>
              <th scope="col">Tên Hành Khách</th>
              <th scope="col">Ngày Booking</th>
              <th scope="col">Ngày Bay</th>
              <th scope="col">Nơi Đi</th>
              <th scope="col">Nơi Đến</th>
              <th scope="col">Hạng Vé</th>
              <th scope="col">Giá Vé</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((item, index) => {
              return (
                <tr className="align-middle" key={item.maVe}>
                  <th scope="row">{item.maVe}</th>
                  <td>{item.hanhKhach.tenHanhKhach}</td>
                  <td>{item.hoaDon.ngayTao}</td>
                  <td>{item.datCho.chuyenBay.ngayKhoiHanh}</td>
                  <td>{item.datCho.chuyenBay.diemDi}</td>
                  <td>{item.datCho.chuyenBay.diemDen}</td>
                  <td>{item.datCho.ghe.loaiGhe.tenLoaiGhe}</td>
                  <td>{(item.datCho.ghe.loaiGhe.tenLoaiGhe === "Phổ Thông") ? item.giaVe : item.giaVe * 1.5}</td>
                  <td>
                    <Link
                      as={Link}
                      to={`/InVe?maVe=${item.maVe.toString()}`}
                      className="text-white"
                    >
                      <button className="btn bg" type="submit">

                        In</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>)}

        {tickets.length === 0 && (<div className="row justify-content-center">
          <div className="col-6 d-flex justify-content-center mh-300">
            <img
              src="https://i.giphy.com/media/HTSsuRrErs54g1Tqr5/giphy.webp" alt="Flight" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
            <div className="text-center">
              <p className="text-white">No result!</p>
            </div>
          </div>
        </div>)}
      </div>
      {tickets.length > 0 && (
        <div className="pagination justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
              >
                <button className="page-link bg" onClick={handlePreviousPageClick}>
                  Previous
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
                  Next
                </button>
              </li>
            </ul>
          </nav>

        </div>
      )}
    </div>
  );
}
export default TimKiemVe;