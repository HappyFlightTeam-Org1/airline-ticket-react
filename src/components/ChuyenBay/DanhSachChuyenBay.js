import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function DanhSachChuyenBay() {
  const [listCB, setListCB] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/chuyen-bay/list")
      .then((response) => {
        setListCB(response.data);
        console.log(response.data);
      })
      .catch((err) => console.error);
  }, []);

  return (
    <div className="container">
      <h1>DANH SÁCH CHUYẾN BAY</h1>
      <hr />
      <form class="row justify-content-center search">
        <div class="form-group col -md-2">
          <h5>Tìm Kiếm Theo</h5>
        </div>
        <div class="form-group col -md-2">
          <input
            id="adults"
            type="text"
            name="adults"
            class="form-control"
            placeholder="Mã Chuyến Bay"
          />
        </div>
        <div class="form-group col -md-2">
          <input
            id="adults"
            type="text"
            name="adults"
            class="form-control"
            placeholder="Điểm Đi"
          />
        </div>
        <div class="form-group col -md-2">
          <input
            id="adults"
            type="text"
            name="adults"
            class="form-control"
            placeholder="Điểm Đến"
          />
        </div>
        <div class="form-group col -md-2">
          <input
            id="adults"
            type="date"
            name="adults"
            class="form-control"
            placeholder="Ngày Khởi Hành"
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
      <table className="table table-hover table-shadow">
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
          {listCB.length > 0 &&
            listCB.map((item, index) => (
              <tr key={item.maChuyenBay}>
                <td> {index + 1}</td>
                <td>{item.maChuyenBay}</td>
                <td>{item.diemDi}</td>
                <td>{item.diemDen}</td>
                <td>{item.ngayKhoiHanh}</td>
                <td>{item.gioKhoiHanh}</td>
                <td>{item.gioHaCanh}</td>
                <td>{item.giaVe}</td>
                <td>{item.hangBay.tenHangBay}</td>
                <td>{item.trangThaiVanHanh}</td>
                <td>
                  <Link
                    as={Link}
                    to={`/CapNhatChuyenBay?id=${item.maChuyenBay.toString()}`}
                    className="text-white"
                  >
                    <button className="btn btn-success">Chỉnh Sửa</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {listCB.length === 0 && (
        <h1 style={{ textAlign: "center" }}>Không có dữ liệu</h1>
      )}

      {listCB.length > 0 && (
        <div className="pagination">
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item disabled">
                {" "}
                <span className="page-link">Previous</span>{" "}
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                {" "}
                <span className="page-link">2</span>{" "}
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                {" "}
                <a className="page-link" href="#">
                  Next
                </a>{" "}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
export default DanhSachChuyenBay;
