import React, { useState, useEffect } from "react";
import './ThanhToanThanhCong.css'
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
function ThanhToanThanhCong() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderCode = queryParams.get("vnp_TxnRef");
    const [render, setRender] = useState(true);
    const [tickets, setTickets] = useState([]);
    const apiURLUpdate = "http://localhost:8080/hoa-don/update/" + orderCode;
    const apiURLQuery = "http://localhost:8080/VeMayBay/list/" + orderCode;

    //CHỨC NĂNG IN VÉ
    const handlePrint = (maVe) => {
        axios.get("http://localhost:8080/VeMayBay/InVe?maVe=" + maVe)
            .then((response) => {
                console.log("response.data ", response.data);
                if (response.data === "EMPTY") {
                    toast.error("VÉ KHÔNG TỒN TẠI!")
                } else {
                    window.location.href = `http://localhost:3000/InVe?maVe=${maVe.toString()}`;
                }
            }).catch((error) => {
                console.error("error at function handlePrint", error);
            })
    }

    useEffect(() => {
        axios
            .post(apiURLUpdate)
            .then((response) => {
                if (response.data === "DONE") {
                    toast.success("THANH TOÁN THÀNH CÔNG!");
                    axios
                        .get(apiURLQuery)
                        .then((response) => {
                            setTickets(response.data);
                            console.log("tickets", tickets);
                        })
                        .catch((err) => console.error);
                } else if (response.data === "PAID") {
                    axios
                        .get(apiURLQuery)
                        .then((response) => {
                            setTickets(response.data);
                            console.log("tickets", tickets);
                        })
                        .catch((err) => console.error);
                } else if (response.data === "FAIL") {
                    toast.error("THANH TOÁN THẤT BẠI!");
                } else {
                    toast.error(response.data);
                }

            })
            .catch((err) => console.error);
    }, [apiURLUpdate, apiURLQuery]);


    return (
        <div className='container ticket-container bg-body table-shadow'>
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h2>VÉ VỪA ĐẶT</h2>
                </div>
            </div>

            <table className="table table-striped border">
                <thead>
                    <tr>
                        <th scope="col">Mã Vé</th>
                        <th scope="col">Tên Hành Khách</th>
                        <th scope="col">Ngày Booking</th>
                        <th scope="col">Ngày Bay</th>
                        <th scope="col">Nơi Đi</th>
                        <th scope="col">Nơi Đến</th>
                        <th scope="col">Hạng Vé</th>
                        <th scope="col">Giá Vé</th>
                        {/* <th scope="col">TT Thanh Toán</th> */}
                        <th scope="col">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((item, index) => {
                        return (
                            <tr className="align-middle" key={item.maVe}>
                                <th scope="row">{item.maVe}</th>
                                <td>{item.hanhKhach.tenHanhKhach}</td>
                                <td>{item.hoaDon.ngayTao}</td>
                                <td>{item.datCho.chuyenBay.ngayKhoiHanh}</td>
                                <td>{item.datCho.chuyenBay.diemDi}</td>
                                <td>{item.datCho.chuyenBay.diemDen}</td>
                                <td>{item.datCho.ghe.loaiGhe.tenLoaiGhe}</td>
                                <td>{(item.datCho.ghe.loaiGhe.tenLoaiGhe === "Phổ Thông") ? item.giaVe : item.giaVe * 1.5}</td>

                                <td>
                                    <button
                                        onClick={() => handlePrint(item.maVe.toString())}
                                        className="btn bg text-white"
                                    >
                                        In
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
}
export default ThanhToanThanhCong;