/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
//DucNH66 check validate client
const checkForm = Yup.object().shape({
  maChuyenBay: Yup.string().required("Không được để trống!"),
  giaVe: Yup.number().required("Không được để trống!"),
  diemDi: Yup.string().required("Không được để trống!"),
  diemDen: Yup.string().required("Không được để trống!"),
  ngayKhoiHanh: Yup.string().required("Không được để trống!"),
  gioKhoiHanh: Yup.string().required("Không được để trống!"),
  gioHaCanh: Yup.string().required("Không được để trống!"),
  maMayBay: Yup.string().required("Không được để trống!"),
  maHangBay: Yup.string().required("Không được để trống!"),
  kLHanhLy: Yup.string().required("Không được để trống!"),
  trangThaiVanHanh: Yup.string().required("Không được để trống!"),
});
function ThemMoiChuyenBay() {
  //DucNH66 lấy  data
  const navigate = useNavigate();
  const [mayBays, setMayBays] = useState([]);
  const [sanBays, setSanBays] = useState([]);
  const [hangBays, setHangBays] = useState([]);
  const [formData, setFormData] = useState({});
  const [valid, setValid] = useState({});
  const red = { color: "red" };

  //DucNH66 Lấy data liên quan của chuyến bay
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

  // DucNH66 Nhận dữ liệu được nhập từ formData
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //DucNH66 tính thời gian bay
  useEffect(() => {
    if (formData.gioHaCanh && formData.gioKhoiHanh) {
      const gioKhoiHanh = new Date(`2000-01-01T${formData.gioKhoiHanh}`);
      const gioHaCanh = new Date(`2000-01-01T${formData.gioHaCanh}`);
      let thoiGianBay = gioHaCanh - gioKhoiHanh;
      //Nếu âm thì nhân thành dương để loại bỏ dấu -
      if (thoiGianBay < 0) {
        thoiGianBay *= -1;
      }
      const gio = Math.floor(thoiGianBay / 3600000);
      const phut = Math.floor((thoiGianBay % 3600000) / 60000);
      setFormData({ ...formData, thoiGianBay: `${gio} Giờ ${phut} Phút` });
    }
  }, [formData.gioHaCanh, formData.gioKhoiHanh]);

  //DucNH66 lưu vào db
  const handleSubmit = (event) => {
    event.preventDefault();
    checkForm
      .validate(formData, { abortEarly: false })
      .then(() => {
        axios
          .post("http://localhost:8080/chuyen-bay/save", formData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            toast.success("THÊM THÀNH CÔNG");
            navigate("/DanhSachChuyenBay");
          })
          .catch((err) => {
            console.log(err.response.data);
            if (err.response && err.response.data) {
              setValid(err.response.data);
            }
          });
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValid(errors);
      });
  };

  //DucNH66 trở lại trang danh sách
  const handleSubmitBack = (event) => {
    navigate("/DanhSachChuyenBay");
  };

  return (
    <div className="container mb-5 mt-10">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header  text-white bg">
              <h3> Thêm Mới Chuyến Bay</h3>
            </div>
            <div className="card-body">
              {/* DucNH66 form nhập thông tin  */}
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>
                      Mã chuyến bay
                      {valid.maChuyenBay && (
                        <span style={red}> {valid.maChuyenBay}</span>
                      )}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="maChuyenBay"
                      id="maChuyenBay"
                      value={formData.maChuyenBay}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>
                      Giá vé{" "}
                      {valid.giaVe && <span style={red}> {valid.giaVe}</span>}
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      name="giaVe"
                      id="giaVe"
                      value={formData.giaVe}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>
                      Sân bay đi{" "}
                      {valid.diemDi && <span style={red}>{valid.diemDi}</span>}
                    </label>
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
                  <div className="col-md-6">
                    <label>
                      Sân bay hạ cánh{" "}
                      {valid.diemDen && (
                        <span style={red}> {valid.diemDen}</span>
                      )}
                    </label>
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
                    <label>
                      Ngày khởi hành{" "}
                      {valid.ngayKhoiHanh && (
                        <span style={red}> {valid.ngayKhoiHanh}</span>
                      )}
                    </label>
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
                    <label>
                      Giờ khởi hành{" "}
                      {valid.gioKhoiHanh && (
                        <span style={red}> {valid.gioKhoiHanh}</span>
                      )}
                    </label>
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
                    <label>
                      Giờ hạ cánh{" "}
                      {valid.gioHaCanh && (
                        <span style={red}> {valid.gioHaCanh}</span>
                      )}
                    </label>
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
                    <label>Thời gian bay </label>
                    <input
                      type="text"
                      className="form-control"
                      name="thoiGianBay"
                      id="thoiGianBay"
                      value={formData.thoiGianBay}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>
                      Tên máy bay{" "}
                      {valid.maMayBay && (
                        <span style={red}> {valid.maMayBay}</span>
                      )}
                    </label>

                    <select
                      name="maMayBay"
                      id="maMayBay"
                      value={formData.maMayBay}
                      onChange={handleInputChange}
                      className="form-control "
                    >
                      <option value="">-- Chọn máy bay--</option>
                      {mayBays.map((mayBay) => (
                        <option key={mayBay.maMayBay} value={mayBay.maMayBay}>
                          {mayBay.tenMayBay}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>
                      Tên hãng bay{" "}
                      {valid.maHangBay && (
                        <span style={red}> {valid.maHangBay}</span>
                      )}
                    </label>
                    <select
                      name="maHangBay"
                      id="maHangBay"
                      value={formData.maHangBay}
                      onChange={handleInputChange}
                      className="form-control "
                    >
                      <option value="">-- Chọn hãng bay--</option>
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
                    <label>
                      Khối lượng hành lý{" "}
                      {valid.kLHanhLy && (
                        <span style={red}> {valid.kLHanhLy}</span>
                      )}
                    </label>
                    <select
                      id="kLHanhLy"
                      type="text"
                      className="form-control"
                      name="kLHanhLy"
                      value={formData.kLHanhLy}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Chọn hành lý --</option>
                      <option value="20kg"> 20 kg</option>
                      <option value="25kg"> 25 kg</option>
                      <option value="30kg"> 30 kg</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>
                      Trạng thái{" "}
                      {valid.trangThaiVanHanh && (
                        <span style={red}> {valid.trangThaiVanHanh}</span>
                      )}
                    </label>
                    <select
                      type="text"
                      className="form-control"
                      name="trangThaiVanHanh"
                      id="trangThaiVanHanh"
                      value={formData.trangThaiVanHanh}
                      onChange={handleInputChange}
                    >
                      <option value={""}>Chọn</option>
                      <option value={"Sẵn Sàng"}>Sẵn Sàng</option>
                    </select>
                  </div>
                </div>

                <div className="form-group text-center mt-2">
                  <button
                    type="submit"
                    className="btn btn-success bg"
                    onClick={handleSubmitBack}
                  >
                    Trở Về
                  </button>
                  <button type="submit" className="btn btn-success bg">
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
export default ThemMoiChuyenBay;
