import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ThemMoiChuyenBay = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div
              className="card-header  text-white"
              style={{ backgroundColor: "#FFA500" }}
            >
              <h3> Thêm Mới Chuyến Bay</h3>
            </div>
            <div className="card-body">
              <form action="#" method="POST">
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Mã chuyến bay</label>
                    <input
                      className="form-control"
                      type="text"
                      name="maCB"
                      id="maCB"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Giá vé</label>
                    <input
                      className="form-control"
                      type="number"
                      name="giaVe"
                      id="giaVe"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Sân bay đi</label>
                    <select
                      id="sanBayDi"
                      type="text"
                      className="form-control"
                      name="sanBayDi"
                    >
                      <option>Sân Bay Đà Nẵng</option>
                      <option>Sân Bay Tân Sơn Nhất</option>
                      <option>Sân Bay Nội Bài</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Sân bay hạ cánh</label>
                    <select
                      id="sanBayHaCanh"
                      type="text"
                      className="form-control"
                      name="sanBayHaCanh"
                    >
                      <option>Sân Bay Nội Bài</option>
                      <option>Sân Bay Đà Nẵng</option>
                      <option>Sân Bay Tân Sơn Nhất</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Ngày khởi hành</label>
                    <input
                      id="ngayKH"
                      type="date"
                      className="form-control"
                      name="ngayKH"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Giờ khởi hành</label>
                    <input
                      type="time"
                      className="form-control"
                      name="gioKH"
                      id="gioKH"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Giờ hạ cánh</label>
                    <input
                      id="gioHaCanh"
                      type="time"
                      className="form-control"
                      name="gioHaCanh"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Thời gian bay</label>
                    <input
                      type="text"
                      className="form-control"
                      name="tgBay"
                      id="tgBay"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Tên máy bay</label>

                    <select
                      id="maMB"
                      type="number"
                      className="form-control"
                      name="maMB"
                    >
                      <option>Máy Bay A</option>
                      <option>Máy Bay A</option>
                      <option>Máy Bay A</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Tên hãng bay</label>
                    <select
                      type="number"
                      className="form-control"
                      name="maHangBay"
                      id="maHangBay"
                    >
                      <option>Hãng Bay A</option>
                      <option>Hãng Bay A</option>
                      <option>Hãng Bay A</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-6">
                    <label>Khối lượng hành lý</label>
                    <input
                      id="klhl"
                      type="text"
                      className="form-control"
                      name="klhl"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Trạng thái</label>
                    <input
                      type="text"
                      className="form-control"
                      name="trangThai"
                      id="trangThai"
                    />
                  </div>
                </div>

                <div className="form-group text-center mt-2">
                  <Link
                    as={Link}
                    to="/DanhSachChuyenBay"
                    className="text-white"
                  >
                    <a href="" className="btn btn-success">
                      Lưu
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThemMoiChuyenBay;
