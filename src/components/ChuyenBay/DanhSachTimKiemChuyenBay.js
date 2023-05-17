import React from "react";
import { Link, useLocation } from "react-router-dom";
import DSTimKiemCBCSS from "../../styles/ChuyenBayCSS/DSTimKiemCB.css";
function DanhSachTimKiemChuyenBay() {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <div className="container my-4 xxx  ">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sắp Xếp Theo
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
      <div className="row my-4 ">
         <div className="col-md-2 shadow " style={{background:"linear-gradient( to right,hsl(187, 85%, 43%),hsl(199, 100%, 33%)"}}>
         </div>
        <div className="col-md-10 pd-5">
          <div className="card my-2 hover-ds">
            <div className="card-body card-bo" >
              <div className="row ">
                <div className="col-md-2">
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đi:</strong> SGN
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ cất cánh :</strong> 1 h 15
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2" style={{textAlign:"center"}}><i class='bx bx-transfer-alt' style={{fontSize:"1.5rem",color:"goldenrod"}}></i></div>
                <div className="col-md-2">
                <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đến:</strong>GND
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ hạ cánh :</strong> 3 h 15
                  </p>
                  <p style={{fontSize:"0.8rem"}}>
                    <strong>Thời gian bay :</strong> 3 h
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"blue"}}>Khoang Phổ thông</h5>
                      <p className="card-text " style={{textAlign:"center", marginBottom: "0rem",fontSize:"0.8rem"}}> 866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"goldenrod"}}>Khoang Thương gia</h5>
                      <p className="card-text " style={{textAlign:"center",marginBottom: "0rem",fontSize:"0.8rem"}}> 2.866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card my-2 hover-ds">
            <div className="card-body card-bo " >
              <div className="row ">
                <div className="col-md-2">
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đi:</strong> SGN
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ cất cánh :</strong> 1 h 15
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2" style={{textAlign:"center"}}><i class='bx bx-transfer-alt' style={{fontSize:"1.5rem",color:"goldenrod"}}></i></div>
                <div className="col-md-2">
                <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đến:</strong>GND
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ hạ cánh :</strong> 3 h 15
                  </p>
                  <p style={{fontSize:"0.8rem"}}>
                    <strong>Thời gian bay :</strong> 3 h
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"blue"}}>Khoang Phổ thông</h5>
                      <p className="card-text " style={{textAlign:"center", marginBottom: "0rem",fontSize:"0.8rem"}}> 866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"goldenrod"}}>Khoang Thương gia</h5>
                      <p className="card-text " style={{textAlign:"center",marginBottom: "0rem",fontSize:"0.8rem"}}> 2.866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card my-2 hover-ds">
            <div className="card-body card-bo" >
              <div className="row ">
                <div className="col-md-2">
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đi:</strong> SGN
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ cất cánh :</strong> 1 h 15
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2" style={{textAlign:"center"}}><i class='bx bx-transfer-alt' style={{fontSize:"1.5rem",color:"goldenrod"}}></i></div>
                <div className="col-md-2">
                <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đến:</strong>GND
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ hạ cánh :</strong> 3 h 15
                  </p>
                  <p style={{fontSize:"0.8rem"}}>
                    <strong>Thời gian bay :</strong> 3 h
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"blue"}}>Khoang Phổ thông</h5>
                      <p className="card-text " style={{textAlign:"center", marginBottom: "0rem",fontSize:"0.8rem"}}> 866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"goldenrod"}}>Khoang Thương gia</h5>
                      <p className="card-text " style={{textAlign:"center",marginBottom: "0rem",fontSize:"0.8rem"}}> 2.866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card my-2 hover-ds">
            <div className="card-body card-bo " >
              <div className="row ">
                <div className="col-md-2">
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đi:</strong> SGN
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ cất cánh :</strong> 1 h 15
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2" style={{textAlign:"center"}}><i class='bx bx-transfer-alt' style={{fontSize:"1.5rem",color:"goldenrod"}}></i></div>
                <div className="col-md-2">
                <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đến:</strong>GND
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ hạ cánh :</strong> 3 h 15
                  </p>
                  <p style={{fontSize:"0.8rem"}}>
                    <strong>Thời gian bay :</strong> 3 h
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"blue"}}>Khoang Phổ thông</h5>
                      <p className="card-text " style={{textAlign:"center", marginBottom: "0rem",fontSize:"0.8rem"}}> 866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"goldenrod"}}>Khoang Thương gia</h5>
                      <p className="card-text " style={{textAlign:"center",marginBottom: "0rem",fontSize:"0.8rem"}}> 2.866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                 <div className="card my-2 hover-ds">
            <div className="card-body card-bo" >
              <div className="row ">
                <div className="col-md-2">
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đi:</strong> SGN
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ cất cánh :</strong> 1 h 15
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Hãng hàng không:</strong> Vietnam Airlines
                  </p>
                </div>
                <div className="col-md-2" style={{textAlign:"center"}}><i class='bx bx-transfer-alt' style={{fontSize:"1.5rem",color:"goldenrod"}}></i></div>
                <div className="col-md-2">
                <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong style={{fontSize:"0.8rem",color:"blue"}}>Sân bay đến:</strong>GND
                  </p>
                  <p style={{fontSize:"0.8rem",marginBottom:"0.4rem"}}>
                    <strong>Giờ hạ cánh :</strong> 3 h 15
                  </p>
                  <p style={{fontSize:"0.8rem"}}>
                    <strong>Thời gian bay :</strong> 3 h
                  </p>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"blue"}}>Khoang Phổ thông</h5>
                      <p className="card-text " style={{textAlign:"center", marginBottom: "0rem",fontSize:"0.8rem"}}> 866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <div
                    className="card my-1"
                    style={{ backgroundColor: "#f4f9f5", borderRadius: "10px" }}
                  >
                    <div className="card-body dat-ve " style={{padding:"0.5rem"}}>
                      <h5 className="card-title " style={{fontSize:"1rem",color:"goldenrod"}}>Khoang Thương gia</h5>
                      <p className="card-text " style={{textAlign:"center",marginBottom: "0rem",fontSize:"0.8rem"}}> 2.866,000 VND</p>
                      <p className="card-text" style={{fontSize:"0.6rem"}}>Còn 3 ghế</p>
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
