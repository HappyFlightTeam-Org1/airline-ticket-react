/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import css from "../../styles/VeMayBayCSS/ThongTinKhachHangDatVe.css";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
const hanhKhachSchema = Yup.object().shape({
  tenHanhKhach: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Chỉ được nhập chữ cái không dấu!")
    .required("Không để trống!"),
  ngaySinh: Yup.string().required("Không để trống!"),
  gioiTinh: Yup.string().required("Không để trống!"),
});

const ThongTinKhachHangDatVe = () => {
  //DucNH66 lấy data
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const soNguoiLon = queryParams.get("soNguoiLon") ?? "null";
  const soTreEm = queryParams.get("soTreEm") ?? "null";
  const soEmBe = queryParams.get("soEmBe") ?? "null";
  const tiketType = queryParams.get("tiketType") ?? "null";
  const tiketTypeKhuHoi = queryParams.get("tiketTypeKhuHoi") ?? "null";
  const chuyenBay =
    queryParams.get("chuyenBay") === "undefined"
      ? null
      : JSON.parse(queryParams.get("chuyenBay"));
  const chuyenBayKhuHoi =
    queryParams.get("chuyenBayKhuHoi") === "undefined"
      ? null
      : JSON.parse(queryParams.get("chuyenBayKhuHoi"));
  const [adultsInfo, setAdultsInfo] = useState([]);
  const [childrenInfo, setChildrenInfo] = useState([]);
  const [babyInfo, setBabyInfo] = useState([]);
  const [errors, setErrors] = useState({});

  //Ducnh66 số người lớn
  useEffect(() => {
    const adults = [];
    for (let i = 0; i < soNguoiLon; i++) {
      adults.push({
        tenHanhKhach: "",
        ngaySinh: "",
        gioiTinh: "",
        loaiHanhKhach: "Người Lớn",
      });
    }
    setAdultsInfo(adults);
  }, [soNguoiLon]);
  //Ducnh66 số trẻ em
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
  //Ducnh66 số em bé
  useEffect(() => {
    const babies = [];
    for (let i = 0; i < soEmBe; i++) {
      babies.push({
        tenHanhKhach: "",
        ngaySinh: "",
        gioiTinh: "",
        loaiHanhKhach: "Em Bé",
      });
    }
    setBabyInfo(babies);
  }, [soEmBe]);

  //DucNH66 nhận dữ liệu từ form người lớn
  const handleAdultInfoChange = (event, index) => {
    const newAdultsInfo = [...adultsInfo];
    newAdultsInfo[index][event.target.name] = event.target.value;
    setAdultsInfo(newAdultsInfo);
  };
  //DucNH66 nhận dữ liệu từ form trẻ em
  const handleChildrenInfoChange = (event, index) => {
    const newChildrenInfo = [...childrenInfo];
    newChildrenInfo[index][event.target.name] = event.target.value;
    setChildrenInfo(newChildrenInfo);
  };
  //DucNH66 nhận dữ liệu từ form em bé
  const handleBabyInfoChange = (event, index) => {
    const newBabyInfo = [...babyInfo];
    newBabyInfo[index][event.target.name] = event.target.value;
    setBabyInfo(newBabyInfo);
  };

  //DucNH66 gởi data sang trang đặt chỗ
  const handleSendData = () => {


    const hanhKhachs = [...adultsInfo, ...childrenInfo, ...babyInfo];
    // console.log("hanhKhachs", hanhKhachs);
    // axios.post("http://localhost:8080/hanh-khach/validate", hanhKhachs)
    //   .then((response) => {
    //     console.log("response validate", response);
    //   })
    //   .catch((error) => {
    //     console.error("error at function Validate", error);
    //   })
    Promise.all(
      hanhKhachs.map((hanhKhach) =>
        hanhKhachSchema.validate(hanhKhach, { abortEarly: false })
      )
    )
      .then(() => {
        const queryParams = new URLSearchParams();
        queryParams.set("adultsInfo", JSON.stringify(adultsInfo));
        queryParams.set("childrenInfo", JSON.stringify(childrenInfo));
        queryParams.set("babyInfo", JSON.stringify(babyInfo));
        queryParams.set("chuyenBay", JSON.stringify(chuyenBay));
        queryParams.set("chuyenBayKhuHoi", JSON.stringify(chuyenBayKhuHoi));
        queryParams.set("tiketType", tiketType);
        queryParams.set("tiketTypeKhuHoi", tiketTypeKhuHoi);
        const queryString = queryParams.toString();
        navigate(`/DatCho?${queryString}`);
      })
      .catch((error) => {
        if (error instanceof Yup.ValidationError) {
          const errorMessages = {};
          error.inner.forEach((err) => {
            errorMessages[err.path] = err.message;
          });
          setErrors(errorMessages);
        } else {
          console.error(error);
        }
      });
  };

  const convertBoardingTime = (fullBoaringTime) => {
    const boardingTime = fullBoaringTime.substr(0, 5);
    return boardingTime;
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container-fluid mt-10 mb-5">
      <div className="row justify-content-center mt-5">
        <div className="d-flex">
          <div className="col-6 m-3">
            <div>
              <div className="card">
                <div
                  className="card-header  text-white"
                  style={{
                    background:
                      "linear-gradient( to right,hsl(187, 85%, 43%),hsl(199, 100%, 33%)",
                  }}
                >
                  <h3> Thông Tin Hành Khách</h3>
                </div>
                <div className="card-body">
                  {/* form nhập thông tin khách hàng */}
                  <form>
                    <div className="form-group row form-tong">
                      {adultsInfo.map((adult, index) => (
                        <div
                          key={`adult${index + 1}`}
                          className="col-md-4 form-input-data "
                        >
                          <strong> Người Lớn {index + 1}</strong>
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
                                Chọn giới tính
                              </option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                            </select>
                            {errors.gioiTinh && (
                              <p className="error-message">{errors.gioiTinh}</p>
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
                                Chọn giới tính
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
                                Chọn giới tính
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
                      <a className="btn btn-success bg" onClick={goBack}>
                        Trở Lại
                      </a>
                      <a
                        className="btn btn-success bg"
                        onClick={handleSendData}
                      >
                        Tiếp Tục
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* form thông tin chuyến bay  */}
          <div>
            <div className="m-3">
              <strong>
                {chuyenBayKhuHoi && chuyenBay && (
                  <span>
                    {" "}
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
                    {chuyenBay.diemDi}{" "}
                    <span style={{ color: "#3498db" }}>⇄ </span>{" "}
                    {chuyenBay.diemDen}
                  </span>
                )}
              </strong>

              {chuyenBay && !chuyenBayKhuHoi && (
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
                  {chuyenBay.diemDi}{" "}
                  <span style={{ color: "#3498db" }}>⇉ </span>
                  {chuyenBay.diemDen}
                </strong>
              )}
            </div>

            {/* Chuyến bay đi */}
            {chuyenBay && (
              <div className="m-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body box-shadow-tt-ve ">
                        <div className="row">
                          {chuyenBay && !chuyenBayKhuHoi ? (
                            <strong className="d-flex justify-content-between">
                              Ngày Khởi Hành• {chuyenBay.ngayKhoiHanh}{" "}
                              <img
                                style={{ height: "25px", width: "auto" }}
                                src={chuyenBay.hangBay.logoURL}
                              />
                            </strong>
                          ) : (
                            <strong className="d-flex justify-content-between">
                              Chuyến bay đi • {chuyenBay.ngayKhoiHanh}
                              <img
                                style={{ height: "25px", width: "auto" }}
                                src={chuyenBay.hangBay.logoURL}
                              />
                            </strong>
                          )}

                          <div style={{ height: "10px" }}></div>
                          <div className="col-md-6">
                            <p>
                              <strong>Điểm đi : {chuyenBay.diemDi} </strong>
                            </p>
                            <p>
                              <strong>
                                Giờ cất cạnh :{" "}
                                {convertBoardingTime(chuyenBay.gioKhoiHanh)}
                              </strong>{" "}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>
                                Sân bay đến : {chuyenBay.diemDen}{" "}
                              </strong>
                            </p>
                            <p>
                              <strong>
                                Giờ hạ cánh :{" "}
                                {convertBoardingTime(chuyenBay.gioHaCanh)}{" "}
                              </strong>
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
            {chuyenBayKhuHoi && (
              <div className="m-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body box-shadow-tt-ve ">
                        <div className="row">
                          <strong className="d-flex justify-content-between">
                            Chuyến bay về • {chuyenBayKhuHoi.ngayKhoiHanh}
                            <img
                              style={{ height: "25px", width: "auto" }}
                              src={chuyenBayKhuHoi.hangBay.logoURL}
                            />
                          </strong>
                          <div style={{ height: "10px" }}></div>
                          <div className="col-md-6">
                            <p>
                              <strong>
                                Điểm đi : {chuyenBayKhuHoi.diemDi}{" "}
                              </strong>
                            </p>
                            <p>
                              <strong>
                                Giờ cất cánh :{" "}
                                {convertBoardingTime(
                                  chuyenBayKhuHoi.gioKhoiHanh
                                )}{" "}
                              </strong>
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>
                                Điểm đến : {chuyenBayKhuHoi.diemDen}{" "}
                              </strong>
                            </p>
                            <p>
                              <strong>
                                Giờ hạ cánh :{" "}
                                {convertBoardingTime(chuyenBayKhuHoi.gioHaCanh)}{" "}
                              </strong>
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
        </div>
      </div>
    </div>
  );
};
export default ThongTinKhachHangDatVe;
