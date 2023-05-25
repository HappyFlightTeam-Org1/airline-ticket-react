import React from 'react';
import "./Register.css";
import plane from "../../../Assets/planeDC.png";
import logo from "../../../Assets/logo.png";
export default function Register() {
  return (
    <div className='dangky'>
      <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                      <div className='plane'>
                          <img src={plane} alt=""/>
                      </div>
                        <h3>Welcome</h3>
                        <p><img src={logo} alt=""/></p>
                        <input type="submit" name="" value="Đăng Nhập"/><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Đăng Ký</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Nhập địa chỉ email" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Nhập tên tài khoản" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Nhập số điện thoại" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control"  placeholder="Nhập họ và tên" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="date" className="form-control"  placeholder="" value="" />
                                        </div>
                                        <div className="form-group">
                                            <div className="maxl">
                                                <label className="radio inline">
                                                    <input type="radio" name="gender" value="male" checked/>
                                                    <span>Nam </span>
                                                </label>
                                                <label className="radio1 inline">
                                                    <input type="radio" name="gender" value="female"/>
                                                    <span>Nữ </span>
                                                </label>
                                                <label className="radio1 inline">
                                                    <input type="radio" name="gender" value="female"/>
                                                    <span>Khác</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Nhập số CMND/CCCD" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" className="form-control" placeholder="Nhập địa chỉ" value="" />
                                        </div>
                                        <div className="form-group" >
                                            <select className="form-select">
                                                <option className="hidden"  selected disabled>Chọn quốc gia của bạn</option>
                                                <option>Việt Nam</option>
                                                <option>Thái Lan</option>
                                                <option>Lào</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Nhập mật khẩu" value="" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Nhập lại mật khẩu" value="" />
                                        </div>
                                        <input type="submit" className="btnRegister"  value="Đăng Ký"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
