import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CapNhatChuyenBay() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [formData, setFormData] = useState({});
  const [tenMayBay, setMayBay] = useState();
  const [tenHangBay, setHangBay] = useState();

  //DucNH66 lấy thông tin hiển thị lên form
  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + id)
        .then((response) => {
          setFormData(response.data);
          setMayBay(response.data.mayBay.tenMayBay);
          setHangBay(response.data.hangBay.tenHangBay);
          console.log(response.data);
        });
    }
  }, [id]);
  //DucNH66 khi cần cập nhật thì dùng
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  //DucNH66 trở về
  const handleSubmit = (event) => {
    navigate("/DanhSachChuyenBay");
  };

  return (
    <div className="container mb-5 mt-10">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header  text-white bg">
              <h3 autoFocus>Xem chi tiết</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Mã chuyến bay</label>
                    <input
                      className="form-control"
                      type="text"
                      name="maChuyenBay"
                      id="maChuyenBay"
                      value={formData.maChuyenBay}
                      readOnly="true"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Giá vé</label>
                    <input
                      className="form-control"
                      type="text"
                      name="giaVe"
                      id="giaVe"
                      readOnly="true"
                      value={formData.giaVe}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Sân bay đi</label>
                    <input
                      name="diemDi"
                      id="diemDi"
                      value={formData.diemDi}
                      onChange={handleInputChange}
                      className="form-control "
                      readOnly="true"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Sân bay hạ cánh</label>
                    <input
                      name="diemDen"
                      id="diemDen"
                      value={formData.diemDen}
                      onChange={handleInputChange}
                      className="form-control "
                      readOnly="true"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Ngày khởi hành</label>
                    <input
                      id="ngayKhoiHanh"
                      type="date"
                      className="form-control"
                      name="ngayKhoiHanh"
                      value={formData.ngayKhoiHanh}
                      onChange={handleInputChange}
                      readOnly="true"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Giờ khởi hành</label>
                    <input
                      type="time"
                      className="form-control"
                      name="gioKhoiHanh"
                      id="gioKhoiHanh"
                      value={formData.gioKhoiHanh}
                      onChange={handleInputChange}
                      readOnly="true"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Giờ hạ cánh</label>
                    <input
                      id="gioHaCanh"
                      type="time"
                      className="form-control"
                      name="gioHaCanh"
                      value={formData.gioHaCanh}
                      onChange={handleInputChange}
                      readOnly="true"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Thời gian bay</label>
                    <input
                      type="text"
                      className="form-control"
                      name="thoiGianBay"
                      id="thoiGianBay"
                      value={formData.thoiGianBay}
                      onChange={handleInputChange}
                      readOnly="true"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Tên máy bay</label>
                    {formData && (
                      <input
                        name="maMayBay"
                        id="maMayBay"
                        value={tenMayBay}
                        onChange={handleInputChange}
                        className="form-control "
                        readOnly="true"
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <label>Tên hãng bay</label>
                    <input
                      name="maHangBay"
                      id="maHangBay"
                      value={tenHangBay}
                      onChange={handleInputChange}
                      className="form-control "
                      readOnly="true"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Khối lượng hành lý</label>
                    <input
                      id="kLHanhLy"
                      type="text"
                      className="form-control"
                      name="kLHanhLy"
                      value={formData.klhanhLy}
                      onChange={handleInputChange}
                      readOnly="true"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Trạng thái</label>
                    <input
                      type="text"
                      className="form-control"
                      name="trangThaiVanHanh"
                      id="trangThaiVanHanh"
                      value={formData.trangThaiVanHanh}
                      onChange={handleInputChange}
                      readOnly="true"
                    />
                  </div>
                </div>
                <div className="form-group text-center mt-2">
                  <button type="submit" className="btn btn-success bg">
                    Trở về
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CapNhatChuyenBay;
