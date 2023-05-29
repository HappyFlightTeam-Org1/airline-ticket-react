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
import HoaDon from "./components/ThanhToan/HoaDon.js";
import Login from "./components/Authen/DangNhap/Login";
import ThanhToanThanhCong from "./components/ThanhToan/ThanhToanThanhCong/ThanhToanThanhCong";
import InVeMayBay from "./components/VeMayBay/InVeMayBay/InVeMayBay";

import DangKy from "./components/Authen/DangKy/Register.js";

import React, { useState } from "react";
import GuiEmail from "./components/Authen/QuenMatKhau/GuiEmail.js";
import ThietLapMatKhauMoi from "./components/Authen/QuenMatKhau/ThietLapMatKhauMoi";
import SuaThongTinCaNhan from "./components/Authen/SuaThongTinCaNhan/SuaThongTinCaNhan";
import ThayDoiMatKhau from "./components/Authen/ThayDoiMatKhau/ThayDoiMatKhau.js";

function Controller() {
  const [on, setOn] = useState(false);

  const handleTogger = () => {
    setOn(!on);
    console.log(on);
  };
  return (
    <div className="Controller">
      <BrowserRouter>
        <Navbar handleTogger={handleTogger} on={on} />
        <Routes>
          <Route path="/" element={<Home on={on} />} />
          {/* Thêm mới chuyến bay */}
          <Route>
            <Route path="ThemChuyenBay" element={<ThemMoiChuyenBay />} />
            <Route path="CapNhatChuyenBay" element={<CapNhatChuyenBay />} />
            <Route path="DanhSachChuyenBay" element={<DanhSachChuyenBay />} />
            <Route path="TimKiemChuyenBay" element={<TimKiemChuyenBay />} />
            <Route path="HanhKhach" element={<HanhKhach />} />
          </Route>
          {/* Hành Khách */}
          <Route>
            <Route
              path="ThongTinKhachHangDatVe"
              element={<ThemHanhKhachDatVe />}
            />
            <Route
              path="DanhSachKhachHangDatVe"
              element={<DanhSachKhachHangDatVe />}
            />
            <Route path="LichSuDatVe" element={<LichSuDatVe />} />
            <Route path="TimKiemVe" element={<TimKiemVe />} />
            <Route path="InVe" element={<InVeMayBay />} />
          </Route>
          {/* Hiển thị danh sách đặt chỗ*/}
          <Route>
            <Route path="DatCho" element={<DatCho />} />
          </Route>
          {/* Quản lý người dùng và thống kê */}
          <Route>
            <Route path="QuanLyNguoiDung" element={<QuanLyNguoiDung />} />
            <Route path="Login" element={<Login />} />
            <Route path="DangKy" element={<DangKy />} />
            <Route path="BarChart" element={<BarChart on ={on} />} />
            <Route path="GuiEmail" element={< GuiEmail />} />
            <Route path="ThietLapMatKhauMoi" element={< ThietLapMatKhauMoi />} />
            <Route path="SuaThongTinCaNhan" element={< SuaThongTinCaNhan />} />
            <Route path="ThayDoiMatKhau" element={< ThayDoiMatKhau />} />
            <Route path="BarChart" element={<BarChart />} />
            <Route path="GuiEmail" element={<GuiEmail />} />
            <Route path="ThietLapMatKhauMoi" element={<ThietLapMatKhauMoi />} />
            <Route path="SuaThongTinCaNhan" element={<SuaThongTinCaNhan />} />
            <Route path="ThayDoiMatKhau" element={<ThayDoiMatKhau />} />
          </Route>
          {/* Hóa Đơn */}
          <Route>
            <Route path="ThanhToan" element={<HoaDon />} />
            <Route path="ThanhCong" element={<ThanhToanThanhCong />} />
          </Route>
        </Routes>
        <Footer on={on} />
      </BrowserRouter>
    </div>
  );
}
export default Controller;
