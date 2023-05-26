import React, { useEffect, useState } from 'react';
import "./Register.css";
import plane from "../../../Assets/planeDC.png";
import logo from "../../../Assets/logo.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Register() {
    const [quocTichList, setQuocTichList] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8080/nguoi-dung/danh-sach-quoc-tich')
            .then(response => setQuocTichList(response.data));
    }, []);

    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [tenTaiKhoanInput, setTenTaiKhoanInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [soDienThoaiInput, setSoDienThoaiInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [hoVaTenInput, setHoVaTenInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [ngaySinhInput, setNgaySinhInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [gioiTinhInput, setGioiTinhInput] = useState({
        inputValue: 'Nam',
        checkedButton: 'Nam',
    });
    const [hoChieuInput, setHoChieuInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [diaChiInput, setDiaChiInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [quocTichInput, setQuocTichInput] = useState({
        inputValue: '0',
        errorMessage: '',
    });
    const [matKhauInput, setMatKhauInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [nhapLaiMatKhauInput, setNhapLaiMatKhauInput] = useState({
        inputValue: '',
        errorMessage: '',
    });

    function handleFormSubmit(event) {
        event.preventDefault();

        if (validateFormInput()) {
            let formData = new FormData();
            formData.append('diaChiEmail', emailInput.inputValue);
            formData.append('tenTaiKhoan', tenTaiKhoanInput.inputValue);
            formData.append('soDienThoai', soDienThoaiInput.inputValue);
            formData.append('matKhau', matKhauInput.inputValue);
            formData.append('gioiTinh', gioiTinhInput.inputValue);
            formData.append('hoVaTen', hoVaTenInput.inputValue);
            formData.append('ngaySinh', ngaySinhInput.inputValue);
            formData.append('hoChieu', hoChieuInput.inputValue);
            formData.append('diaChi', diaChiInput.inputValue);
            formData.append('quocTich', quocTichInput.inputValue);
            axios
                .post('http://localhost:8080/nguoi-dung/dang-ky', formData)
                .then(response => {
                    navigate('/');
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setEmailInput({
                            ...emailInput,
                            errorMessage: 'Email đã tồn tại'
                        });
                    }
                });
        }
    }

    function validateFormInput() {
        let isValid = true;

        if (!validateEmail(emailInput.inputValue)) {
            isValid = false;
            setEmailInput({
                ...emailInput,
                errorMessage: 'Email không hợp lệ',
            });
        }

        if (!validateTenTaiKhoan(tenTaiKhoanInput.inputValue)) {
            isValid = false;
            setTenTaiKhoanInput({
                ...tenTaiKhoanInput,
                errorMessage: 'Tên tài khoản không hợp lệ',
            });
        }

        if (!validateSoDienThoai(soDienThoaiInput.inputValue)) {
            isValid = false;
            setSoDienThoaiInput({
                ...soDienThoaiInput,
                errorMessage: 'Số điện thoại không hợp lệ',
            });
        }

        if (!validateHoVaTen(hoVaTenInput.inputValue)) {
            isValid = false;
            setHoVaTenInput({
                ...hoVaTenInput,
                errorMessage: 'Họ và tên không hợp lệ',
            });
        }

        if (!validateNgaySinh(ngaySinhInput.inputValue)) {
            isValid = false;
            setNgaySinhInput({
                ...ngaySinhInput,
                errorMessage: 'Ngày sinh không hợp lệ',
            });
        }

        if (!validateHoChieu(hoChieuInput.inputValue)) {
            isValid = false;
            setHoChieuInput({
                ...hoChieuInput,
                errorMessage: 'Số CMND/CCCD không hợp lệ',
            });
        }

        if (!validateDiaChi(diaChiInput.inputValue)) {
            isValid = false;
            setDiaChiInput({
                ...diaChiInput,
                errorMessage: 'Địa chỉ không hợp lệ',
            });
        }

        if (!validateQuocTich(quocTichInput.inputValue)) {
            isValid = false;
            setQuocTichInput({
                ...quocTichInput,
                errorMessage: 'Quốc tịch không hợp lệ',
            });
        }

        if (!validateMatKhau(matKhauInput.inputValue)) {
            isValid = false;
            setMatKhauInput({
                ...matKhauInput,
                errorMessage: 'Mật khẩu không hợp lệ',
            });
        }
        else if (!validateTrungKhopMatKhau(matKhauInput.inputValue, nhapLaiMatKhauInput.inputValue)) {
            isValid = false;
            setMatKhauInput({
                ...matKhauInput,
                errorMessage: 'Mật khẩu và nhập lại mật khẩu không trùng',
            });
            setNhapLaiMatKhauInput({
                ...nhapLaiMatKhauInput,
                errorMessage: 'Mật khẩu và nhập lại mật khẩu không trùng',
            });
        }

        if (!validateNhapLaiMatKhau(nhapLaiMatKhauInput.inputValue)) {
            isValid = false;
            setNhapLaiMatKhauInput({
                ...nhapLaiMatKhauInput,
                errorMessage: 'Nhập lại mật khẩu không hợp lệ',
            });
        }
        else if (!validateTrungKhopMatKhau(matKhauInput.inputValue, nhapLaiMatKhauInput.inputValue)) {
            isValid = false;
            setMatKhauInput({
                ...matKhauInput,
                errorMessage: 'Mật khẩu và nhập lại mật khẩu không trùng',
            });
            setNhapLaiMatKhauInput({
                ...nhapLaiMatKhauInput,
                errorMessage: 'Mật khẩu và nhập lại mật khẩu không trùng',
            });
        }

        return isValid;
    }

    function validateEmail(email) {
        let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return pattern.test(email);
    }

    function validateTenTaiKhoan(tenTaiKhoan) {
        let pattern = /^[\w_]{1,30}$/;
        return pattern.test(tenTaiKhoan);
    }

    function validateSoDienThoai(soDienThoai) {
        let pattern = /^0[\d]{9}$/;
        return pattern.test(soDienThoai);
    }

    function validateHoVaTen(hoVaTen) {
        let pattern = /^[\p{L} ]{1,50}$/u;
        return pattern.test(hoVaTen);
    }

    function validateNgaySinh(ngaySinh) {
        let pattern = /^\d{4}-\d{2}-\d{2}$/;
        return pattern.test(ngaySinh);
    }

    function validateHoChieu(hoChieu) {
        let pattern = /^((\d{9})|(\d{12}))$/;
        return pattern.test(hoChieu);
    }

    function validateDiaChi(diaChi) {
        let pattern = /^[\p{L} \d,]+$/u;
        return pattern.test(diaChi);
    }

    function validateQuocTich(quocTich) {
        return quocTich !== '0';
    }

    function validateMatKhau(matKhau) {
        return matKhau.length > 0;
    }

    function validateNhapLaiMatKhau(nhapLaiMatKhau) {
        return nhapLaiMatKhau.length > 0;
    }

    function validateTrungKhopMatKhau(matKhau, nhapLaiMatKhau) {
        return matKhau === nhapLaiMatKhau;
    }

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
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ email"
                                                onChange={event => setEmailInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{emailInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập tên tài khoản"
                                                onChange={event => setTenTaiKhoanInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{tenTaiKhoanInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại"
                                                onChange={event => setSoDienThoaiInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{soDienThoaiInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập họ và tên"
                                                onChange={event => setHoVaTenInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{hoVaTenInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="date"
                                                className="form-control"
                                                onChange={event => setNgaySinhInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{ngaySinhInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <div className="maxl">
                                                <label className="radio inline">
                                                    <input
                                                        type="radio"
                                                        checked={gioiTinhInput.checkedButton === 'Nam'}
                                                        onChange={() => setGioiTinhInput({
                                                            inputValue: 'Nam',
                                                            checkedButton: 'Nam'
                                                        })}
                                                    />
                                                    <span>Nam</span>
                                                </label>
                                                <label className="radio1 inline">
                                                    <input
                                                        type="radio"
                                                        checked={gioiTinhInput.checkedButton === 'Nữ'}
                                                        onChange={() => setGioiTinhInput({
                                                            inputValue: 'Nữ',
                                                            checkedButton: 'Nữ'
                                                        })}
                                                    />
                                                    <span>Nữ</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập số CMND/CCCD"
                                                onChange={event => setHoChieuInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value
                                                })}
                                            />
                                            <p>{hoChieuInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ"
                                                onChange={event => setDiaChiInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{diaChiInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group" >
                                            <select
                                                className='form-select'
                                                value={quocTichInput.inputValue}
                                                onChange={(event) => setQuocTichInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value
                                                })}
                                            >
                                                <option value={0} key={0}>Chọn quốc gia của bạn</option>
                                                {quocTichList.map(quocTich => (
                                                    <option value={quocTich.maQuocTich} key={quocTich.maQuocTich}>{quocTich.tenQuocTich}</option>
                                                ))}
                                            </select>
                                            <p>{quocTichInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập mật khẩu"
                                                onChange={event => setMatKhauInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{matKhauInput.errorMessage}</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập lại mật khẩu"
                                                onChange={event => setNhapLaiMatKhauInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <p>{nhapLaiMatKhauInput.errorMessage}</p>
                                        </div>
                                        <button className="btnRegister" onClick={handleFormSubmit}>Đăng ký</button>
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
