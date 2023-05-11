import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Commons/Navbar";
import Body from "./components/Commons/Body";
import Footer from "./components/Commons/Footer";
import CapNhatChuyenBay from "./components/ChuyenBay/CapNhatChuyenBay.js";
import DanhSachChuyenBay from "./components/ChuyenBay/DanhSachChuyenBay.js";
import ThemMoiChuyenBay from "./components/ChuyenBay/ThemMoiChuyenBay.js";
import TimKiemChuyenBay from "./components/ChuyenBay/DanhSachTimKiemChuyenBay.js";
import ThongTinKhachHangDatVe from "./components/DatVeMayBay/ThongTinKhachHangDatVe.js";

function Controller() {
  return (
    <div className="Controller">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
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
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default Controller;
