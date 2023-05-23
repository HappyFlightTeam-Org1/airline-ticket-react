import React, { useState, useEffect } from "react";
import './TimKiemVe.css'
import axios from "axios";
function TimKiemVe() {

    const [tickets, setTickets] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        let orderCode = event.target.elements.maHoaDon.value;
        const apiURLQuery = "http://localhost:8080/VeMayBay/list/" + orderCode;
        try {
            const response = await axios.get(apiURLQuery);
            console.log("response.data", response);
            // Xử lý dữ liệu phản hồi từ API
            if (response.data.length > 0) {
                setTickets(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='container bg-body table-shadow mt-3'>
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h1>TÌM KIẾM VÉ</h1>
                </div>
                <form onSubmit={handleSubmit} className="row justify-content-center">
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <div className="form-group col-md-2">
                            <input id="maHoaDon" type="text" name="maHoaDon" className="form-control"
                                placeholder="Nhập mã đặt chỗ" />
                        </div>

                        <div className="form-group col-md-2 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success"> Tìm Kiếm</button>
                        </div>
                    </div>
                </form>
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
                                <td>
                                    <button className="btn btn-primary" type="submit">In</button>
                                    <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
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
export default TimKiemVe;