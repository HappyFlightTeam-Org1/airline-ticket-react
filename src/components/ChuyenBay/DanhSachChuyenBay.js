import React from "react";
import { Link } from "react-router-dom";
const DanhSachChuyenBay = () => {
  return (
    <div className="container-fluid">
      <Link
        as={Link}
        to="/ThemChuyenBay"
        className="text-white"
       
      >
        <button className="btn btn-success">Thêm mới</button>
      </Link>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Mã chuyến bay</th>
            <th scope="col">Điểm đi</th>
            <th scope="col">Điểm đến</th>
            <th scope="col">Ngày khởi hành</th>
            <th scope="col">Giờ khởi hành</th>
            <th scope="col">Giờ hạ cánh</th>
            <th scope="col">Tên hãng bay</th>
            <th scope="col">Thời gian bay</th>
            <th scope="col">Giá vé</th>
            <th scope="col">Khối lượng hành lý</th>
            <th scope="col">Tên máy bay</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Sửa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CB001</td>
            <td>Hà Nội</td>
            <td>TP.HCM</td>
            <td>2023-05-10</td>
            <td>08:00</td>
            <td>10:00</td>
            <td>Vietnam Airlines</td>
            <td>2 giờ</td>
            <td>1.000.000 VNĐ</td>
            <td>20 kg</td>
            <td>A320</td>
            <td>Đã hoàn thành</td>
            <td>
              <Link
                as={Link}
                to="/editCB"
                className="text-white"
              >
                <button className="btn btn-success">Chỉnh Sửa</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DanhSachChuyenBay;
