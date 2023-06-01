import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../Assets/logo.png";
import LoginContext from "../../../loginGlobalState/LoginContext";
export default function Navbar({ handleTogger, on }) {
  const { state, dispatch } = useContext(LoginContext);

  return (
    <div className="fixed-top">
      <header>
        <nav className={`navbar navbar-expand-lg ${on ? "night" : ""}`}>
          <div className={`container-fluid navbar-bg ${on ? "night" : ""}`}>
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
              <i className="fa-solid fa-bars" style={{ color: "white" }}></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu">
                <li className="nav-item">
                  <label className="toggle-wrap">
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      onClick={handleTogger}
                    ></input>
                    <span className="toggle">
                      <i className="fa-solid fa-sun"></i>
                      <i className="fa-solid fa-moon"></i>
                    </span>
                  </label>
                </li>
                <li className="nav-item">
                  <Link as={Link} to="/" className="text-white nav-link active">
                    Trang Chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link as={Link} to="TinTuc" className="text-white nav-link active">
                    Tin Tức
                  </Link>
                </li>
                {state.login === "ADMIN" ? (
                  <>
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
                  </>
                ) : (
                  <></>
                )}

                <li className="nav-item">
                  <Link
                    as={Link}
                    to="TimKiemVe"
                    className="text-white nav-link active"
                  >
                    Tìm Kiếm Vé
                  </Link>
                </li>

                {state.login === "ADMIN" ? (
                  <>
                    <li className="nav-item">
                      <Link
                        as={Link}
                        to="QuanLyNguoiDung"
                        className="text-white nav-link active"
                      >
                        Người dùng
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        as={Link}
                        to="BarChart"
                        className="text-white nav-link active"
                      >
                        Thống Kê
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 login">
                {state.login === "" ? (
                  <>
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
                  </>
                ) : (
                  <>
                   <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" style={{color:"white"}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Hello Admin !
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Thông Tin</a></li>
                        <li><a class="dropdown-item" href="#">Đăng Xuất</a></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        as={Link}
                        to="Logout"
                        className="text-white nav-link active"
                      >
                        Đăng xuất
                      </Link>
                    </li>

                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
