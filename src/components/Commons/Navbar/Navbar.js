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
                  <a aria-current="page" href="#">
                    <Link
                      as={Link}
                      to="/"
                      className="text-white nav-link active"
                    >
                      Trang Chủ
                    </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#">
                    <Link
                      as={Link}
                      to="DanhSachChuyenBay"
                      className="text-white nav-link active"
                    >
                      Chuyến bay
                    </Link>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#">
                    <Link
                      as={Link}
                      to="DanhSachKhachHangDatVe"
                      className="text-white nav-link active"
                    >
                      Hành khách
                    </Link>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#">
                    <Link
                      as={Link}
                      to="ThanhToan"
                      className="text-white nav-link active"
                    >
                      Thanh Toán
                    </Link>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#">
                    <Link
                      as={Link}
                      to="DatCho"
                      className="text-white nav-link active"
                    >
                      Đặt chỗ
                    </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#">
                    <Link
                      as={Link}
                      to="TimKiemVe"
                      className="text-white nav-link active"
                    >
                      Tìm Kiếm Vé
                    </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Liên Hệ
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 login">
                <li className="nav-item">
                  <a  href="#">
                  <Link
                      as={Link}
                      to="Login"
                      className="text-white nav-link active"
                    >
                      Đăng Nhập
                    </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Đăng ký
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
