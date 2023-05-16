import React from "react";
import './TimKiemVe.css'
function TimKiemVe() {
    return (
        <div className='container bg-body table-shadow'>
            <div className="pt-5 pb-3">
                <div className="text-center pb-3">
                    <h1>TÌM KIẾM VÉ</h1>
                </div>
                <form className="row justify-content-center search">
                    <div className="form-group d-flex justify-content-center align-items-center">
                        <div className="form-group col-md-2">
                            <input id="maHoaDon" type="text" name="maHoaDon" className="form-control"
                                placeholder="Nhập mã hóa đơn" value="" />
                        </div>

                        <div className="form-group col-md-2 d-flex justify-content-center">
                            <button type="submit" className="btn btn-success"> Tìm Kiếm</button>
                        </div>
                    </div>
                </form>
            </div>

            <table className="table table-striped">
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
                        <th scope="col">TT Thanh Toán</th>
                        <th scope="col">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="align-middle">
                        <th scope="row">TK-001</th>
                        <td>Nguyen Van A</td>
                        <td>02-06-2023</td>
                        <td>04-06-2023</td>
                        <td>Đà Nẵng</td>
                        <td>Hà Nội</td>
                        <td>Thương Gia</td>
                        <td>2.000.000</td>
                        <td>Đã Thanh Toán</td>
                        <td>
                            <button className="btn btn-primary " type="submit">In</button>
                        </td>
                    </tr>
                    <tr class="align-middle">
                        <th scope="row">TK-002</th>
                        <td>Nguyen Van B</td>
                        <td>02-06-2023</td>
                        <td>04-06-2023</td>
                        <td>Đà Nẵng</td>
                        <td>Hà Nội</td>
                        <td>Phổ thông</td>
                        <td>2.000.000</td>
                        <td>Đã Thanh Toán</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                        </td>
                    </tr>
                    <tr class="align-middle">
                        <th scope="row">TK-005</th>
                        <td>Nguyen Van E</td>
                        <td>02-06-2023</td>
                        <td>04-06-2023</td>
                        <td>Đà Nẵng</td>
                        <td>Hà Nội</td>
                        <td>Thương Gia</td>
                        <td>2.000.000</td>
                        <td>Đã Thanh Toán</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                        </td>
                    </tr>
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