import './HoaDon.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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

  //hàm tính tổng tiền
  const getTotal = () => {
    let total = 0;
    if (chuyenBay != null) {
      total += adultsInfo != null ? adultsInfo.length * ((ticketType === 'Phổ Thông') ? (chuyenBay.giaVe) : (chuyenBay.giaVe * 1.5)) : 0;
      total += childrenInfo != null ? childrenInfo.length * ((ticketType === 'Phổ Thông') ? (chuyenBay.giaVe) : (chuyenBay.giaVe * 1.5)) : 0;
      total += babyInfo != null ? babyInfo.length * ((ticketType === 'Phổ Thông') ? (chuyenBay.giaVe) : (chuyenBay.giaVe * 1.5)) : 0;
    }
    if (chuyenBayKhuHoi != null) {
      total +=
        adultsInfo != null ? adultsInfo.length * ((ticketTypeKhuHoi === 'Phổ Thông') ? (chuyenBayKhuHoi.giaVe) : (chuyenBayKhuHoi.giaVe * 1.5)) : 0;
      total +=
        childrenInfo != null ? childrenInfo.length * ((ticketTypeKhuHoi === 'Phổ Thông') ? (chuyenBayKhuHoi.giaVe) : (chuyenBayKhuHoi.giaVe * 1.5)) : 0;
      total += babyInfo != null ? babyInfo.length * ((ticketTypeKhuHoi === 'Phổ Thông') ? (chuyenBayKhuHoi.giaVe) : (chuyenBayKhuHoi.giaVe * 1.5)) : 0;
    }
    return total;
  };

  const total = CurrencyFormat(getTotal());

  //LOG THONG TIN
  console.log("chuyenbay di", chuyenBay);
  console.log("chuyenbay khu hoi", chuyenBayKhuHoi);
  console.log("thong tin nguoi lon: ", adultsInfo);
  console.log("thong tin tre em: ", childrenInfo);
  console.log("thong tin em be: ", babyInfo);
  console.log("loai ve 1 chieu: ", ticketType);
  console.log("loai ve khu hoi: ", ticketTypeKhuHoi);
  console.log("ma dat cho 1 chieu: ", maDatCho);
  console.log("ma dat cho khu hoi: ", maDatChoKhuHoi);

  //ngày tạo hóa đơn
  const [createDate, setCreateDate] = useState();

  //hàm lấy mã hóa đơn
  const getOrderCode = () => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, "0"); // Chèn số 0 vào trước nếu tháng chỉ có 1 chữ số
    const day = String(currentTime.getDate()).padStart(2, "0"); // Chèn số 0 vào trước nếu ngày chỉ có 1 chữ số
    const hours = String(currentTime.getHours()).padStart(2, "0"); // Chèn số 0 vào trước nếu giờ chỉ có 1 chữ số
    const minutes = String(currentTime.getMinutes()).padStart(2, "0"); // Chèn số 0 vào trước nếu phút chỉ có 1 chữ số
    const seconds = String(currentTime.getSeconds()).padStart(2, "0"); // Chèn số 0 vào trước nếu giây chỉ có 1 chữ số
    // const orderCode = `OD${year}${month}${day}${hours}${minutes}${seconds}`;
    const orderCode = `OD${year}${month}${day}`;
    const createOrderDate = year + "-" + month + "-" + day;
    setCreateDate(createOrderDate);
    return orderCode;
  };

  //mã hóa đơn
  const [orderCode, setOrderCode] = useState(getOrderCode);

  //tổng tiền
  const [amount, setAmount] = useState(getTotal());

  // khi chuyến bay thay đổi thì lấy được tổng tiền để gửi xuống thanh toán
  useEffect(() => {
    setAmount(getTotal());
  }, [chuyenBay]);

  //hoaDonDTO
  const hoaDonDTO = {
    maHoaDon: orderCode,
    ngayTao: createDate,
    tongTien: amount,
    trangThaiThanhToan: 0,
    trangThaiXoa: 0,
    emailNguoiDung: "user@example.com",
  };

  //veMayBayDTO
  const veMayBayDTO = {
    hoaDonDTO: hoaDonDTO,
    hanhKhachDTOs: hanhKhachs,
    maDatChoDis: (maDatCho.length > 0) ? maDatCho : [],
    maDatChoKhuHois: (maDatChoKhuHoi.length > 0) ? maDatChoKhuHoi : [],
  };

  console.log("veMayBayDTO", veMayBayDTO);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      //lưu hóa đơn, list vé máy bay và list hành khách đi kèm theo vé
      axios.post(
        "http://localhost:8080/VeMayBay/prePayment",
        veMayBayDTO
      ).then((respone) => {
        if (respone.data.maHoaDon) {
          const hoaDonDTO = {
            maHoaDon: respone.data.maHoaDon,
            ngayTao: respone.data.ngayTao,
            tongTien: respone.data.tongTien,
            trangThaiThanhToan: respone.data.trangThaiThanhToan,
            trangThaiXoa: respone.data.trangThaiXoa
          }
          axios.post(
            "http://localhost:8080/thanh-toan/vnpay/make-order",
            hoaDonDTO)
            .then((urlPayment) => {
              window.location.href = urlPayment.data;
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.log("respone.data", respone.data);
          toast.error(respone.data)
        }



      })
        .catch((error2) => {
          console.error("error22", error2);
          toast.warning(error2.respone)
        });


    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="order order-container mt-3">
        <div className="order-sidebar">
          <img style={{ width: '100%' }} src="https://www.onlygfx.com/wp-content/uploads/2021/07/paper-plane-1.png" alt="imageSrc" />
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
              <div className="content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Người lớn x{" "}
                  {adultsInfo.length}){" "}
                </div>
                <div>{(ticketType === 'Phổ Thông') ? (chuyenBay.giaVe) * adultsInfo.length : (chuyenBay.giaVe * 1.5) * adultsInfo.length}</div>
              </div>
            )}

            {childrenInfo.length > 0 && (
              <div className="content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Trẻ em x {childrenInfo.length}
                  ){" "}
                </div>
                <div>{(ticketType === 'Phổ Thông') ? (chuyenBay.giaVe) * childrenInfo.length : (chuyenBay.giaVe * 1.5) * childrenInfo.length}</div>
              </div>
            )}
            {babyInfo.length > 0 && (
              <div className="content">
                <div>
                  {chuyenBay.hangBay.tenHangBay} (Em bé x {babyInfo.length}){" "}
                </div>
                <div>{(ticketType === 'Phổ Thông') ? (chuyenBay.giaVe) * babyInfo.length : (chuyenBay.giaVe * 1.5) * babyInfo.length}</div>
              </div>
            )}

            {chuyenBayKhuHoi != null && (
              <div className="mt-5">
                <h6>
                  <strong>CHUYẾN BAY VỀ</strong>
                </h6>

                {adultsInfo.length > 0 && (
                  <div className="content">
                    <div>
                      {chuyenBayKhuHoi.hangBay.tenHangBay} (Người lớn x{" "}
                      {adultsInfo.length}){" "}
                    </div>
                    <div>{(ticketTypeKhuHoi === 'Phổ Thông') ? (chuyenBayKhuHoi.giaVe) : (chuyenBayKhuHoi.giaVe * 1.5) * adultsInfo.length}</div>
                  </div>
                )}
                {childrenInfo.length > 0 && (
                  <div className="content">
                    <div>
                      {chuyenBayKhuHoi.hangBay.tenHangBay} (Trẻ em x
                      {childrenInfo.length})
                    </div>
                    <div>{(ticketTypeKhuHoi === 'Phổ Thông') ? (chuyenBayKhuHoi.giaVe) : (chuyenBayKhuHoi.giaVe * 1.5) * childrenInfo.length}</div>
                  </div>
                )}
                {babyInfo.length > 0 && (
                  <div className="content">
                    <div>
                      {chuyenBayKhuHoi != null &&
                        chuyenBayKhuHoi.hangBay.tenHangBay}
                      (Em bé x {babyInfo.length})
                    </div>
                    <div>{(ticketTypeKhuHoi === 'Phổ Thông') ? (chuyenBayKhuHoi.giaVe) : (chuyenBayKhuHoi.giaVe * 1.5) * babyInfo.length}</div>
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
          <div className="mt-2">
            <strong>
              <small>Bằng việc nhấn Thanh toán, bạn đồng ý với </small>
              <small className="text-primary"><Link>Điều khoản & Điều kiện</Link></small>
              <small> và </small>
              <small className="text-primary"><Link>Chính sách và quyền riêng tư</Link></small>
              <small>.</small>
            </strong>
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

          <div className="flight">
            <h5>CHUYẾN BAY</h5>
          </div>
          <h6 className="mb-0">
            {chuyenBay.ngayKhoiHanh}
            {chuyenBayKhuHoi != null ? " - " + chuyenBayKhuHoi.ngayKhoiHanh : ""}
          </h6>
          <div className="d-flex align-items-center">
            <strong>{chuyenBay.diemDi}</strong>
            <strong><small>{chuyenBayKhuHoi != null ? <i className='bx bx-transfer-alt'></i> : <i className='bx bx-transfer-alt'></i>}</small></strong>
            <strong>{chuyenBayKhuHoi != null ? chuyenBayKhuHoi.diemDi : chuyenBay.diemDen}</strong>
          </div>
          <hr></hr>
          <h5>HÀNH KHÁCH</h5>
          <table className="table table-striped">
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
                    {item.gioiTinh === "Em Bé Nam" ? "Bé Nam." : "Bé Nữ."}
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
