import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Controller.css";
import Navbar from "./components/Commons/Navbar/Navbar.js";
import Home from "./components/Commons/Home/Home.js";
import Footer from "./components/Commons/Footer/Footer.js";
import CapNhatChuyenBay from "./components/ChuyenBay/CapNhatChuyenBay.js";
import DanhSachChuyenBay from "./components/ChuyenBay/DanhSachChuyenBay.js";
import ThemMoiChuyenBay from "./components/ChuyenBay/ThemMoiChuyenBay.js";
import TimKiemChuyenBay from "./components/ChuyenBay/DanhSachTimKiemChuyenBay.js";
import ThemHanhKhachDatVe from "./components/HanhKhach/ThemHanhKhachDatVe.js";
import DanhSachKhachHangDatVe from "./components/HanhKhach/DanhSachHanhKhach.js";
import LichSuDatVe from "./components/VeMayBay/LichSuDatVe/LichSuDatVe.js";
import TimKiemVe from "./components/VeMayBay/TimKiemVe/TimKiemVe.js";
import QuanLyNguoiDung from "./components/QuanLyNguoiDung/QuanLyNguoiDung.js";
import BarChart from "./components/DashBoard/BarChart.js";
import DatCho from "./components/DatCho/DanhSachDatCho/DatCho.js";
import HanhKhach from "./components/HanhKhach/DanhSachHanhKhach.js";
import HoaDon from "./components/ThanhToan/HoaDon/HoaDon.js";
import Login from "./components/Authen/DangNhap/Login";
import ThanhToanThanhCong from "./components/ThanhToan/ThanhToanThanhCong/ThanhToanThanhCong";
import InVeMayBay from "./components/VeMayBay/InVeMayBay/InVeMayBay";

import DangKy from "./components/Authen/DangKy/Register.js";

import React, { useEffect, useReducer, useState } from "react";
import GuiEmail from "./components/Authen/QuenMatKhau/GuiEmail.js";
import ThietLapMatKhauMoi from "./components/Authen/QuenMatKhau/ThietLapMatKhauMoi";
import SuaThongTinCaNhan from "./components/Authen/SuaThongTinCaNhan/SuaThongTinCaNhan";
import ThayDoiMatKhau from "./components/Authen/ThayDoiMatKhau/ThayDoiMatKhau.js";
import LoginStateReducer from "./loginGlobalState/LoginStateReducer";
import LoginContext from "./loginGlobalState/LoginContext";
import Logout from "./components/Authen/DangXuat/Logout";
import ErrorPage from "./components/Commons/ErrorPage/ErrorPage";
import TinTuc from "./components/TinTuc/TinTuc";
import ChinhSach from "./components/TinTuc/ChinhSach";
import DieuKhoan from "./components/TinTuc/DieuKhoan";

function Controller() {
  const [on, setOn] = useState(false);

  const handleTogger = () => {
    setOn(!on);
    console.log(on);
  };

  const loginInitialState = { login: "" };
  const [state, dispatch] = useReducer(LoginStateReducer, loginInitialState);

  useEffect(() => {
    if (localStorage.getItem("login") === "user") {
      dispatch({ type: "USER" });
    }
    if (localStorage.getItem("login") === "admin") {
      dispatch({ type: "ADMIN" });
    }
  }, []);

  return (
    <div className="Controller">
      <LoginContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar handleTogger={handleTogger} on={on} />
          <Routes>
            <Route path="/" element={<Home on={on} />} />
            {/* Thêm mới chuyến bay */}
            <Route>
              {state.login === "ADMIN" ? (
                <>
                  <Route path="ThemChuyenBay" element={<ThemMoiChuyenBay />} />
                  <Route
                    path="CapNhatChuyenBay"
                    element={<CapNhatChuyenBay />}
                  />
                  <Route
                    path="DanhSachChuyenBay"
                    element={<DanhSachChuyenBay />}
                  />
                  <Route
                    path="TimKiemChuyenBay"
                    element={<TimKiemChuyenBay />}
                  />
                  <Route path="HanhKhach" element={<HanhKhach />} />
                </>
              ) : (
                <>
                  <Route
                    path="TimKiemChuyenBay"
                    element={<TimKiemChuyenBay />}
                  />
                </>
              )}
            </Route>
            {/* Hành Khách */}
            <Route>
              {state.login !== "" ? (
                <>
                  <Route
                    path="ThongTinKhachHangDatVe"
                    element={<ThemHanhKhachDatVe />}
                  />
                </>
              ) : (
                <></>
              )}
              <Route path="TimKiemVe" element={<TimKiemVe />} />
              <Route path="TinTuc" element={<TinTuc />} />
              <Route path="InVe" element={<InVeMayBay />} />
              <Route path="ChinhSach" element={<ChinhSach />} />
              <Route path="DieuKhoan" element={<DieuKhoan />} />
              {state.login === "ADMIN" ? (
                <>
                  <Route
                    path="DanhSachKhachHangDatVe"
                    element={<DanhSachKhachHangDatVe />}
                  />
                  <Route path="LichSuDatVe" element={<LichSuDatVe />} />
                </>
              ) : (
                <></>
              )}
            </Route>
            {/* Hiển thị danh sách đặt chỗ*/}
            <Route>
              {state.login !== "" ? (
                <>
                  <Route path="DatCho" element={<DatCho />} />
                </>
              ) : (
                <></>
              )}
            </Route>
            {/* Quản lý người dùng và thống kê */}
            <Route>
              {state.login === "ADMIN" ? (
                <>
                  <Route path="QuanLyNguoiDung" element={<QuanLyNguoiDung />} />
                  <Route path="BarChart" element={<BarChart on={on} />} />
                </>
              ) : (
                <></>
              )}

              {state.login !== "" ? (
                <>
                  <Route path="Logout" element={<Logout />} />
                  <Route
                    path="SuaThongTinCaNhan"
                    element={<SuaThongTinCaNhan />}
                  />
                  <Route path="ThayDoiMatKhau" element={<ThayDoiMatKhau />} />
                </>
              ) : (
                <>
                  <Route path="Login" element={<Login />} />
                  <Route path="DangKy" element={<DangKy />} />
                  <Route path="GuiEmail" element={<GuiEmail />} />
                  <Route
                    path="ThietLapMatKhauMoi"
                    element={<ThietLapMatKhauMoi />}
                  />
                </>
              )}
            </Route>
            {/* Hóa Đơn */}
            <Route>
              {state.login !== "" ? (
                <>
                  <Route path="ThanhToan" element={<HoaDon />} />
                  <Route path="ThanhCong" element={<ThanhToanThanhCong />} />
                </>
              ) : (
                <></>
              )}
            </Route>
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
          <Footer on={on} />
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}
export default Controller;