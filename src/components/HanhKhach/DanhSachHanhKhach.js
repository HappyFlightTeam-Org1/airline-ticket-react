import "./HanhKhach.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function HanhKhach() {
  const [listKH, setListKH] = useState([]);
  useEffect(() => {
    axios
      // Api tạm thời để test DucNH66
      .get("http://localhost:8080/VeMayBay/list")
      .then((response) => {
        setListKH(response.data);
      })
      .catch((error) => console.error);
  }, []);

  return (
    <div className="container ">
      <h1 className="pt-3 mb-0">QUẢN LÝ HÀNH KHÁCH</h1>
      <form className="row justify-content-center search">
        <div className="form-group col-md-2 ">
          <h5>Tìm Kiếm</h5>
        </div>
        <div className="form-group col-md-2">
          {" "}
          <input
            id="adults"
            type="text"
            name="adults"
            className="form-control"
            placeholder="Tên hành khách"
          ></input>{" "}
        </div>

        <div className="form-group col-md-2 ">
          {" "}
          <button type="submit" className="btn btn-success">
            {" "}
            Tìm Kiếm
          </button>{" "}
        </div>
      </form>
      <table className="table table-striped table-shadow">
        <thead>
          <tr>
            <th scope="col">Stt</th>
            <th scope="col">Loại hành khách</th>
            <th scope="col">Họ Tên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Giới tính</th>
            <th scope="col">CCCD/Hộ chiếu</th>
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
                <td>{item.soDienThoai}</td>
                <td>{item.gioiTinh}</td>
                <td>{item.hoChieu}</td>
                <td>V003</td>
                <td>CB002</td>
              </tr>
            ))}
        </tbody>
      </table>

      {listKH.length === 0 && (
        <h1 style={{ textAlign: "center" }}>Không có dữ liệu</h1>
      )}
      {listKH.length > 0 && (
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
export default HanhKhach;
