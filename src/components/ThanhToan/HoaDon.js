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

  //DucNH66 Hàm lưu hành khách
  const handleSubmit = async (event) => {
    event.preventDefault();
    const hanhKhachs = [...adultsInfo, ...childrenInfo, ...babyInfo].map(
      (hanhKhach) => {
        return {
          ...hanhKhach,
        };
      }
    );
    try {
      await axios.post("http://localhost:8080/hanh-khach/save", hanhKhachs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Thành công!");
    } catch (error) {
      console.error(error);
      alert("Đặt vé thất bại!");
    }
  };

  //DucNH66 LOG
  console.log("nguoi lon: ", adultsInfo);
  console.log("tre em: ", childrenInfo);
  console.log("em be: ", babyInfo);
  console.log("loai ve 1: ", tiketType);
  console.log("loai ve 2: ", tiketTypeKhuHoi);
  console.log("ma dat cho 1: ", maDatCho);
  console.log("ma dat cho 2: ", maDatChoKhuHoi);
  console.log("id Chuyen Bay Di: ", idChuyenBayDi);
  console.log("chuyen bay: ", chuyenBay);
  console.log("id Chuyen Bay Khu Hoi: ", idChuyenBayKhuHoi);
  console.log("chuyen Bay Khu hoi: ", chuyenBayKhuHoi);

  return (
    <>HELLO DUYNT58</>

    // <div className="container d-flex justify-content-center">
    //   <div className="order">
    //     <div className="order-sidebar"></div>
    //     <div className="order-content">
    //       <h3>CHI TIẾT GIÁ</h3>
    //       <h5> Chuyến Bay Đi</h5>
    //       <div className="content">
    //         <div>
    //           {chuyenBay.hangBay.tenHangBay}(Người Lớn x {adultsInfo.length}){" "}
    //         </div>
    //         <div>{chuyenBay.giaVe * adultsInfo.length}</div>
    //       </div>
    //       <div className="content">
    //         <div>
    //           {chuyenBay.hangBay.tenHangBay}(Trẻ em x{childrenInfo.length}){" "}
    //         </div>
    //         <div>{chuyenBay.giaVe * childrenInfo.length}</div>
    //       </div>
    //       <div className="content">
    //         <div>
    //           {chuyenBay.hangBay.tenHangBay}(Em bé {babyInfo.length}){" "}
    //         </div>
    //         <div>{chuyenBay.giaVe * babyInfo.length}</div>
    //       </div>
    //       <h5> Chuyến Bay Về</h5>
    //       <div className="content">
    //         {/* Chưa lấy được số người lớn ,trẻ em, em bé , chấm lenght không ra nha anh Duy */}
    //         <div>
    //           {chuyenBayKhuHoi.hangBay.tenHangBay} (Người Lớn x{" "}
    //           {adultsInfo.length}){" "}
    //         </div>
    //         <div>{chuyenBayKhuHoi.giaVe * adultsInfo.length}</div>
    //       </div>
    //       <div className="content">
    //         <div>
    //           {chuyenBayKhuHoi.hangBay.tenHangBay}(Trẻ em x{childrenInfo.length}
    //           ){" "}
    //         </div>
    //         <div>{chuyenBayKhuHoi.giaVe * childrenInfo.length}</div>
    //       </div>
    //       <div className="content">
    //         <div>
    //           {chuyenBayKhuHoi.hangBay.tenHangBay}(Em bé {babyInfo.length}){" "}
    //         </div>
    //         <div>{chuyenBayKhuHoi.giaVe * babyInfo.length}</div>
    //       </div>
    //       <hr></hr>
    //       <div className="content">
    //         <div>
    //           <strong>THÀNH TIỀN</strong>
    //         </div>
    //         <div>
    //           <strong>11.170.000VND</strong>
    //         </div>
    //       </div>
    //       <div className="button">
    //         <button classNameName="shadow">Thanh Toán</button>
    //       </div>
    //     </div>
    //     <div className="item3">
    //       <h5>MÃ ĐẶT CHỖ</h5>
    //       <h5>OD16052316091</h5>
    //       <hr></hr>
    //       {/* <div className="trip">
    //                     <div>
    //                         CHUYẾN ĐI
    //                     </div>
    //                     <div>
    //                         <a href="">Chi Tiết</a>
    //                     </div>
    //                 </div> */}
    //       <div className="flight">
    //         <h5>CHUYẾN BAY</h5>
    //       </div>
    //       <h6 className="mb-0">
    //         {chuyenBay.ngayKhoiHanh} - {chuyenBayKhuHoi.ngayKhoiHanh}
    //       </h6>
    //       <b>
    //         {chuyenBay.diemDi} <i className="bx bx-transfer-alt"></i>{" "}
    //         {chuyenBayKhuHoi.diemDi}
    //       </b>
    //       <hr></hr>
    //       <h5>HÀNH KHÁCH</h5>
    //       <table className="table table-striped">
    //         <tbody>
    //           {adultsInfo.map((subArray, index) =>
    //             subArray.map((item, subIndex) => (
    //               <tr key={subIndex}>
    //                 <th scope="row">{item.gioiTinh}</th>
    //                 <td>{item.tenHanhKhach}</td>
    //                 <td>{item.loaiHanhKhach}</td>
    //               </tr>
    //             ))
    //           )}
    //           {childrenInfo.map((subArray, index) =>
    //             subArray.map((item, subIndex) => (
    //               <tr key={subIndex}>
    //                 <th scope="row">{item.gioiTinh}</th>
    //                 <td>{item.tenHanhKhach}</td>
    //                 <td>{item.loaiHanhKhach}</td>
    //               </tr>
    //             ))
    //           )}
    //           {babyInfo.map((subArray, index) =>
    //             subArray.map((item, subIndex) => (
    //               <tr key={subIndex}>
    //                 <th scope="row">{item.gioiTinh}</th>
    //                 <td>{item.tenHanhKhach}</td>
    //                 <td>{item.loaiHanhKhach}</td>
    //               </tr>
    //             ))
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
}
export default HoaDon;
