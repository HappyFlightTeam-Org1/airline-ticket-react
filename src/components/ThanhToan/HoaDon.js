import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./HoaDon.css";
import axios from "axios";
function HoaDon() {
  //DucNH66 Lấy dữ liệu từ đặt chỗ gởi qua
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [adultsInfo] = useState([JSON.parse(queryParams.get("adultsInfo"))]);
  const [childrenInfo] = useState([
    JSON.parse(queryParams.get("childrenInfo")),
  ]);
  const [babyInfo] = useState([JSON.parse(queryParams.get("babyInfo"))]);
  const [maDatCho] = JSON.parse(queryParams.get("maDatCho"));
  const [maDatChoKhuHoi] = JSON.parse(queryParams.get("maDatChoKhuHoi"));
  const idChuyenBayDi = JSON.parse(queryParams.get("idChuyenBayDi"));
  const idChuyenBayKhuHoi = JSON.parse(queryParams.get("idChuyenBayKhuHoi"));
  const tiketType = JSON.parse(queryParams.get("tiketType"));
  const tiketTypeKhuHoi = JSON.parse(queryParams.get("tiketTypeKhuHoi"));

  //UseState Thông tin của chuyến bay được chọn
  const [chuyenBay, setChuyenBay] = useState();
  const [chuyenBayKhuHoi, setChuyenBayKhuHoi] = useState();

  //DucNH66 Lấy thông tin chuyến bay được chọn
  useEffect(() => {
    if (idChuyenBayDi) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + idChuyenBayDi)
        .then((response) => {
          setChuyenBay(response.data);
          console.log(response.data, " RESPONSE 1 chiều");
        });
    }

    if (idChuyenBayKhuHoi) {
      axios
        .get("http://localhost:8080/chuyen-bay/findById/" + idChuyenBayKhuHoi)
        .then((response) => {
          console.log(response.data, " RESPONSE khứ hồi");
          setChuyenBayKhuHoi(response.data);
        });
    }
  }, [idChuyenBayDi, idChuyenBayKhuHoi]);

  //lấy list hanhKhachDTO từ component nhập thông tin
  const hanhKhachs = [...adultsInfo[0], ...childrenInfo[0], ...babyInfo[0]].map(
    (hanhKhach) => {
      return {
        ...hanhKhach,
      };
    }
  );

  console.log("hanhKhachs", hanhKhachs);

  //hàm format tiền
  const CurrencyFormat = (money) => {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);

    return formattedValue;
  };

  //hàm tính tổng tiền
  const getTotal = () => {
    let total = 0;
    if (chuyenBay != null) {
      total +=
        adultsInfo[0] != null ? adultsInfo[0].length * chuyenBay.giaVe : 0;
      total +=
        childrenInfo[0] != null ? childrenInfo[0].length * chuyenBay.giaVe : 0;
      total += babyInfo[0] != null ? babyInfo[0].length * chuyenBay.giaVe : 0;
    }
    if (chuyenBayKhuHoi != null) {
      total +=
        adultsInfo[0] != null
          ? adultsInfo[0].length * chuyenBayKhuHoi.giaVe
          : 0;
      total +=
        childrenInfo[0] != null
          ? childrenInfo[0].length * chuyenBayKhuHoi.giaVe
          : 0;
      total +=
        babyInfo[0] != null ? babyInfo[0].length * chuyenBayKhuHoi.giaVe : 0;
    }
    return total;
  };

  const total = CurrencyFormat(getTotal());
  console.log("chuyenbay di", chuyenBay);
  console.log("chuyenbay khu hoi", chuyenBayKhuHoi);
  console.log(adultsInfo);
  console.log(childrenInfo);
  console.log(babyInfo);
  console.log(idChuyenBayDi);
  console.log(idChuyenBayKhuHoi);
  console.log(tiketType);
  console.log(tiketTypeKhuHoi);
  console.log(maDatCho);
  console.log(maDatChoKhuHoi);

  //ngày tạo hóa đơn
  const [createDate, setCreateDate] = useState();

  //hàm lấy tổng tiền
  const getOrderCode = () => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, "0"); // Chèn số 0 vào trước nếu tháng chỉ có 1 chữ số
    const day = String(currentTime.getDate()).padStart(2, "0"); // Chèn số 0 vào trước nếu ngày chỉ có 1 chữ số
    const hours = String(currentTime.getHours()).padStart(2, "0"); // Chèn số 0 vào trước nếu giờ chỉ có 1 chữ số
    const minutes = String(currentTime.getMinutes()).padStart(2, "0"); // Chèn số 0 vào trước nếu phút chỉ có 1 chữ số
    const seconds = String(currentTime.getSeconds()).padStart(2, "0"); // Chèn số 0 vào trước nếu giây chỉ có 1 chữ số
    const orderCode = `OD${year}${month}${day}${hours}${minutes}${seconds}`;
    const createOrderDate = year + "-" + month + "-" + day;
    setCreateDate(createOrderDate);
    return orderCode;
  };

  //mã hóa đơn
  const [orderCode, setOrderCode] = useState(getOrderCode);

  //tổng tiền
  const [amount, setAmount] = useState(getTotal);

  //hoaDonDTO
  const hoaDonDTO = {
    maHoaDon: orderCode,
    ngayTao: createDate,
    tongTien: amount,
    trangThaiThanhToan: 0,
    trangThaiXoa: 0,
    emailNguoiDung: "user@example.com",
  };

  //maDatChos
  const datChos = [28, 29, 36, 37];

  const veMayBayDTO = {
    hoaDonDTO: hoaDonDTO,
    hanhKhachDTOs: hanhKhachs,
    maDatChos: datChos,
  };

  const handleSubmit = async (event) => {
    console.log("veMayBayDTO", veMayBayDTO);
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/thanh-toan/vnpay/make-order",
        veMayBayDTO
      );
      console.log("response.data", response.data); // Xử lý dữ liệu phản hồi từ API
      window.location.href = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="container d-flex justify-content-center">
      <div className="order order-container mt-3">
        <div className="order-sidebar">
          <img src="https://www.onlygfx.com/wp-content/uploads/2021/07/paper-plane-1.png" />
        </div>
        <div className="order-content">
          <div>
            <h3>CHI TIẾT GIÁ</h3>
          </div>
          <hr></hr>
          <div className="chuyen-bay">
            <h6>
              <strong>CHUYẾN BAY ĐI</strong>
            </h6>
            {adultsInfo[0].length > 0 && (
              <div className="content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Người lớn x{" "}
                  {adultsInfo[0].length}){" "}
                </div>
                <div>{chuyenBay.giaVe * adultsInfo[0].length}</div>
              </div>
            )}

            {childrenInfo[0].length > 0 && (
              <div className="content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Trẻ em x{" "}
                  {childrenInfo[0].length}){" "}
                </div>
                <div>{chuyenBay.giaVe * childrenInfo[0].length}</div>
              </div>
            )}
            {babyInfo[0].length > 0 && (
              <div className="content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Em bé x {babyInfo[0].length}){" "}
                </div>
                <div>{chuyenBay.giaVe * babyInfo[0].length}</div>
              </div>
            )}
            {chuyenBayKhuHoi && (
              <div className="mt-5">
                <h6>
                  <strong>CHUYẾN BAY VỀ</strong>
                </h6>

                {adultsInfo[0].length > 0 && (
                  <div className="content">
                    <div>
                      {chuyenBayKhuHoi.hangBay.tenHangBay} (Người lớn x{" "}
                      {adultsInfo[0].length}){" "}
                    </div>
                    <div>{chuyenBayKhuHoi.giaVe * adultsInfo[0].length}</div>
                  </div>
                )}
                {childrenInfo[0].length > 0 && (
                  <div className="content">
                    <div>
                      {chuyenBayKhuHoi.hangBay.tenHangBay} (Trẻ em x{" "}
                      {childrenInfo[0].length}){" "}
                    </div>
                    <div>{chuyenBayKhuHoi.giaVe * childrenInfo[0].length}</div>
                  </div>
                )}
                {babyInfo[0].length > 0 && (
                  <div className="content">
                    <div>
                      {chuyenBayKhuHoi.hangBay.tenHangBay} (Em bé{" "}
                      {babyInfo[0].length}){" "}
                    </div>
                    <div>{chuyenBayKhuHoi.giaVe * babyInfo[0].length}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <hr></hr>
          <div className="content">
            <div>
              <strong>THÀNH TIỀN</strong>
            </div>
            <div>
              <strong>{total}</strong>
            </div>
          </div>
          <div className="button">
            <button onClick={handleSubmit} className="shadow">
              Thanh Toán
            </button>
          </div>
        </div>
        <div className="item3">
          <h5>MÃ ĐẶT CHỖ</h5>
          <h5>{orderCode}</h5>
          <hr></hr>
          {/* <div className="trip">
                        <div>
                            CHUYẾN ĐI
                        </div>
                        <div>
                            <a href="">Chi Tiết</a>
                        </div>
                    </div> */}
          <div className="flight">
            <h5>CHUYẾN BAY</h5>
          </div>
          <h6 className="mb-0">
            {chuyenBay.ngayKhoiHanh} -{" "}
            {chuyenBayKhuHoi != null ? chuyenBayKhuHoi.ngayKhoiHanh : ""}
          </h6>
          <b>
            {chuyenBay.diemDi} <i className="bx bx-transfer-alt"></i>{" "}
            {chuyenBayKhuHoi != null ? chuyenBayKhuHoi.diemDi : ""}
          </b>
          <hr></hr>
          <h5>HÀNH KHÁCH</h5>
          <table className="table table-striped">
            <tbody>
              {adultsInfo.map((subArray, index) =>
                subArray.map((item, subIndex) => (
                  <tr key={subIndex}>
                    <th scope="row">
                      {item.gioiTinh === "Nam" ? "Ông." : "Bà."}
                    </th>
                    <td>{item.tenHanhKhach}</td>
                    <td>{item.loaiHanhKhach}</td>
                  </tr>
                ))
              )}
              {childrenInfo.map((subArray, index) =>
                subArray.map((item, subIndex) => (
                  <tr key={subIndex}>
                    <th scope="row">
                      {item.gioiTinh === "Nam." ? "Ông" : "Bà."}
                    </th>
                    <td>{item.tenHanhKhach}</td>
                    <td>{item.loaiHanhKhach}</td>
                  </tr>
                ))
              )}
              {babyInfo.map((subArray, index) =>
                subArray.map((item, subIndex) => (
                  <tr key={subIndex}>
                    <th scope="row">
                      {item.gioiTinh === "Nam" ? "Ông." : "Bà."}
                    </th>
                    <td>{item.tenHanhKhach}</td>
                    <td>{item.loaiHanhKhach}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
}
export default HoaDon;
