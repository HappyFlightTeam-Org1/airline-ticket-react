import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import LoginContext from "../../../loginGlobalState/LoginContext";

export default function Login() {
  const navigate = useNavigate();
  const [tenDangNhapInput, setTenDangNhapInput] = useState({
    inputValue: "",
    errorMessage: "",
  });
  const [matKhauInput, setMatKhauInput] = useState({
    inputValue: "",
    errorMessage: "",
  });
  const { state, dispatch } = useContext(LoginContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (validateFormInput()) {
      let formData = new FormData();
      formData.append("tenTaiKhoan", tenDangNhapInput.inputValue);
      formData.append("matKhau", matKhauInput.inputValue);
      axios
        .post("http://localhost:8080/nguoi-dung/dang-nhap", formData)
        .then((response) => {
          Cookies.set("jwt", response.data.jwt, { expires: 30 });
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("account", tenDangNhapInput.inputValue);
          if (response.data.role === "ROLE_USER") {
            localStorage.setItem("login", "user");
            dispatch({ type: "USER" });
          } else {
            dispatch({ type: "ADMIN" });
            localStorage.setItem("login", "admin");
          }
          toast.success("Đăng nhập thành công");
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setTenDangNhapInput({
              ...tenDangNhapInput,
              errorMessage: "Sai tên tài khoản hoặc mật khẩu",
            });
            setMatKhauInput({
              ...matKhauInput,
              errorMessage: "Sai tên tài khoản hoặc mật khẩu",
            });
          } else {
            toast.error("Có lỗi đã xảy ra");
          }
        });
    }
  }

  function validateFormInput() {
    let isValid = true;

    if (!validateTenDangNhap(tenDangNhapInput.inputValue)) {
      isValid = false;
      setTenDangNhapInput({
        ...tenDangNhapInput,
        errorMessage: "Tên tài khoản không hợp lệ",
      });
    }

    if (!validateMatKhau(matKhauInput.inputValue)) {
      isValid = false;
      setMatKhauInput({
        ...matKhauInput,
        errorMessage: "Mật khẩu không hợp lệ",
      });
    }

    return isValid;
  }

  function validateTenDangNhap(tenDangNhap) {
    let pattern = /^[\w_]{1,30}$/;
    return pattern.test(tenDangNhap);
  }

  function validateMatKhau(matKhau) {
    return matKhau.length > 0;
  }

  return (
    <div>
      <div className="dangnhap">
        <div className="row px-3">
          <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
            <div className="img-left d-none d-md-flex"></div>

            <div className="card-body">
              <h4 className="title text-center mt-4">Đăng Nhập</h4>
              <form className="form-box px-3">
                <div className="form-input">
                  <span>
                    <i class="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Tên Tài Khoản"
                    onChange={(event) =>
                      setTenDangNhapInput({
                        errorMessage: "",
                        inputValue: event.target.value,
                      })
                    }
                  />
                </div>
                <p>{tenDangNhapInput.errorMessage}</p>
                <div className="form-input">
                  <span>
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type="password"
                    placeholder="Mật Khẩu"
                    onChange={(event) =>
                      setMatKhauInput({
                        errorMessage: "",
                        inputValue: event.target.value,
                      })
                    }
                  />
                </div>
                <p>{matKhauInput.errorMessage}</p>
                <div className="form-input">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-block text-uppercase"
                  >
                    Đăng nhập
                  </button>
                </div>

                <div className="text-right d-flex justify-content-center align-items-center">
                  <Link to="/GuiEmail" className="forget-link">
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="row mb-3">
                  <div className="col-4 d-flex justify-content-center align-items-center">
                    <a
                      href="#"
                      className="btn btn-block btn-social btn-facebook"
                    >
                      Facebook
                    </a>
                  </div>

                  <div className="col-4 d-flex justify-content-center align-items-center">
                    <a href="#" className="btn btn-block btn-social btn-google">
                      Google
                    </a>
                  </div>

                  <div className="col-4 d-flex justify-content-center align-items-center">
                    <a
                      href="#"
                      className="btn btn-block btn-social btn-twitter"
                    >
                      Twitter
                    </a>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="text-center mb-2">
                  Bạn chưa có tài khoản?{" "}
                  <Link to="/DangKy" className="register-link">
                    Đăng ký tại đây
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
