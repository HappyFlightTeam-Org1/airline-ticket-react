import React from 'react';
import "./Navbar.css";
export default function Navbar() {
  return (
    <div>
    <header>
    <nav className ="navbar navbar-expand-lg " >
      <div className="container-fluid">
          <div className='logoDiv'>
                   <a href="#" className='logo flex'>
                   <i class='bx bxs-plane-alt'></i>
                     <h2>Fresher</h2>
                   </a>
            </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Trang Chủ</a>
            </li>
            <li className="nav-item" >
                 <a className="nav-link" href="#">Tin Tức</a>
            </li>
            <li className="nav-item">
                 <a  className="nav-link" href="#">Dịch Vụ Chuyến Bay</a>
            </li>
            <li className="nav-item">
                 <a className="nav-link" href="#">Liên Hệ</a>
            </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 login">
            <li className="nav-item">
                 <a className="nav-link" href="#">Đăng nhập</a>
            </li>
            <li className="nav-item">
                 <a className="nav-link" href="#">Đăng ký</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
      </div>
  )
}
