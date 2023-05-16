import React from "react";
import './LichSuDatVe.css'
import axios from "axios";
function LichSuDatVe() {
    return (
        <div className='container bg-body table-shadow'>
            <div className="pt-5 pb-3">
                <div className="text-center pb-3">
                    <h1>LỊCH SỬ ĐẶT VÉ</h1>
                </div>
                <form className="row justify-content-center search">
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <h5>Tìm Kiếm Theo</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input id="adults" type="text" name="maVe" className="form-control" placeholder="Mã Vé" />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input id="adults" type="text" name="adults" className="form-control" placeholder="Tên hành khách" />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input id="adults" type="text" name="adults" className="form-control" placeholder="Nơi Đi" />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input id="adults" type="text" name="adults" className="form-control" placeholder="Nơi đến" />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-success"> Tìm Kiếm</button>
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
                    <tr className="align-middle">
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
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    <tr className="align-middle">
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
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    <tr className="align-middle">
                        <th scope="row">TK-003</th>
                        <td>Nguyen Van C</td>
                        <td>02-06-2023</td>
                        <td>04-06-2023</td>
                        <td>Đà Nẵng</td>
                        <td>Hà Nội</td>
                        <td>Thương Gia</td>
                        <td>2.000.000</td>
                        <td>Đã Thanh Toán</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    <tr className="align-middle">
                        <th scope="row">TK-004</th>
                        <td>Nguyen Van D</td>
                        <td>02-06-2023</td>
                        <td>04-06-2023</td>
                        <td>Đà Nẵng</td>
                        <td>Hà Nội</td>
                        <td>Phổ thông</td>
                        <td>2.000.000</td>
                        <td>Chưa Thanh Toán</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
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
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
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

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger">
                            <h5 className="modal-title text-white" id="staticBackdropLabel">XÁC NHẬN</h5>
                            <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h5>Bạn thực sự muốn hủy vé mày?</h5>
                                <span>- Mã vé: TK001</span>
                                <br></br>
                                <span>- Hành khách: Nguyen Van A</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy bỏ</button>
                            <button type="button" className="btn btn-warning">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}
export default LichSuDatVe;

