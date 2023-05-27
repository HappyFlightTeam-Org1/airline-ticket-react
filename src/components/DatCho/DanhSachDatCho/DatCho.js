/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import css from "./DatCho.css";
import plane from "../../../Assets/planeDC.png";
import plane1 from "../../../Assets/plane1.png";

//Ducnh66 Chọn ghế cho hành khách

const DatCho = () => {
  // Ducnh66 Lấy data cho chọn ghế hành khách
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adultsInfo = JSON.parse(queryParams.get("adultsInfo"));
  const childrenInfo = JSON.parse(queryParams.get("childrenInfo"));
  const babyInfo = JSON.parse(queryParams.get("babyInfo"));
  const tiketType = queryParams.get("tiketType");
  const tiketTypeKhuHoi = queryParams.get("tiketTypeKhuHoi");
  const chuyenBay = JSON.parse(queryParams.get("chuyenBay"));
  const chuyenBayKhuHoi = JSON.parse(queryParams.get("chuyenBayKhuHoi"));
  const [seatList1Chieu, setSeatList1Chieu] = useState([]);
  const [seatListKhuHoi, setSeatListKhuHoi] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsKhuHoi, setSelectedSeatsKhuHoi] = useState([]);
  const [slghePhoThong, setSoLuongGhePT] = useState(0);
  const [slgheThuongGia, setSoLuongGheTG] = useState(0);
  const [slghePhoThongKhuHoi, setSoLuongGhePTKhuHoi] = useState(0);
  const [slgheThuongGiaKhuHoi, setSoLuongGheTGKhuHoi] = useState(0);
  const [hiddens, setHiddens] = useState(true);
  const [hiddensKhuHoi, setHiddensKhuHoi] = useState(false);
  const maxSeat = adultsInfo.length + childrenInfo.length;
  var gheDaChon = 0;
  var gheDaChonKhuHoi = 0;
  var idChuyenBayDi;
  var idChuyenBayKhuHoi;
  if (chuyenBay) {
    idChuyenBayDi = chuyenBay.maChuyenBay;
  }
  if (chuyenBayKhuHoi) {
    idChuyenBayKhuHoi = chuyenBayKhuHoi.maChuyenBay;
  }

  //DucNH66 Lấy danh sách ghế của chuyến bay và số lượng các loại ghế
  useEffect(() => {
    if (idChuyenBayDi) {
      axios
        .get("http://localhost:8080/dat-cho/list/" + idChuyenBayDi)
        .then((response) => {
          setSeatList1Chieu(response.data);
          setSoLuongGhePT(response.data[0].chuyenBay.mayBay.slghePhoThong);
          setSoLuongGheTG(response.data[0].chuyenBay.mayBay.slgheThuongGia);
          console.log(response.data);
        })
        .catch((err) => console.error);
    }

    if (idChuyenBayKhuHoi) {
      axios
        .get("http://localhost:8080/dat-cho/list/" + idChuyenBayKhuHoi)
        .then((response) => {
          setSeatListKhuHoi(response.data);
          setSoLuongGhePTKhuHoi(
            response.data[0].chuyenBay.mayBay.slghePhoThong
          );
          setSoLuongGheTGKhuHoi(
            response.data[0].chuyenBay.mayBay.slgheThuongGia
          );
          console.log(response.data);
        })
        .catch((err) => console.error);
    }
  }, [idChuyenBayDi, idChuyenBayKhuHoi]);
  console.log("list ghe 1 chieu: ", seatList1Chieu);
  console.log("list ghe khu hoi: ", seatListKhuHoi);

  //DucNH66 số lượng  ghế đã được chọn 1 chiều
  seatList1Chieu &&
    seatList1Chieu.map((item) => {
      if (item.trangThai === "selected") {
        gheDaChon++;
      }
      return gheDaChon;
    });

  //DucNH66 số lượng ghế đã được chọn khứ hồi
  seatListKhuHoi &&
    seatListKhuHoi.map((item) => {
      if (item.trangThai === "selected") {
        gheDaChonKhuHoi++;
      }
      return gheDaChonKhuHoi;
    });

  //DucNH66 Chọn ghế 1 chiều
  const handleSeatClick = (seat) => {
    const index = selectedSeats.indexOf(seat.maDatCho);
    const seatType = seat.ghe.loaiGhe.tenLoaiGhe;
    console.log(seatType);
    if (index === -1 && selectedSeats.length < maxSeat) {
      if (
        (seatType === "Thương Gia" && tiketType === "Thương Gia") ||
        (seatType === "Phổ Thông" && tiketType === "Phổ Thông")
      ) {
        setSelectedSeats([...selectedSeats, seat.maDatCho]);
      } else {
        toast.warning("Bạn chỉ được chọn loại ghế " + tiketType);
      }
    } else if (index !== -1) {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
    } else {
      toast.warning("Đã chọn đủ " + maxSeat + " ghế");
    }
  };

  //DucNH66 Chọn ghế nếu chuyến bay khứ hồi chiều
  const handleSeatClickKhuHoi = (seat) => {
    const index = selectedSeatsKhuHoi.indexOf(seat.maDatCho);
    const seatType = seat.ghe.loaiGhe.tenLoaiGhe;
    if (index === -1 && selectedSeatsKhuHoi.length < maxSeat) {
      if (
        (seatType === "Thương Gia" && tiketTypeKhuHoi === "Thương Gia") ||
        (seatType === "Phổ Thông" && tiketTypeKhuHoi === "Phổ Thông")
      ) {
        setSelectedSeatsKhuHoi([...selectedSeatsKhuHoi, seat.maDatCho]);
      } else {
        toast.warning("Bạn chỉ được chọn loại ghế " + tiketTypeKhuHoi);
      }
    } else if (index !== -1) {
      const updatedSeats = [...selectedSeatsKhuHoi];
      updatedSeats.splice(index, 1);
      setSelectedSeatsKhuHoi(updatedSeats);
    } else {
      toast.warning("Đã chọn đủ " + maxSeat + " ghế");
    }
  };

  //DucNH66 check ghế đã được chọn hay chưa(available/selected)
  const isSeatSelected = (seat) => selectedSeats.includes(seat.maDatCho);
  const isSeatSelectedKhuHoi = (seat) =>
    selectedSeatsKhuHoi.includes(seat.maDatCho);

  //Ducnh66 gởi dữ liệu đi nếu chuyến bay 1 chiều
  const handleClick = () => {
    if (selectedSeats.length === maxSeat) {
      const queryParams = new URLSearchParams();
      queryParams.set("adultsInfo", JSON.stringify(adultsInfo));
      queryParams.set("childrenInfo", JSON.stringify(childrenInfo));
      queryParams.set("babyInfo", JSON.stringify(babyInfo));
      queryParams.set("chuyenBay", JSON.stringify(chuyenBay));
      queryParams.set("chuyenBayKhuHoi", JSON.stringify(chuyenBayKhuHoi));
      queryParams.set("tiketType", tiketType);
      queryParams.set("tiketTypeKhuHoi", tiketTypeKhuHoi);
      queryParams.set("maDatCho", JSON.stringify(selectedSeats));
      queryParams.set("maDatChoKhuHoi", JSON.stringify(selectedSeatsKhuHoi));
      const queryString = queryParams.toString();
      navigate(`/ThanhToan?${queryString}`);
    } else {
      toast.warning("Vui lòng chọn đủ " + maxSeat + " ghế");
    }
  };

  //DucNH66 gởi dữ liệu đi nếu chuyến bay khứ hồi
  const handleClickKhuHoi = () => {
    if (selectedSeatsKhuHoi.length === maxSeat) {
      const queryParams = new URLSearchParams();
      queryParams.set("adultsInfo", JSON.stringify(adultsInfo));
      queryParams.set("childrenInfo", JSON.stringify(childrenInfo));
      queryParams.set("babyInfo", JSON.stringify(babyInfo));
      queryParams.set("chuyenBay", JSON.stringify(chuyenBay));
      queryParams.set("chuyenBayKhuHoi", JSON.stringify(chuyenBayKhuHoi));
      queryParams.set("tiketType", JSON.stringify(tiketType));
      queryParams.set("tiketTypeKhuHoi", JSON.stringify(tiketTypeKhuHoi));
      queryParams.set("maDatCho", JSON.stringify(selectedSeats));
      queryParams.set("maDatChoKhuHoi", JSON.stringify(selectedSeatsKhuHoi));
      const queryString = queryParams.toString();
      navigate(`/ThanhToan?${queryString}`);
    } else {
      toast.warning("Vui lòng chọn đủ " + maxSeat + " ghế");
    }
  };

  //DucNH66 ẩn hiện form chọn ghế nếu chuyến bay khứ hồi
  const handleClickNext = () => {
    if (selectedSeats.length === maxSeat) {
      setHiddens(!hiddens);
      setHiddensKhuHoi(!hiddensKhuHoi);
    } else {
      toast.warning("Số lượng ghế bay đi chưa đủ");
    }
  };

  //DucNH66 reload lại trang để chọn lại
  const goBack = () => {
    window.location.reload();
  };

  //DucNH66 LOG
  console.log("nguoi lon: ", adultsInfo);
  console.log("tre em: ", childrenInfo);
  console.log("em be: ", babyInfo);
  console.log("loai ve 1: ", tiketType);
  console.log("loai ve 2: ", tiketTypeKhuHoi);
  console.log("ma dat cho 1: ", selectedSeats);
  console.log("ma dat cho 2: ", selectedSeatsKhuHoi);
  console.log("Chuyen Bay Di: ", chuyenBay);
  console.log("Chuyen Bay Khu Hoi: ", chuyenBayKhuHoi);

  return (
    <div className="container mt-3">
      {/* DucNH66 Ghế chuyến bay đi */}
      {hiddens && (
        <div className="row">
          <h1>
            Chọn Ghế Bay Đi <span className="span"> *{maxSeat} Vé </span>
            {tiketType}
          </h1>
          <hr />
          <div data-aos="fade-up" className="col-4">
            <img src={plane1}></img>
          </div>
          <div data-aos="fade-up" className="col-4 maybay  ">
            <div className="row p-3 ">
              <div className="col-3 khoan d-flex justify-content-center">A</div>
              <div className="col-3 khoan d-flex justify-content-center">B</div>
              <div className="col-3 khoan d-flex justify-content-center">C</div>
              <div className="col-3 khoan d-flex justify-content-center">D</div>
              {seatList1Chieu &&
                seatList1Chieu.map((seat) => (
                  <div
                    key={seat.id}
                    className="col-3 d-flex justify-content-center"
                  >
                    <i
                      className={` fa-solid fa-couch  ${
                        seat.ghe.loaiGhe.tenLoaiGhe === "Thương Gia"
                          ? "thuong-gia"
                          : "pho-thong"
                      } ${seat.trangThai === "selected" ? "selected-seat" : ""}
                  ${isSeatSelected(seat) ? "color" : ""}

                  `}
                      title={
                        seat.trangThai === "selected" ? "Ghế đã được đặt" : ""
                      }
                      disabled={seat.trangThai === "selected"}
                      onClick={
                        seat.trangThai !== "selected"
                          ? () => handleSeatClick(seat)
                          : null
                      }
                    ></i>
                    <div>
                      <sub>{seat.ghe.tenGhe}</sub>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Ghi chú chuyến bay 1 chiều */}
          <div className="col-4">
            <div data-aos="fade-up" className="datcholeft">
              <div className="ghichu1">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  Ghế Thương Gia
                  <span className="span"> *{slgheThuongGia}</span>
                </h4>
              </div>
              <div className="ghichu2">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  Ghế Phổ Thông
                  <span className="span"> *{slghePhoThong}</span>
                </h4>
              </div>
              <div className="ghichu3 ">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  {" "}
                  Ghế Đã Được Đặt <span className="span"> *{gheDaChon}</span>
                </h4>
              </div>
              <div className="ghichu4 ">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  {" "}
                  Ghế Đang Chọn{" "}
                  <span className="span"> *{selectedSeats.length}</span>
                </h4>
              </div>

              <div className="ghichu5 ">
                {setSeatList1Chieu && seatListKhuHoi.length === 0 && (
                  <button className="btn  btn-success bg" onClick={handleClick}>
                    Thanh Toán
                  </button>
                )}
                {seatListKhuHoi.length > 0 && seatList1Chieu && (
                  <button
                    className="btn  btn-success bg"
                    onClick={handleClickNext}
                  >
                    Tiếp Tục
                  </button>
                )}
              </div>
              <img src={plane}></img>
            </div>
          </div>
        </div>
      )}

      {/* DucNH66 Ghế chuyến bay khứ hồi */}
      {hiddensKhuHoi && (
        <div className="row">
          <h1>
            Chọn Ghế Bay Về <span className="span"> *{maxSeat} Vé </span>{" "}
            {tiketTypeKhuHoi}
          </h1>
          <hr />
          <div data-aos="fade-up" className="col-4">
            <img src={plane1}></img>
          </div>
          <div data-aos="fade-up" className="col-4 maybay  ">
            <div className="row p-3 ">
              <div className="col-3 khoan d-flex justify-content-center">A</div>
              <div className="col-3 khoan d-flex justify-content-center">B</div>
              <div className="col-3 khoan d-flex justify-content-center">C</div>
              <div className="col-3 khoan d-flex justify-content-center">D</div>
              {seatListKhuHoi &&
                seatListKhuHoi.map((seat) => (
                  <div
                    key={seat.id}
                    className="col-3 d-flex justify-content-center"
                  >
                    <i
                      className={` fa-solid fa-couch  ${
                        seat.ghe.loaiGhe.tenLoaiGhe === "Thương Gia"
                          ? "thuong-gia"
                          : "pho-thong"
                      } ${seat.trangThai === "selected" ? "selected-seat" : ""}
                        } 
                  ${isSeatSelectedKhuHoi(seat) ? "color" : ""}
                  `}
                      title={
                        seat.trangThai === "selected" ? "Ghế đã được đặt" : ""
                      }
                      onClick={
                        seat.trangThai !== "selected"
                          ? () => handleSeatClickKhuHoi(seat)
                          : null
                      }
                    ></i>
                    <div>
                      <sub>{seat.ghe.tenGhe}</sub>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Ghi chú chuyến bay khứ hồi */}
          <div className="col-4">
            <div data-aos="fade-up" className="datcholeft">
              <div className="ghichu1">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  Ghế Thương Gia
                  <span className="span"> *{slgheThuongGiaKhuHoi}</span>
                </h4>
              </div>
              <div className="ghichu2">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  Ghế Phổ Thông
                  <span className="span"> *{slghePhoThongKhuHoi}</span>
                </h4>
              </div>
              <div className="ghichu3 ">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  {" "}
                  Ghế Đã Được Đặt{" "}
                  <span className="span"> *{gheDaChonKhuHoi}</span>
                </h4>
              </div>
              <div className="ghichu4 ">
                <i class="fa-solid fa-couch"></i>{" "}
                <h4>
                  {" "}
                  Ghế Đang Chọn{" "}
                  <span className="span"> *{selectedSeatsKhuHoi.length}</span>
                </h4>
              </div>
              <div className="ghichu5 ">
                <button className="btn  btn-success bg" onClick={goBack}>
                  Chọn Lại Ghế
                </button>{" "}
                <button
                  className="btn  btn-success bg"
                  onClick={handleClickKhuHoi}
                >
                  Thanh Toán
                </button>{" "}
              </div>
              <img src={plane}></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DatCho;
