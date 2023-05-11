import React, { useState } from "react";
import axios from "axios";

const BookingForm = () => {
  const [adultsInfo, setAdultsInfo] = useState([]);
  const [childrenInfo, setChildrenInfo] = useState([]);
  const [babyInfo, setBabyInfo] = useState([]);
  const handleAdultCountChange = (event) => {
    const adults = [];
    for (let i = 0; i < event.target.value; i++) {
      adults.push({ name: "", birthDay: "", gender: "", idCard: "" });
    }
    setAdultsInfo(adults);
  };

  const handleChildrenCountChange = (event) => {
    const children = [];
    for (let i = 0; i < event.target.value; i++) {
      children.push({ name: "", birthDay: "", gender: "" });
    }
    setChildrenInfo(children);
  };

  const handleBabyCountChange = (event) => {
    const babies = [];
    for (let i = 0; i < event.target.value; i++) {
      babies.push({ name: "", birthDay: "", gender: "" });
    }
    setBabyInfo(babies);
  };

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
    const dataToSave = {
      adultsInfo,
      childrenInfo,
      babyInfo,
    };
    localStorage.setItem("myData", JSON.stringify(dataToSave));
    const listCustomer = localStorage.getItem("myData");
    console.log(listCustomer);
    try {
      const response = await axios.post("/api/bookings", {
        listCustomer,
      });
      console.log(response.data);
      alert("Đặt vé thành công!");
    } catch (error) {
      console.log(error);
      alert("Đặt vé thất bại!");
    }
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
                <div className="card-header  text-white">
                  <h3> Thông Tin Hành Khách</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* Tạm Thời Tí Xoá */}
                    <div className="form-group row">
                      <div className="col-md-4">
                        <label for="adults">Người lớn (trên =12 tuổi)</label>
                        <input
                          id="adults"
                          type="number"
                          name="adults"
                          className="form-control"
                          onChange={handleAdultCountChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label for="children">Trẻ em (dưới 12 tuổi)</label>
                        <input
                          id="children"
                          type="number"
                          className="form-control"
                          name="children"
                          onChange={handleChildrenCountChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label for="infants">Em bé (dưới 24 tháng)</label>
                        <input
                          id="baby"
                          type="number"
                          className="form-control"
                          name="baby"
                          onChange={handleBabyCountChange}
                        />
                      </div>
                    </div>

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
                              name="name"
                              value={adult.name}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            />
                          </div>
                          <div>
                            <label>Ngày sinh:</label>
                            <input
                              className="form-control mb-1"
                              type="date"
                              name="birthDay"
                              value={adult.birthDay}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            />
                          </div>
                          <div>
                            <label>Giới tính:</label>
                            <select
                              className="form-control mb-1"
                              name="gender"
                              value={adult.gender}
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
                          </div>
                          <div>
                            <label>Số CMND/CCCD:</label>
                            <input
                              className="form-control mb-1"
                              type="text"
                              name="idCard"
                              value={adult.idCard}
                              onChange={(event) =>
                                handleAdultInfoChange(event, index)
                              }
                            />
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
                              name="name"
                              value={children.name}
                              onChange={(event) =>
                                handleChildrenInfoChange(event, index)
                              }
                            />
                          </div>
                          <div>
                            <label>Ngày sinh:</label>
                            <input
                              className="form-control mb-1"
                              type="date"
                              name="birthDay"
                              value={children.birthDay}
                              onChange={(event) =>
                                handleChildrenInfoChange(event, index)
                              }
                            />
                          </div>
                          <div>
                            <label>Giới tính:</label>
                            <select
                              className="form-control mb-1"
                              name="gender"
                              value={children.gender}
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
                              name="name"
                              value={baby.name}
                              onChange={(event) =>
                                handleBabyInfoChange(event, index)
                              }
                            />
                          </div>
                          <div>
                            <label>Ngày sinh:</label>
                            <input
                              className="form-control mb-1"
                              type="date"
                              name="birthDay"
                              value={baby.birthDay}
                              onChange={(event) =>
                                handleBabyInfoChange(event, index)
                              }
                            />
                          </div>
                          <div>
                            <label>Giới tính:</label>
                            <select
                              className="form-control mb-1"
                              name="gender"
                              value={baby.gender}
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
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="form-group text-center mt-2">
                      <button type="submit" className="btn btn-success">
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
                TP HCM ⇄ Đà Nẵng
              </strong>
            </div>
            {/* Chuyến bay đi */}
            <div className="m-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body box-shadow-tt-ve">
                      <div className="row">
                        <b>Chuyến bay đi • Wed, 10 May 2023</b>
                        <div style={{ height: "10px" }}></div>
                        <div className="col-md-6">
                          <p>
                            <strong>Sân bay đi:</strong> Nội Bài
                          </p>
                          <p>
                            <strong>Thời gian bay:</strong> 1 tiếng 15 phút
                          </p>
                          <p>
                            <strong>Loại máy bay:</strong> Airbus A359
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Sân bay đến:</strong> Tân Sơn Nhất
                          </p>
                          <p>
                            <strong>Số chuyến bay:</strong> VN 1346
                          </p>
                          <p>
                            <strong>Hãng hàng không:</strong> Vietnam Airlines
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* chuyến bay về */}
            <div className="m-3">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body box-shadow-tt-ve">
                      <div className="row">
                        <b>Chuyến bay về • Thu, 11 May 2023</b>
                        <div style={{ height: "10px" }}></div>
                        <div className="col-md-6">
                          <p>
                            <strong>Sân bay đi:</strong> Tân Sơn Nhất
                          </p>
                          <p>
                            <strong>Thời gian bay:</strong> 1 tiếng 15 phút
                          </p>
                          <p>
                            <strong>Loại máy bay:</strong> Airbus A359
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Sân bay đến:</strong> Nội Bài
                          </p>

                          <p>
                            <strong>Số chuyến bay:</strong> VN 1400
                          </p>
                          <p>
                            <strong>Hãng hàng không:</strong> Vietnam Airlines
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};
export default BookingForm;
