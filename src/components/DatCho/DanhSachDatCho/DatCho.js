import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import css from "./DatCho.css";

const DatCho = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [adultsInfo, setAdultsInfo] = useState([
    JSON.parse(queryParams.get("adultsInfo")),
  ]);
  const [childrenInfo, setChildrenInfo] = useState([
    JSON.parse(queryParams.get("childrenInfo")),
  ]);
  const [babyInfo, setBabyInfo] = useState([
    JSON.parse(queryParams.get("babyInfo")),
  ]);
  const tiketType = JSON.parse(queryParams.get("tiketType"));
  const tiketTypeKhuHoi = JSON.parse(queryParams.get("tiketTypeKhuHoi"));
  const idChuyenBayDi = JSON.parse(queryParams.get("chuyenBay"));
  const idChuyenBayKhuHoi = JSON.parse(queryParams.get("chuyenBayKhuHoi"));
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
  const maxSeat = adultsInfo[0].length + childrenInfo[0].length;
  var gheDaChon = 0;
  var gheDaChonKhuHoi = 0;
  // Lấy danh sách ghế của chuyến bay và máy bay tương ứng
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

  //Tinh toan ghe da duoc chon 1 chieu
  seatList1Chieu &&
    seatList1Chieu.map((item) => {
      if (item.trangThai === "selected") {
        gheDaChon++;
      }
      return gheDaChon;
    });

  //Tinh toan ghe da duoc chon khu hoi
  seatListKhuHoi &&
    seatListKhuHoi.map((item) => {
      if (item.trangThai === "selected") {
        gheDaChonKhuHoi++;
      }
      return gheDaChonKhuHoi;
    });


  // Chon ghe 1 chieu
  const handleSeatClick = (seat) => {
    const index = selectedSeats.indexOf(seat.maDatCho);
    const seatType = seat.ghe.loaiGhe.tenLoaiGhe;
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

  // Chon ghe khu hoi
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

  //Ducnh66
  const isSeatSelected = (seat) => selectedSeats.includes(seat.maDatCho);
  const isSeatSelectedKhuHoi = (seat) =>
    selectedSeatsKhuHoi.includes(seat.maDatCho);

  //Ducnh66
  const handleClick = () => {
    if (selectedSeats.length === maxSeat) {
      const queryParams = new URLSearchParams();
      queryParams.set("adultsInfo", JSON.stringify(adultsInfo));
      queryParams.set("childrenInfo", JSON.stringify(childrenInfo));
      queryParams.set("babyInfo", JSON.stringify(babyInfo));
      queryParams.set("chuyenBay", JSON.stringify(idChuyenBayDi));
      queryParams.set("chuyenBayKhuHoi", JSON.stringify(idChuyenBayKhuHoi));
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

  //Ducnh66
  const handleClickKhuHoi = () => {
    if (selectedSeatsKhuHoi.length === maxSeat) {
      const queryParams = new URLSearchParams();
      queryParams.set("adultsInfo", JSON.stringify(adultsInfo));
      queryParams.set("childrenInfo", JSON.stringify(childrenInfo));
      queryParams.set("babyInfo", JSON.stringify(babyInfo));
      queryParams.set("chuyenBay", JSON.stringify(idChuyenBayDi));
      queryParams.set("chuyenBayKhuHoi", JSON.stringify(idChuyenBayKhuHoi));
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

  //Ducnh66
  const handleClickNext = () => {
    if (selectedSeats.length === maxSeat) {
      setHiddens(!hiddens);
      setHiddensKhuHoi(!hiddensKhuHoi);
    } else {
      toast.warning("Số lượng ghế bay đi chưa đủ");
    }
  };

  //Ducnh66
  const goBack = () => {
    window.location.reload();
  };
  console.log(tiketType);
  console.log(tiketTypeKhuHoi);
  return (
    <div className="container mt-3">
      {hiddens && (
        <div className="row">
          <h1>
            Chọn Ghế Bay Đi <span className="span"> *{maxSeat} Vé </span>
            {tiketType}
          </h1>
          <hr />
          <div className="col-3"></div>
          <div className="col-6 maybay  ">
            <div className="row p-3 ">
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
                      onClick={() => handleSeatClick(seat)}
                    ></i>
                    <div>
                      {/* <sub>{seat.ghe.tenGhe}</sub> */}
                      <sub>{seat.maDatCho}</sub>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-3">
            <div className="datcholeft">
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
                {setSeatList1Chieu && !seatListKhuHoi && (
                  <button className="btn  btn-success" onClick={handleClick}>
                    Thanh Toán
                  </button>
                )}
                {seatListKhuHoi && seatList1Chieu && (
                  <button
                    className="btn  btn-success"
                    onClick={handleClickNext}
                  >
                    Tiếp Tục
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {hiddensKhuHoi && (
        <div className="row">
          <h1>
            Chọn Ghế Bay Về <span className="span"> *{maxSeat} Vé </span>{" "}
            {tiketTypeKhuHoi}
          </h1>
          <hr />
          <div className="col-3"></div>
          <div className="col-6 maybay  ">
            <div className="row p-3 ">
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
                  ${isSeatSelectedKhuHoi(seat) ? "color" : ""}

                  `}
                      title={
                        seat.trangThai === "selected" ? "Ghế đã được đặt" : ""
                      }
                      onClick={() => handleSeatClickKhuHoi(seat)}
                    ></i>
                    <div>
                      {/* <sub>{seat.ghe.tenGhe}</sub> */}
                      <sub>{seat.maDatCho}</sub>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-3">
            <div className="datcholeft">
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
                <button className="btn  btn-success" onClick={goBack}>
                  Chọn Lại Ghế
                </button>{" "}
                <button
                  className="btn  btn-success"
                  onClick={handleClickKhuHoi}
                >
                  Thanh Toán
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatCho;
