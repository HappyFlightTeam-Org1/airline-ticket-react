import React from 'react';
import "./LichSuDatVe.css";
export default function LichSuDatVe() {
  return (
    <div className='container'>
    <h1>QUẢN LÝ LỊCH SỬ ĐẶT VÉ</h1>
    <form className="row justify-content-center search">
      <div className="form-group col-md-2 ">
        <h5>Tìm Kiếm Theo</h5>
      </div>
      <div className="form-group col-md-2">
       <input id="adults" type="text" name="adults" className="form-control" placeholder="Mã Vé" />
     </div>
     <div className="form-group col-md-2">
      <input id="adults" type="text" name="adults" className="form-control"  placeholder="Người Đi"/>
    </div>
    <div className="form-group col-md-2">
      <input id="adults" type="text" name="adults" className="form-control" placeholder="Nơi Đi" />
    </div>
    <div className="form-group col-md-2">
      <input id="adults" type="text" name="adults" className="form-control"  placeholder="Nơi đến"/>
    </div>
    <div className="form-group col-md-2 ">
         <button type="submit" className="btn btn-success"> Tìm Kiếm</button>
    </div>
      </form>
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
        <tr>
          <th scope="row">VVU1</th>
          <td>Nguyen Van Huu</td>
          <td>02-06-2023</td>
          <td>04-06-2023</td>
          <td>Đà Nẵng</td>
          <td>Hà Nội</td>
          <td>Thương Gia</td>
          <td>2.000.000</td>
          <td>Đã Thanh Toán</td>
          <td>
            <button className="btn btn-primary " type="submit">In</button>
            <button className="btn btn-danger " type="submit">Huỷ</button>
          </td>
        </tr>
        <tr>
          <th scope="row">VVU1</th>
          <td>Nguyen Van Huu</td>
          <td>02-06-2023</td>
          <td>04-06-2023</td>
          <td>Đà Nẵng</td>
          <td>Hà Nội</td>
          <td>Thương Gia</td>
          <td>2.000.000</td>
          <td>Đã Thanh Toán</td>
          <td>
            <button className="btn btn-primary" type="submit">In</button>
            <button className="btn btn-danger" type="submit">Huỷ</button>
          </td>
        </tr>
        <tr>
          <th scope="row">VVU1</th>
          <td>Nguyen Van Huu</td>
          <td>02-06-2023</td>
          <td>04-06-2023</td>
          <td>Đà Nẵng</td>
          <td>Hà Nội</td>
          <td>Thương Gia</td>
          <td>2.000.000</td>
          <td>Đã Thanh Toán</td>
          <td>
            <button className="btn btn-primary in" type="submit">In</button>
            <button className="btn btn-danger" type="submit">Huỷ</button>
          </td>
        </tr>
        <tr>
          <th scope="row">VVU1</th>
          <td>Nguyen Van Huu</td>
          <td>02-06-2023</td>
          <td>04-06-2023</td>
          <td>Đà Nẵng</td>
          <td>Hà Nội</td>
          <td>Thương Gia</td>
          <td>2.000.000</td>
          <td>Đã Thanh Toán</td>
          <td>
            <button className="btn btn-primary" type="submit">In</button>
            <button className="btn btn-danger" type="submit">Huỷ</button>
          </td>
        </tr>
      </tbody>
     </table>
     <div className="pagination">
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
