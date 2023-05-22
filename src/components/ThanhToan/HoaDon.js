import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HoaDon.css";
import axios from "axios";
function HoaDon() {
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
    const [chuyenBay, setChuyenBay] = useState(
        JSON.parse(queryParams.get("chuyenBay"))
    );
    const [chuyenBayKhuHoi, setChuyenBayKhuHoi] = useState(
        JSON.parse(queryParams.get("chuyenBayKhuHoi"))
    );

    //Hàm lưu hành khách
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

    console.log(adultsInfo[0].gioiTinh);
    console.log(childrenInfo);
    console.log(babyInfo);
    console.log(chuyenBay);
    console.log(chuyenBayKhuHoi);

    return (
        <div className="container d-flex justify-content-center">
            <div className="order">
                <div className="order-sidebar"></div>
                <div className="order-content">
                    <h3>CHI TIẾT GIÁ</h3>
                    <h5> Chuyến Bay Đi</h5>
                    <div className="content">
                        <div>
                            {chuyenBay.hangBay.tenHangBay}(Người Lớn x {adultsInfo.length}){" "}
                        </div>
                        <div>{chuyenBay.giaVe * adultsInfo.length}</div>
                    </div>
                    <div className="content">
                        <div>
                            {chuyenBay.hangBay.tenHangBay}(Trẻ em x{childrenInfo.length}){" "}
                        </div>
                        <div>{chuyenBay.giaVe * childrenInfo.length}</div>
                    </div>
                    <div className="content">
                        <div>
                            {chuyenBay.hangBay.tenHangBay}(Em bé {babyInfo.length}){" "}
                        </div>
                        <div>{chuyenBay.giaVe * babyInfo.length}</div>
                    </div>
                    <h5> Chuyến Bay Về</h5>
                    <div className="content">
                        {/* Chưa lấy được số người lớn ,trẻ em, em bé , chấm lenght không ra nha anh Duy */}
                        <div>
                            {chuyenBayKhuHoi.hangBay.tenHangBay} (Người Lớn x{" "}
                            {adultsInfo.length}){" "}
                        </div>
                        <div>{chuyenBayKhuHoi.giaVe * adultsInfo.length}</div>
                    </div>
                    <div className="content">
                        <div>
                            {chuyenBayKhuHoi.hangBay.tenHangBay}(Trẻ em x{childrenInfo.length}
                            ){" "}
                        </div>
                        <div>{chuyenBayKhuHoi.giaVe * childrenInfo.length}</div>
                    </div>
                    <div className="content">
                        <div>
                            {chuyenBayKhuHoi.hangBay.tenHangBay}(Em bé {babyInfo.length}){" "}
                        </div>
                        <div>{chuyenBayKhuHoi.giaVe * babyInfo.length}</div>
                    </div>
                    <hr></hr>
                    <div className="content">
                        <div>
                            <strong>THÀNH TIỀN</strong>
                        </div>
                        <div>
                            <strong>11.170.000VND</strong>
                        </div>
                    </div>
                    <div className="button">
                        <button classNameName="shadow">Thanh Toán</button>
                    </div>
                </div>
                <div className="item3">
                    <h5>MÃ ĐẶT CHỖ</h5>
                    <h5>OD16052316091</h5>
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
                        {chuyenBay.ngayKhoiHanh} - {chuyenBayKhuHoi.ngayKhoiHanh}
                    </h6>
                    <b>
                        {chuyenBay.diemDi} <i className="bx bx-transfer-alt"></i>{" "}
                        {chuyenBayKhuHoi.diemDi}
                    </b>
                    <hr></hr>
                    <h5>HÀNH KHÁCH</h5>
                    <table className="table table-striped">
                        <tbody>
                            {adultsInfo.map((subArray, index) =>
                                subArray.map((item, subIndex) => (
                                    <tr key={subIndex}>
                                        <th scope="row">{item.gioiTinh}</th>
                                        <td>{item.tenHanhKhach}</td>
                                        <td>{item.loaiHanhKhach}</td>
                                    </tr>
                                ))
                            )}
                            {childrenInfo.map((subArray, index) =>
                                subArray.map((item, subIndex) => (
                                    <tr key={subIndex}>
                                        <th scope="row">{item.gioiTinh}</th>
                                        <td>{item.tenHanhKhach}</td>
                                        <td>{item.loaiHanhKhach}</td>
                                    </tr>
                                ))
                            )}
                            {babyInfo.map((subArray, index) =>
                                subArray.map((item, subIndex) => (
                                    <tr key={subIndex}>
                                        <th scope="row">{item.gioiTinh}</th>
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