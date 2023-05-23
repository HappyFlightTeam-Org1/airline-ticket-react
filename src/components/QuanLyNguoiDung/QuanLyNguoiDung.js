import React, {useEffect,useState} from 'react';
import "./QuanLyNguoiDung.css"
import axios from 'axios';
export default function QuanLyNguoiDung() {
  const  [dataNguoiDung,setDataNguoiDung] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(3);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [name,setName] = useState("");
  const [soDienThoai,setSoDienThoai] = useState("");
  const [email,setEmail] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  useEffect(() => {
    const url = isSearching
      ? `http://localhost:8080/nguoi-dung/search?hoVaTen=${name}&soDienThoai=${soDienThoai}&email=${email}&page=${currentPage}&size=${pageSize}`
      : `http://localhost:8080/nguoi-dung/list-page?page=${currentPage}&size=${pageSize}`;
    axios
      .get(
        url
      )
      .then((response) => {
        const data = response.data;
        setTotalPage(data.totalPages);
        setPageNumbers(Array.from(Array(data.totalPages).keys()));
        setDataNguoiDung(data.content);
      })
      .catch((error) => console.error);
  }, [currentPage, pageSize,isStatus]);

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
  const handleSearch = async (event) => {
    event.preventDefault();
    setName(event.target.elements.name.value);
    setSoDienThoai(event.target.elements.soDienThoai.value);
    setEmail(event.target.elements.email.value);
    setIsSearching(true);
    isStatus===true?setIsStatus(false):setIsStatus(true);
  };
  return (
    <div className='container bg-body table-shadow'>
            <div className="pt-5 pb-3">
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
                        <button type="submit" className="btn btn-success"> Tìm Kiếm</button>
                    </div>
                </form>
            </div>
            <table className="table table-striped shadow">
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
                    <tr className="align-middle">
                    <th scope="row">{index +1}</th>
                        <td>{data.hoVaTen}</td>
                        <td>{data.email}</td>
                        <td>{data.soDienThoai}</td>
                        <td>{data.gioiTinh}</td>
                        <td>{data.ngaySinh}</td>
                        <td>{data.hoChieu}</td>
                        <td>{data.diaChi}</td>
                        <td>{data.quocTich.tenQuocTich}</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    )
                    )}
                </tbody>
            </table>
            {dataNguoiDung.length > 0 && (
        <div className="pagination justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={handlePreviousPageClick}>
                  Previous
                </button>
              </li>
              {pageNumbers
                .slice(currentPage, currentPage + 3)
                .map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      currentPage === pageNumber ? "active" : ""
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
                className={`page-item ${
                  currentPage === totalPage - 1 ? "disabled" : ""
                }`}
              >
                <button className="page-link" onClick={handleNextPageClick}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
            </div>
  )
}
