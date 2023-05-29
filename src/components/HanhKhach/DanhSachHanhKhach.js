import "./HanhKhach.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function HanhKhach() {
  const [listKH, setListKH] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(3);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [name, setName] = useState('');
  const [isStatus, setIsStatus] = useState(false);


  useEffect(() => {
    const url = isSearching
      ? `http://localhost:8080/hanh-khach/search?tenHanhKhach=${name}&page=${currentPage}&size=${pageSize}`
      : `http://localhost:8080/hanh-khach/list-with-page?page=${currentPage}&size=${pageSize}`;
    axios
      .get(
        url
      )
      .then((response) => {
        const data = response.data;
        setTotalPage(data.totalPages);
        setPageNumbers(Array.from(Array(data.totalPages).keys()));
        setListKH(data.content);
      })
      .catch((error) => console.error);
  }, [currentPage, pageSize, isStatus]);

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

  function handlePageNumberClick(pageNumber) {
    setCurrentPage(pageNumber);
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    setName(event.target.elements.adults.value);
    setIsSearching(true);
    isStatus === true ? setIsStatus(false) : setIsStatus(true);
  };

  return (

    <div className='container bg-body table-shadow'>
      <div className="tablehk mt-3">
        <h1 className="pt-3 mb-0 text-center">QUẢN LÝ HÀNH KHÁCH</h1>
        <form className="row justify-content-center search" onSubmit={handleSearch}>
          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <h5>Tìm Kiếm</h5>
          </div>
          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <input
              id="adults"
              type="text"
              name="adults"
              className="form-control"
              placeholder="Tên hành khách"
            ></input>
          </div>

          <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-success bg">
              Tìm Kiếm
            </button>
          </div>
        </form>
        <table className="table table-striped table-shadow">
          <thead>
            <tr>
              <th scope="col">Stt</th>
              <th scope="col">Loại hành khách</th>
              <th scope="col">Họ Tên</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Mã Vé</th>
              <th scope="col">Mã Chuyến bay</th>
            </tr>
          </thead>
          <tbody>
            {listKH.length > 0 &&
              listKH.map((item, index) => (
                <tr key={item.maHanhKhach}>
                  <td>{index + 1}</td>
                  <td>{item.loaiHanhKhach}</td>
                  <td>{item.tenHanhKhach}</td>
                  <td>{item.ngaySinh}</td>
                  <td>{item.gioiTinh}</td>
                  <td>V001</td>
                  <td>CB002</td>
                </tr>
              ))}
          </tbody>
        </table>

        {listKH.length === 0 && (
          <h1 style={{ textAlign: "center" }}>Không có dữ liệu</h1>
        )}
      </div>
      <div>
        {listKH.length > 0 && (
          <div className="pagination justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                >
                   <button className="page-link bg" onClick={handleBeginPageClick}>
                    Begin
                  </button>
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
                  <button className="page-link bg" onClick={handleEndPageClick}>
                    End
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>


  );
}

export default HanhKhach;
