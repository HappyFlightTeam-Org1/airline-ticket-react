import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../HoaDon/HoaDon.css";
import axios from "axios";
import { toast } from "react-toastify";
function HoaDon() {
  //LẤY DỮ LIỆU TỪ COMPONENT TRƯỚC ĐÓ CHUYỂN SANG
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adultsInfo = JSON.parse(queryParams.get("adultsInfo"));
  const childrenInfo = JSON.parse(queryParams.get("childrenInfo"));
  const babyInfo = JSON.parse(queryParams.get("babyInfo"));
  const ticketType = queryParams.get("tiketType");
  const ticketTypeKhuHoi = queryParams.get("tiketTypeKhuHoi");
  const chuyenBay = JSON.parse(queryParams.get("chuyenBay"));
  const chuyenBayKhuHoi = JSON.parse(queryParams.get("chuyenBayKhuHoi"));
  const maDatCho = JSON.parse(queryParams.get("maDatCho"));
  const maDatChoKhuHoi = JSON.parse(queryParams.get("maDatChoKhuHoi"));
  const emailNguoiDung = localStorage.getItem("email");
  const [isDisabled, setIsDisabled] = useState(false);
  const giaVeEmBe = 100000;

  //lấy list hanhKhachDTO từ component nhập thông tin
  const hanhKhachs = [...adultsInfo, ...childrenInfo, ...babyInfo].map(
    (hanhKhach) => {
      return {
        ...hanhKhach,
      };
    }
  );

  //hàm format tiền
  const CurrencyFormat = (money) => {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
    return formattedValue;
  };

  //BACK LẠI TRANG TRƯỚC
  const goBack = () => {
    window.history.back();
  };


  //hàm tính tổng tiền
  const getTotal = () => {
    let total = 0;
    if (chuyenBay != null) {
      total +=
        adultsInfo != null
          ? adultsInfo.length *
          (ticketType === "Phổ Thông"
            ? chuyenBay.giaVe
            : chuyenBay.giaVe * 1.5)
          : 0;
      total +=
        childrenInfo != null
          ? childrenInfo.length *
          (ticketType === "Phổ Thông"
            ? chuyenBay.giaVe
            : chuyenBay.giaVe * 1.5)
          : 0;
      total +=
        babyInfo != null
          ? giaVeEmBe * babyInfo.length : 0;
    }
    if (chuyenBayKhuHoi != null) {
      total +=
        adultsInfo != null
          ? adultsInfo.length *
          (ticketTypeKhuHoi === "Phổ Thông"
            ? chuyenBayKhuHoi.giaVe
            : chuyenBayKhuHoi.giaVe * 1.5)
          : 0;
      total +=
        childrenInfo != null
          ? childrenInfo.length *
          (ticketTypeKhuHoi === "Phổ Thông"
            ? chuyenBayKhuHoi.giaVe
            : chuyenBayKhuHoi.giaVe * 1.5)
          : 0;
      total +=
        babyInfo != null
          ? babyInfo.length *
          (ticketTypeKhuHoi === "Phổ Thông"
            ? chuyenBayKhuHoi.giaVe
            : chuyenBayKhuHoi.giaVe * 1.5)
          : 0;
    }
    return total;
  };

  const total = CurrencyFormat(getTotal());


  //hàm lấy mã hóa đơn
  function getOrderCode() {
    var randomNumber = '';
    for (var i = 0; i < 8; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return "OD" + randomNumber;
  }

  //hàm lấy ngày tạo hóa đơn
  const getCreateDate = () => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, "0"); // Chèn số 0 vào trước nếu tháng chỉ có 1 chữ số
    const day = String(currentTime.getDate()).padStart(2, "0"); // Chèn số 0 vào trước nếu ngày chỉ có 1 chữ số
    const createDate = year + "-" + month + "-" + day;
    return createDate;
  };

  //ngày tạo hóa đơn
  const [createDate, setCreateDate] = useState(getCreateDate());

  //mã hóa đơn
  const [orderCode, setOrderCode] = useState(getOrderCode);

  //tổng tiền
  const [amount, setAmount] = useState(getTotal());

  // khi chuyến bay thay đổi thì lấy được tổng tiền để gửi xuống thanh toán
  useEffect(() => {
    setAmount(getTotal());
  }, []);

  //hoaDonDTO
  const hoaDonDTO = {
    maHoaDon: orderCode,
    ngayTao: createDate,
    tongTien: amount,
    trangThaiThanhToan: 0,
    trangThaiXoa: 0,
    emailNguoiDung: emailNguoiDung,
  };

  //veMayBayDTO
  const veMayBayDTO = {
    hoaDonDTO: hoaDonDTO,
    hanhKhachDTOs: hanhKhachs,
    maDatChoDis: maDatCho.length > 0 ? maDatCho : [],
    maDatChoKhuHois: maDatChoKhuHoi.length > 0 ? maDatChoKhuHoi : [],
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    try {
      //lưu hóa đơn, list vé máy bay và list hành khách đi kèm theo vé
      axios
        .post("http://localhost:8080/VeMayBay/prePayment", veMayBayDTO)
        .then((respone) => {
          if (respone.data.maHoaDon) {
            const hoaDonDTO = {
              maHoaDon: respone.data.maHoaDon,
              ngayTao: respone.data.ngayTao,
              tongTien: respone.data.tongTien,
              trangThaiThanhToan: respone.data.trangThaiThanhToan,
              trangThaiXoa: respone.data.trangThaiXoa,
            };
            axios
              .post(
                "http://localhost:8080/thanh-toan/vnpay/make-order",
                hoaDonDTO
              )
              .then((urlPayment) => {
                window.location.href = urlPayment.data;
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            toast.error(respone.data);
          }
        });
    } catch (error) {
      console.error("error", error);
    }
  };

  console.log("veMayBayDTO", veMayBayDTO);

  return (
    <div className="container d-flex justify-content-center mb-3 mg-top-60">
      <div className="order order-container mt-3">
        <div className="order-sidebar">
          <img
            style={{ width: "100%" }}
            src="https://www.onlygfx.com/wp-content/uploads/2021/07/paper-plane-1.png"
            alt="imageSrc"
          />
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
            {adultsInfo.length > 0 && (
              <div className="payment-content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Người lớn x{" "}
                  {adultsInfo.length}){" "}
                </div>
                <div>
                  {ticketType === "Phổ Thông"
                    ? CurrencyFormat(chuyenBay.giaVe * adultsInfo.length)
                    : CurrencyFormat(chuyenBay.giaVe * 1.5 * adultsInfo.length)}
                </div>
              </div>
            )}

            {childrenInfo.length > 0 && (
              <div className="payment-content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Trẻ em x {childrenInfo.length}
                  ){" "}
                </div>
                <div>
                  {ticketType === "Phổ Thông"
                    ? CurrencyFormat(chuyenBay.giaVe * childrenInfo.length)
                    : CurrencyFormat(chuyenBay.giaVe * 1.5 * childrenInfo.length)}
                </div>
              </div>
            )}
            {babyInfo.length > 0 && (
              <div className="payment-content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Em bé x {babyInfo.length}){" "}
                </div>
                <div>
                  {CurrencyFormat(giaVeEmBe * babyInfo.length)}
                </div>
              </div>
            )}

            {chuyenBayKhuHoi != null && (
              <div className="mt-5">
                <h6>
                  <strong>CHUYẾN BAY VỀ</strong>
                </h6>

                {adultsInfo.length > 0 && (
                  <div className="payment-content">
                    <div>
                      {chuyenBayKhuHoi.hangBay.tenHangBay} (Người lớn x{" "}
                      {adultsInfo.length}){" "}
                    </div>
                    <div>
                      {ticketTypeKhuHoi === "Phổ Thông"
                        ? CurrencyFormat(chuyenBayKhuHoi.giaVe * adultsInfo.length)
                        : CurrencyFormat(chuyenBayKhuHoi.giaVe * 1.5 * adultsInfo.length)}
                    </div>
                  </div>
                )}
                {childrenInfo.length > 0 && (
                  <div className="payment-content">
                    <div>
                      {chuyenBayKhuHoi.hangBay.tenHangBay} (Trẻ em x
                      {childrenInfo.length})
                    </div>
                    <div>
                      {ticketTypeKhuHoi === "Phổ Thông"
                        ? CurrencyFormat(chuyenBayKhuHoi.giaVe * childrenInfo.length)
                        : CurrencyFormat(chuyenBayKhuHoi.giaVe * 1.5 * childrenInfo.length)}
                    </div>
                  </div>
                )}
                {babyInfo.length > 0 && (
                  <div className="payment-content">
                    <div>
                      {chuyenBayKhuHoi != null &&
                        chuyenBayKhuHoi.hangBay.tenHangBay}
                      (Em bé x {babyInfo.length})
                    </div>
                    <div>
                      {CurrencyFormat(giaVeEmBe * babyInfo.length)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <hr></hr>
          <div className="payment-content">
            <div>
              <strong>THÀNH TIỀN</strong>
            </div>
            <div>
              <strong>{total}</strong>
            </div>
          </div>
          <div className="mt-2">
            <strong>
              <small>Bằng việc nhấn Thanh toán, bạn đồng ý với </small>
              <small className="text-primary">
                <Link as={Link} to="/DieuKhoan">Điều khoản & Điều kiện</Link>
              </small>
              <small> và </small>
              <small className="text-primary">
                <Link as={Link} to="/ChinhSach">Chính sách và quyền riêng tư</Link>
              </small>
              <small>.</small>
            </strong>
          </div>
          <div className="button">
            <button className="btn  btn-success bg" onClick={goBack}>
              QUAY LẠI
            </button>{" "}
            <button disabled={isDisabled} onClick={handleSubmit} className="shadow">
              Thanh Toán
            </button>
          </div>
        </div>
        <div className="item3">
          <h5>MÃ ĐẶT CHỖ</h5>
          <h5>{orderCode}</h5>
          <hr></hr>

          <div className="flight">
            <h5>CHUYẾN BAY</h5>
          </div>
          <h6 className="mb-0">
            {chuyenBay.ngayKhoiHanh}
            {chuyenBayKhuHoi != null
              ? " - " + chuyenBayKhuHoi.ngayKhoiHanh
              : ""}
          </h6>
          <div className="d-flex align-items-center">
            <strong>{chuyenBay.diemDi}</strong>
            <strong>
              <small>
                {chuyenBayKhuHoi != null ? (
                  <i className="bx bx-transfer-alt"></i>
                ) : (
                  <i className="bx bx-transfer-alt"></i>
                )}
              </small>
            </strong>
            <strong>
              {chuyenBayKhuHoi != null
                ? chuyenBayKhuHoi.diemDi
                : chuyenBay.diemDen}
            </strong>
          </div>
          <hr></hr>
          <h5>HÀNH KHÁCH</h5>
          <table className="table table-striped text-nowrap">
            <tbody>
              {adultsInfo.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {item.gioiTinh === "Nam" ? "Ông." : "Bà."}
                  </th>
                  <td>{item.tenHanhKhach}</td>
                  <td>{item.loaiHanhKhach}</td>
                </tr>
              ))}
              {childrenInfo.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {item.gioiTinh === "Nam" ? "Ông." : "Bà."}
                  </th>
                  <td>{item.tenHanhKhach}</td>
                  <td>{item.loaiHanhKhach}</td>
                </tr>
              ))}
              {babyInfo.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {item.gioiTinh === "Em Bé Nam" ? "Ông." : "Bà."}
                  </th>
                  <td>{item.tenHanhKhach}</td>
                  <td>{item.loaiHanhKhach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default HoaDon;