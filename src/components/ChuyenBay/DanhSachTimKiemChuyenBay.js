import React from "react";
import { Link, useLocation } from "react-router-dom";
import DSTimKiemCBCSS from "../../styles/ChuyenBayCSS/DSTimKiemCB.css";
function DanhSachTimKiemChuyenBay() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <div className="container my-4 xxx  ">
      <h3 style={{ color: "orange" }}>Thông tin chuyến bay (3 KẾT QUẢ)</h3>
      <hr />
      <div className="row my-4 ">
         <div className="col-md-2 bg-primary ">
         <div class="dropdown mt-2 ms-2">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Sắp Xếp Theo
            </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
</div>
         </div>
        <div className="col-md-10 pd-5">
          <div className="card my-2 hover-ds">
            <div className="card-body ">
              <div className="row ">
                <div className="col-md-2">
                  <p>
                    <strong>Sân bay đi:</strong> SGN
                  </p>
                  <p>
                    <strong>Thời gian bay:</strong> 1 tiếng 15 phút
                  </p>
                  <p>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Sân bay đến:</strong> CXR
                  </p>
                  <p>
                    <strong>Loại chuyến bay:</strong> Bay thẳng
                  </p>
                  <p>
                    <strong>Số chuyến bay:</strong> VN 1346
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Loại máy bay:</strong> Airbus A359
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-2"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve ">
                      <h5 className="card-title">Khoang Phổ thông</h5>
                      <p className="card-text">Giá: TỪ 866,000 VND</p>
                      <Link
                        as={Link}
                        to="/ThongTinKhachHangDatVe"
                        className="text-white"
                        style={{ textDecoration: "none" }}
                      >
                        <a href="#" className="btn  btn-success">
                          Chọn
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 ">
                  <div
                    className="card my-2"
                    style={{ backgroundColor: "#FBF9E4", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve">
                      <h5 className="card-title">Khoang Thương gia</h5>
                      <p className="card-text">Giá: TỪ 3,319,000 VND</p>
                      <Link
                        as={Link}
                        to="/ThongTinKhachHangDatVe"
                        className="text-white"
                        style={{ textDecoration: "none" }}
                      >
                        <a href="#" className="btn  btn-success">
                          Chọn
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card my-2 hover-ds">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Sân bay đi:</strong> SGN
                  </p>
                  <p>
                    <strong>Thời gian bay:</strong> 1 tiếng 15 phút
                  </p>
                  <p>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Sân bay đến:</strong> CXR
                  </p>
                  <p>
                    <strong>Loại chuyến bay:</strong> Bay thẳng
                  </p>
                  <p>
                    <strong>Số chuyến bay:</strong> VN 1346
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Loại máy bay:</strong> Airbus A359
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-2"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve">
                      <h5 className="card-title">Khoang Phổ thông</h5>
                      <p className="card-text">Giá: TỪ 866,000 VND</p>
                      <a href="#" className="btn btn-success">
                        Chọn
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 ">
                  <div
                    className="card my-2"
                    style={{ backgroundColor: "#FBF9E4", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve">
                      <h5 className="card-title">Khoang Thương gia</h5>
                      <p className="card-text">Giá: TỪ 3,319,000 VND</p>
                      <a href="#" className="btn  btn-success">
                        Chọn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card my-2 hover-ds">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <p>
                    <strong>Sân bay đi:</strong> SGN
                  </p>
                  <p>
                    <strong>Thời gian bay:</strong> 1 tiếng 15 phút
                  </p>
                  <p>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Sân bay đến:</strong> CXR
                  </p>
                  <p>
                    <strong>Loại chuyến bay:</strong> Bay thẳng
                  </p>
                  <p>
                    <strong>Số chuyến bay:</strong> VN 1346
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Loại máy bay:</strong> Airbus A359
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-2"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve ">
                      <h5 className="card-title">Khoang Phổ thông</h5>
                      <p className="card-text">Giá: TỪ 866,000 VND</p>
                      <a href="#" className="btn  btn-success">
                        Chọn
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 ">
                  <div
                    className="card my-2"
                    style={{ backgroundColor: "#FBF9E4", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve">
                      <h5 className="card-title">Khoang Thương gia</h5>
                      <p className="card-text">Giá: TỪ 3,319,000 VND</p>
                      <a href="#" className="btn  btn-success">
                        Chọn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DanhSachTimKiemChuyenBay;
