import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CapNhatChuyenBay() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [mayBays, setMayBays] = useState([]);
  const [sanBays, setSanBays] = useState([]);
  const [hangBays, setHangBays] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + id)
        .then((response) => {
          setFormData(response.data);
        });
    }
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chuyen-bay/listSelectOption")
      .then((response) => {
        const { mayBays, sanBays, hangBays } = response.data;
        setMayBays(mayBays);
        setSanBays(sanBays);
        setHangBays(hangBays);
      })
      .catch((err) => console.error);
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/chuyen-bay/save", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Cap nhat thanh cong");
        navigate("/DanhSachChuyenBay");
      })
      .catch((err) => {
        alert("Them that bai");
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div
              className="card-header  text-white"
              style={{ backgroundColor: "#FFA500" }}
            >
              <h3>Chỉnh Sửa Chuyến Bay</h3>
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
                      value={formData.giaVe}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Sân bay đi</label>
                    <select
                      name="diemDi"
                      id="diemDi"
                      value={formData.diemDi}
                      onChange={handleInputChange}
                      className="form-control "
                    >
                      <option value="">-- Chọn điểm đi --</option>
                      {sanBays.map((sanBay) => (
                        <option
                          key={sanBay.maSanBay}
                          selected="true"
                          value={sanBay.thanhPho}
                        >
                          {sanBay.thanhPho}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Sân bay hạ cánh</label>
                    <select
                      name="diemDen"
                      id="diemDen"
                      value={formData.diemDen}
                      onChange={handleInputChange}
                      className="form-control "
                    >
                      <option value="">-- Chọn điểm đến--</option>
                      {sanBays.map((sanBay) => (
                        <option key={sanBay.maSanBay} value={sanBay.thanhPho}>
                          {sanBay.thanhPho}
                        </option>
                      ))}
                    </select>
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
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Tên máy bay</label>
                    <select
                      name="maMayBay"
                      id="maMayBay"
                      value={formData.maMayBay}
                      onChange={handleInputChange}
                      className="form-control "
                    >
                      {mayBays.map((maybay) =>
                      
                        maybay.maMayBay === formData.maMayBay ? (
                          <option
                            key={maybay.maMayBay}
                            selected="true"
                            value={maybay.maMayBay}
                          >
                            {maybay.tenMayBay}
                          </option>
                        ) : (
                          <option key={maybay.maMayBay} value={maybay.maMayBay}>
                            {maybay.tenMayBay}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Tên hãng bay</label>
                    <select
                      name="maHangBay"
                      id="maHangBay"
                      value={formData.maHangBay}
                      onChange={handleInputChange}
                      className="form-control "
                    >
                      {hangBays.map((hangBay) => (
                        <option
                          key={hangBay.maHangBay}
                          value={hangBay.maHangBay}
                        >
                          {hangBay.tenHangBay}
                        </option>
                      ))}
                    </select>
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
                    />
                  </div>
                </div>

                <div className="form-group text-center mt-2">
                  <button type="submit" className="btn btn-success">
                    Lưu
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
