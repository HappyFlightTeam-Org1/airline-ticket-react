import React from 'react';
import "./QuanLyNguoiDung.css"
export default function QuanLyNguoiDung() {
  return (
    <div className='container bg-body table-shadow'>
            <div className="pt-5 pb-3">
                <div className="text-center pb-3">
                    <h1>DANH SÁCH NGƯỜI DÙNG</h1>
                </div>
                <form className="row justify-content-center search">
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <h5>Tìm Kiếm Theo</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input id="adults" type="text" name="maVe" className="form-control" placeholder="Tên Người Dùng" />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input id="adults" type="text" name="adults" className="form-control" placeholder="Số Điện Thoại" />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input id="adults" type="text" name="adults" className="form-control" placeholder="Địa Chỉ Email" />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-success"> Tìm Kiếm</button>
                    </div>
                </form>
            </div>
            <table className="table table-striped shadow">
                <thead>
                <tr>
                    <th scope="col">Tên Tài Khoản </th>
                    <th scope="col">Tên Người dùng</th>
                    <th scope="col">Địa chỉ email</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Hộ Chiếu</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Quốc tịch</th>
                    <th scope="col">Thao Tác</th>
                </tr>
                </thead>
                <tbody>
                    <tr className="align-middle">
                    <th scope="row">ND0001</th>
                        <td>Nguyen Van Huu</td>
                        <td>thanhhuu@gmail.com</td>
                        <td>0376645544</td>
                        <td>Nam</td>
                        <td>02/03/1998</td>
                        <td>096345678</td>
                        <td>Đà Nẵng</td>
                        <td>Việt Nam</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    <tr className="align-middle">
                    <th scope="row">ND0001</th>
                        <td>Nguyen Van Huu</td>
                        <td>thanhhuu@gmail.com</td>
                        <td>0376645544</td>
                        <td>Nam</td>
                        <td>02/03/1998</td>
                        <td>096345678</td>
                        <td>Đà Nẵng</td>
                        <td>Việt Nam</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    <tr className="align-middle">
                    <th scope="row">ND0001</th>
                        <td>Nguyen Van Huu</td>
                        <td>thanhhuu@gmail.com</td>
                        <td>0376645544</td>
                        <td>Nam</td>
                        <td>02/03/1998</td>
                        <td>096345678</td>
                        <td>Đà Nẵng</td>
                        <td>Việt Nam</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    <tr className="align-middle">
                    <th scope="row">ND0001</th>
                        <td>Nguyen Van Huu</td>
                        <td>thanhhuu@gmail.com</td>
                        <td>0376645544</td>
                        <td>Nam</td>
                        <td>02/03/1998</td>
                        <td>096345678</td>
                        <td>Đà Nẵng</td>
                        <td>Việt Nam</td>
                        <td>
                            <button className="btn btn-primary" type="submit">In</button>
                            <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
                        </td>
                    </tr>
                    <tr className="align-middle">
                    <th scope="row">ND0001</th>
                        <td>Nguyen Van Huu</td>
                        <td>thanhhuu@gmail.com</td>
                        <td>0376645544</td>
                        <td>Nam</td>
                        <td>02/03/1998</td>
                        <td>096345678</td>
                        <td>Đà Nẵng</td>
                        <td>Việt Nam</td>
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
            </div>
  )
}
