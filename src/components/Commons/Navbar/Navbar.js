import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../Assets/logo.png";
export default function Navbar() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <div className="logoDiv">
              <img className="img" src={logo} alt="Giá rẻ" />
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu">
                <li className="nav-item">

                  <Link
                    as={Link}
                    to="/"
                    className="text-white nav-link active"
                  >
                    Trang Chủ
                  </Link>

                </li>
                <li className="nav-item">

                  <Link
                    as={Link}
                    to="DanhSachChuyenBay"
                    className="text-white nav-link active"
                  >
                    Chuyến bay
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    as={Link}
                    to="DanhSachKhachHangDatVe"
                    className="text-white nav-link active"
                  >
                    Hành khách
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    as={Link}
                    to="LichSuDatVe"
                    className="text-white nav-link active"
                  >
                    Lịch sử đặt vé
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    as={Link}
                    to="TimKiemVe"
                    className="text-white nav-link active"
                  >
                    Tìm Kiếm Vé
                  </Link>

                </li>

                <li className="nav-item">

                  <Link
                    as={Link}
                    to="NguoiDung"
                    className="text-white nav-link active"
                  >
                    Người dùng
                  </Link>

                </li>
                <li className="nav-item">

                  <Link
                    as={Link}
                    to="/"
                    className="text-white nav-link active"
                  >
                    Liên hệ
                  </Link>

                </li>
              </ul>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 login">
                <li className="nav-item">

                  <Link
                    as={Link}
                    to="Login"
                    className="text-white nav-link active"
                  >
                    Đăng Nhập
                  </Link>

                </li>
                <li className="nav-item">
                  <Link
                    as={Link}
                    to="DangKy"
                    className="text-white nav-link active"
                  >
                    Đăng ký
                  </Link>


                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
