import React from 'react';
import "./Login.css";

export default function Login() {
  return (
    <div>
    <div className="dangnhap">
    <div className="row px-3">
      <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
        <div className="img-left d-none d-md-flex"></div>

        <div className="card-body">
          <h4 className="title text-center mt-4">
             Đăng Nhập
          </h4>
          <form className="form-box px-3">
            <div className="form-input">
              <span><i class="fa-solid fa-user"></i></span>
              <input type="email" name="" placeholder="Tên Tài Khoản" tabindex="10" required/>
            </div>
            <div className="form-input">
              <span><i className="fa fa-key"></i></span>
              <input type="password" name="" placeholder="Mật Khẩu" required/>
            </div>
            <div className="form-input">
              <button type="submit" className="btn btn-block text-uppercase">
                Login
              </button>
            </div>

            <div className="text-right d-flex justify-content-center align-items-center">
              <a href="#" className="forget-link">
                Quên mật khẩu ?
              </a>
            </div>
            <div className="row mb-3">
              <div className="col-4 d-flex justify-content-center align-items-center">
                <a href="#" className="btn btn-block btn-social btn-facebook">
                  facebook
                </a>
              </div>

              <div className="col-4 d-flex justify-content-center align-items-center">
                <a href="#" className="btn btn-block btn-social btn-google">
                  google
                </a>
              </div>

              <div className="col-4 d-flex justify-content-center align-items-center">
                <a href="#" className="btn btn-block btn-social btn-twitter">
                  twitter
                </a>
              </div>
            </div>

            <hr className="my-4"/>

            <div className="text-center mb-2">
              Bạn chưa có tài khoản ?
               <a href="#" className="register-link">
                Đăng ký tại đây
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}
