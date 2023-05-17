import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Commons/Navbar/Navbar.js";
import Home from "./components/Commons/Home/Home.js";
import Footer from "./components/Commons/Footer/Footer.js";
import CapNhatChuyenBay from "./components/ChuyenBay/CapNhatChuyenBay.js";
import DanhSachChuyenBay from "./components/ChuyenBay/DanhSachChuyenBay.js";
import ThemMoiChuyenBay from "./components/ChuyenBay/ThemMoiChuyenBay.js";
import TimKiemChuyenBay from "./components/ChuyenBay/DanhSachTimKiemChuyenBay.js";
import ThongTinKhachHangDatVe from "./components/DatVeMayBay/ThongTinKhachHangDatVe.js";
import LichSuDatVe from "./components/VeMayBay/LichSuDatVe/LichSuDatVe.js";
import TimKiemVe from "./components/VeMayBay/TimKiemVe/TimKiemVe.js";
import "./Controller.css";
import HoaDon from "./components/ThanhToan/HoaDon.js";

function Controller() {
  return (
    <div className="Controller">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Thêm mới chuyến bay */}
          <Route>
            <Route path="ThemMoiChuyenBay" element={<ThemMoiChuyenBay />} />
            <Route path="CapNhatChuyenBay" element={<CapNhatChuyenBay />} />
            <Route path="DanhSachChuyenBay" element={<DanhSachChuyenBay />} />
            <Route path="TimKiemChuyenBay" element={<TimKiemChuyenBay />} />
          </Route>
          {/* Đặt vé */}
          <Route>
            <Route
              path="ThongTinKhachHangDatVe"
              element={<ThongTinKhachHangDatVe />}
            />
            <Route path="ThanhToan" element={<HoaDon />} />
          </Route>
          {/* Vé máy bay */}
          <Route>
            <Route path="LichSuDatVe" element={<LichSuDatVe />} />
            <Route path="TimKiemVe" element={<TimKiemVe />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default Controller;