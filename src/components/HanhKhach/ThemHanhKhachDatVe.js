import React, { useState, useEffect } from "react";
import css from "../../styles/VeMayBayCSS/ThongTinKhachHangDatVe.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const hanhKhachSchema = Yup.object().shape({
  tenHanhKhach: Yup.string().required("Vui lòng nhập tên hành khách"),
  gioiTinh: Yup.string().required("Vui lòng chọn giới tính"),
});

const ThongTinKhachHangDatVe = () => {
  const [adultsInfo, setAdultsInfo] = useState([]);
  const [childrenInfo, setChildrenInfo] = useState([]);
  const [babyInfo, setBabyInfo] = useState([]);
  const [chuyenBay, setChuyenBay] = useState();
  const [chuyenBayKhuHoi, setChuyenBayKhuHoi] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const soNguoiLon = queryParams.get("soNguoiLon");
  const soTreEm = queryParams.get("soTreEm");
  const soEmBe = queryParams.get("soEmBe");
  const idChuyenBayDi = queryParams.get("idChuyenBayDi");
  const idChuyenBayKhuHoi = queryParams.get("idChuyenBayKhuHoi");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (idChuyenBayDi) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + idChuyenBayDi)
        .then((response) => {
          setChuyenBay(response.data);
        });
    }

    if (idChuyenBayKhuHoi) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + idChuyenBayKhuHoi)
        .then((response) => {
          setChuyenBayKhuHoi(response.data);
        });
    }
  }, [idChuyenBayDi, idChuyenBayKhuHoi]);

  useEffect(() => {
    const adults = [];
    for (let i = 0; i < soNguoiLon; i++) {
      adults.push({
        tenHanhKhach: "",
        ngaySinh: "",
        gioiTinh: "",
        hoChieu: "",
        soDienThoai: "",
        loaiHanhKhach: "Người Lớn",
      });
    }
    setAdultsInfo(adults);
  }, [soNguoiLon]);

  useEffect(() => {
    const children = [];
    for (let i = 0; i < soTreEm; i++) {
      children.push({
        tenHanhKhach: "",
        ngaySinh: "",
        gioiTinh: "",
        loaiHanhKhach: "Trẻ Em",
      });
    }
    setChildrenInfo(children);
  }, [soTreEm]);

  useEffect(() => {
    const babies = [];
    for (let i = 0; i < soEmBe; i++) {
      babies.push({
        tenHanhKhach: "",
        ngaySinh: "",
        gioiTinh: "",
        loaiHanhKhach: "Em bé",
      });
    }
    setBabyInfo(babies);
  }, [soEmBe]);

  const handleAdultInfoChange = (event, index) => {
    const newAdultsInfo = [...adultsInfo];
    newAdultsInfo[index][event.target.name] = event.target.value;
    setAdultsInfo(newAdultsInfo);
  };

  const handleChildrenInfoChange = (event, index) => {
    const newChildrenInfo = [...childrenInfo];
    newChildrenInfo[index][event.target.name] = event.target.value;
    setChildrenInfo(newChildrenInfo);
  };

  const handleBabyInfoChange = (event, index) => {
    const newBabyInfo = [...babyInfo];
    newBabyInfo[index][event.target.name] = event.target.value;
    setBabyInfo(newBabyInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hanhKhachs = [...adultsInfo, ...childrenInfo, ...babyInfo].map(
      (hanhKhach) => {
        return {
          ...hanhKhach,
          // loaiHanhKhach: getCustomerType(hanhKhach),
        };
      }
    );
    try {
      const validatedHanhKhachs = await Promise.all(
        hanhKhachs.map((hanhKhach) =>
          hanhKhachSchema.validate(hanhKhach, { abortEarly: false })
        )
      );
      await axios.post(
        "http://localhost:8080/hanh-khach/save",
        validatedHanhKhachs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Thành công!");
      navigate("/DanhSachKhachHangDatVe");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        setErrors(errorMessages);
      } else {
        console.error(error);
        alert("Đặt vé thất bại!");
      }
    }
  };

  // const getCustomerType = (hanhKhach) => {
  //   if (adultsInfo.includes(hanhKhach)) {
  //     return "Người Lớn";
  //   } else if (childrenInfo.includes(hanhKhach)) {
  //     return "Trẻ Em";
  //   } else {
  //     return "Em Bé";
  //   }
  // };

  const handleClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("adultsInfo", JSON.stringify(adultsInfo));
    queryParams.set("childrenInfo", JSON.stringify(childrenInfo));
    queryParams.set("babyInfo", JSON.stringify(babyInfo));
    queryParams.set("chuyenBay", JSON.stringify(chuyenBay));
    queryParams.set("chuyenBayKhuHoi", JSON.stringify(chuyenBayKhuHoi));
    const queryString = queryParams.toString();
    navigate(`/ThanhToan?${queryString}`);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="d-flex">
          <div className="col-1"></div>
          {/* form nhập thông tin khách hàng */}
          <div className="col-6 m-3">
            <div>
              <div className="card">
                <div
                  className="card-header  text-white"
                  style={{ backgroundColor: "orange" }}
                >
                  <h3> Thông Tin Hành Khách</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row form-tong">
                      {adultsInfo.map((adult, index) => (
                        <div
                          key={`adult${index + 1}`}
                          className="col-md-4 form-input-data "
                        >
                          <strong> Nguời Lớn {index + 1}</strong>
                          <div>
                            <label>Họ tên:</label>
                            <input
                              className="form-control mb-1"
                              type="text"
                              name="tenHanhKhach"
                              value={adult.tenHanhKhach}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            />
                            {errors.tenHanhKhach && (
                              <p className="error-message ">
                                {errors.tenHanhKhach}
                              </p>
                            )}
                          </div>
                          <div>
                            <label>Ngày sinh:</label>
                            <input
                              className="form-control mb-1"
                              type="date"
                              name="ngaySinh"
                              value={adult.ngaySinh}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            />
                            {errors.ngaySinh && (
                              <p className="error-message">{errors.ngaySinh}</p>
                            )}
                          </div>
                          <div>
                            <label>Giới tính:</label>
                            <select
                              className="form-control mb-1"
                              name="gioiTinh"
                              value={adult.gioiTinh}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            >
                              <option value="" selected>
                                Chọn Gới Tính
                              </option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </select>
                            {errors.gioiTinh && (
                              <p className="error-message">{errors.gioiTinh}</p>
                            )}
                          </div>
                          <div>
                            <label>Số CMND/CCCD:</label>
                            <input
                              className="form-control mb-1"
                              type="text"
                              name="hoChieu"
                              value={adult.hoChieu}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            />
                            {errors.hoChieu && (
                              <p className="error-message ">{errors.hoChieu}</p>
                            )}
                          </div>
                          <div>
                            <label>Số ĐT:</label>
                            <input
                              className="form-control mb-1"
                              type="text"
                              name="soDienThoai"
                              value={adult.soDienThoai}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            />
                            {errors.soDienThoai && (
                              <p className="error-message ">
                                {errors.soDienThoai}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      {childrenInfo.map((children, index) => (
                        <div
                          key={`children${index + 1}`}
                          className="col-md-4 form-input-data "
                        >
                          <strong> Trẻ em {index + 1}</strong>
                          <div>
                            <label>Họ tên:</label>
                            <input
                              className="form-control mb-1"
                              type="text"
                              name="tenHanhKhach"
                              value={children.tenHanhKhach}
                              onChange={(event) =>
                                handleChildrenInfoChange(event, index)
                              }
                            />
                            {errors.tenHanhKhach && (
                              <p className="error-message ">
                                {errors.tenHanhKhach}
                              </p>
                            )}
                          </div>
                          <div>
                            <label>Ngày sinh:</label>
                            <input
                              className="form-control mb-1"
                              type="date"
                              name="ngaySinh"
                              value={children.ngaySinh}
                              onChange={(event) =>
                                handleChildrenInfoChange(event, index)
                              }
                            />
                            {errors.ngaySinh && (
                              <p className="error-message ">
                                {errors.ngaySinh}
                              </p>
                            )}
                          </div>
                          <div>
                            <label>Giới tính:</label>
                            <select
                              className="form-control mb-1"
                              name="gioiTinh"
                              value={children.gioiTinh}
                              onChange={(event) =>
                                handleChildrenInfoChange(event, index)
                              }
                            >
                              <option value="" selected>
                                Chọn Gới Tính
                              </option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </select>
                            {errors.gioiTinh && (
                              <p className="error-message ">
                                {errors.gioiTinh}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      {babyInfo.map((baby, index) => (
                        <div
                          key={`baby${index + 1}`}
                          className="col-md-4 form-input-data "
                        >
                          <strong> Em bé {index + 1}</strong>
                          <div>
                            <label>Họ tên:</label>
                            <input
                              className="form-control mb-1"
                              type="text"
                              name="tenHanhKhach"
                              value={baby.tenHanhKhach}
                              onChange={(event) =>
                                handleBabyInfoChange(event, index)
                              }
                            />
                            {errors.tenHanhKhach && (
                              <p className="error-message ">
                                {errors.tenHanhKhach}
                              </p>
                            )}
                          </div>
                          <div>
                            <label>Ngày sinh:</label>
                            <input
                              className="form-control mb-1"
                              type="date"
                              name="ngaySinh"
                              value={baby.ngaySinh}
                              onChange={(event) =>
                                handleBabyInfoChange(event, index)
                              }
                            />
                            {errors.ngaySinh && (
                              <p className="error-message ">
                                {errors.ngaySinh}
                              </p>
                            )}
                          </div>
                          <div>
                            <label>Giới tính:</label>
                            <select
                              className="form-control mb-1"
                              name="gioiTinh"
                              value={baby.gioiTinh}
                              onChange={(event) =>
                                handleBabyInfoChange(event, index)
                              }
                            >
                              <option value="" selected>
                                Chọn Gới Tính
                              </option>
                              <option value="Em Bé Nam">Em Bé Nam</option>
                              <option value="Em Bé Nữ">Em Bé Nữ</option>
                            </select>
                            {errors.gioiTinh && (
                              <p className="error-message ">
                                {errors.gioiTinh}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="form-group text-center mt-2">
                      <button
                        type="submit"
                        className="btn btn-success"
                        onClick={handleClick}
                      >
                        Tiếp Tục
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* form thông tin chuyến bay  */}
          <div className="col-4">
            <div className="m-3">
              <strong>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-airplane-engines"
                  viewBox="0 0 16 16"
                  color="#0099ff"
                >
                  <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z" />
                </svg>
                {chuyenBayKhuHoi != null && chuyenBay != null && (
                  <span>
                    {chuyenBay.diemDi} ⇄ {chuyenBay.diemDen}
                  </span>
                )}
              </strong>

              {chuyenBay != null && chuyenBayKhuHoi === null && (
                <strong>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-airplane-engines"
                    viewBox="0 0 16 16"
                    color="#0099ff"
                  >
                    <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z" />
                  </svg>
                  {chuyenBay.diemDi}
                </strong>
              )}
              {chuyenBayKhuHoi != null && chuyenBay === null && (
                <strong>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-airplane-engines"
                    viewBox="0 0 16 16"
                    color="#0099ff"
                  >
                    <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z" />
                  </svg>
                  {chuyenBayKhuHoi.diemDi}
                </strong>
              )}
            </div>

            {/* Chuyến bay đi */}
            {chuyenBay != null && (
              <div className="m-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body box-shadow-tt-ve">
                        <div className="row">
                          <b>Chuyến bay đi • {chuyenBay.ngayKhoiHanh}</b>
                          <div style={{ height: "10px" }}></div>
                          <div className="col-md-6">
                            <p>
                              <strong>Sân bay đi:</strong> {chuyenBay.diemDi}
                            </p>
                            <p>
                              <strong>Giờ cất cạnh</strong>{" "}
                              {chuyenBay.gioKhoiHanh}
                            </p>
                            <p>
                              <strong>Thời gian bay:</strong>
                              {chuyenBay.thoiGianBay}
                            </p>
                            <p>
                              <strong>Thời gian bay:</strong>
                              {chuyenBay.hangBay.tenHangBay}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Sân bay đến:</strong> {chuyenBay.diemDen}
                            </p>
                            <p>
                              <strong>Giờ hạ cánh:</strong>
                              {chuyenBay.gioHaCanh}
                            </p>
                            <p>
                              <strong>Khối lượng hành lý:</strong>
                              {chuyenBay.klhanhLy}
                            </p>
                            <p>
                              <strong>Máy bay:</strong>
                              {chuyenBay.mayBay.tenMayBay}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* chuyến bay về */}
            {chuyenBayKhuHoi != null && (
              <div className="m-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body box-shadow-tt-ve">
                        <div className="row">
                          <b>Chuyến bay về • {chuyenBayKhuHoi.ngayKhoiHanh}</b>
                          <div style={{ height: "10px" }}></div>
                          <div className="col-md-6">
                            <p>
                              <strong>Sân bay đi:</strong>
                              {chuyenBayKhuHoi.diemDi}
                            </p>
                            <p>
                              <strong>Giờ cất cánh:</strong>
                              {chuyenBayKhuHoi.gioKhoiHanh}
                            </p>
                            <p>
                              <strong>Thời gian bay:</strong>
                              {chuyenBayKhuHoi.thoiGianBay}
                            </p>
                            <p>
                              <strong> Hãng bay:</strong>
                              {chuyenBayKhuHoi.hangBay.tenHangBay}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Sân bay đến:</strong>
                              {chuyenBayKhuHoi.diemDen}
                            </p>
                            <p>
                              <strong>Giờ hạ cánh:</strong>
                              {chuyenBayKhuHoi.gioHaCanh}
                            </p>
                            <p>
                              <strong>Khối lượng hành lý:</strong>
                              {chuyenBayKhuHoi.klhanhLy}
                            </p>
                            <p>
                              <strong>Máy bay:</strong>
                              {chuyenBayKhuHoi.mayBay.tenMayBay}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};
export default ThongTinKhachHangDatVe;
