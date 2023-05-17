import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import "./Controller.css";

function Controller() {
  return (
    <div className="Controller">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Thêm mới chuyến bay */}
          <Route>
            <Route path="ThemChuyenBay" element={<ThemMoiChuyenBay />} />
            <Route path="CapNhatChuyenBay" element={<CapNhatChuyenBay />} />
            <Route path="DanhSachChuyenBay" element={<DanhSachChuyenBay />} />
            <Route path="TimKiemChuyenBay" element={<TimKiemChuyenBay />} />
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
          </Route>
             {/* Quản lý người dùng và thống kê */}
             <Route>
            <Route path="QuanLyNguoiDung" element={<QuanLyNguoiDung/>} />

          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default Controller;
