import React, { useState, useEffect } from "react";
import './ThanhToanThanhCong.css'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function ThanhToanThanhCong() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderCode = queryParams.get("vnp_TxnRef");

    const [tickets, setTickets] = useState([]);
    const apiURLUpdate = "http://localhost:8080/hoa-don/update/" + orderCode;
    const apiURLQuery = "http://localhost:8080/VeMayBay/list/" + orderCode;

    useEffect(() => {
        axios
            .post(apiURLUpdate)
            .then((response) => {
                console.log("THANH CONG!! HAY KHONG");
                console.log(response.data);
                axios
                    .get(apiURLQuery)
                    .then((response) => {
                        setTickets(response.data);
                        console.log("VE MAY BAY");
                        console.log(response.data);
                    })
                    .catch((err) => console.error);
            })
            .catch((err) => console.error);
        console.log("orderCode1", orderCode);

    }, [null]);
    return (
        <div className='container bg-body table-shadow mt-3'>
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h1>VÉ VỪA ĐẶT</h1>
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
                                <td>{item.giaVe}</td>
                                {/* <td>{item.hoaDon.trangThaiThanhToan == 0 ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}</td> */}
                                <td>
                                    <button className="btn btn-primary" type="submit">In</button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="justify-content-center pagination">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active" aria-current="page">
                            <span className="page-link">2</span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
export default ThanhToanThanhCong;