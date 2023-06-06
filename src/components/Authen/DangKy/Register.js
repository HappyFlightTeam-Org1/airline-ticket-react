import React, { useContext, useEffect, useState } from 'react';
import "./Register.css";
import plane from "../../../Assets/planeDC.png";
import logo from "../../../Assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginContext from '../../../loginGlobalState/LoginContext';

export default function Register() {
    const [quocTichList, setQuocTichList] = useState([]);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const navigate = useNavigate();
    const { state, dispatch } = useContext(LoginContext);

    useEffect(() => {
        axios
            .get('http://localhost:8080/nguoi-dung/danh-sach-quoc-tich')
            .then(response => setQuocTichList(response.data));
    }, []);

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

        if (validateFormInput() && isValidEmail) {
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
                    toast.success(`Đăng ký thành công! Giờ bạn có thể đăng nhập bằng tên tài khoản ${tenTaiKhoanInput.inputValue}`);
                    navigate('/Login');
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setEmailInput({
                            ...emailInput,
                            errorMessage: 'Email đã tồn tại'
                        });
                    }
                    else {
                        toast.error('Có lỗi đã xảy ra');
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
                errorMessage: 'Định dạng email không hợp lệ',
            });
            setIsValidEmail(false);
        }
        else {
            validateDuplicateEmail(emailInput.inputValue);
        }


        if (!validateTenTaiKhoan(tenTaiKhoanInput.inputValue)) {
            isValid = false;
            setTenTaiKhoanInput({
                ...tenTaiKhoanInput,
                errorMessage: 'Tên tài khoản không hợp lệ. Tên tài khoản hợp lệ có độ dài trong 30 kí tự, chứa các chữ cái tiếng Anh, chữ số và dấu _ (gạch dưới)',
            });
        }

        if (!validateSoDienThoai(soDienThoaiInput.inputValue)) {
            isValid = false;
            setSoDienThoaiInput({
                ...soDienThoaiInput,
                errorMessage: 'Số điện thoại không hợp lệ. Số điện thoại gồm 10 chữ số, bắt đầu bằng số 03, 05, 07, 08, 09.',
            });
        }

        if (!validateHoVaTen(hoVaTenInput.inputValue)) {
            isValid = false;
            setHoVaTenInput({
                ...hoVaTenInput,
                errorMessage: 'Họ và tên không hợp lệ. Họ và tên chỉ gồm các chữ cái.',
            });
        }

        if (!validateNgaySinh(ngaySinhInput.inputValue)) {
            isValid = false;
            setNgaySinhInput({
                ...ngaySinhInput,
                errorMessage: 'Ngày sinh không hợp lệ. Người dùng phải trên 14 tuổi và sinh sau năm 1900.',
            });
        }

        if (!validateHoChieu(hoChieuInput.inputValue)) {
            isValid = false;
            setHoChieuInput({
                ...hoChieuInput,
                errorMessage: 'Số CMND/CCCD không hợp lệ. Số CMND (9 số) hoặc CCCD (12 số)',
            });
        }

        if (!validateDiaChi(diaChiInput.inputValue)) {
            isValid = false;
            setDiaChiInput({
                ...diaChiInput,
                errorMessage: 'Địa chỉ không hợp lệ. Địa chỉ gồm chữ số, chữ cái, dấu , (dấu phẩy), dấu - (dấu gạch ngang)',
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
                errorMessage: 'Mật khẩu không hợp lệ. Mật khẩu có độ dài từ 6-20 kí tự, có ít nhất: 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 kí tự đặc biệt (#?!@$%^&*-)',
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
                errorMessage: 'Nhập lại mật khẩu không hợp lệ. Mật khẩu có độ dài từ 6-20 kí tự, có ít nhất: 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 kí tự đặc biệt (#?!@$%^&*-)',
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

    function validateDuplicateEmail(email) {
        let formData = new FormData();
        formData.append('email', email);
        axios
            .post('http://localhost:8080/nguoi-dung/validate-email', formData)
            .then(response => {
                if (response.data.message === 'This email is exist') {
                    setEmailInput({
                        ...emailInput,
                        errorMessage: 'Email này đã có người sử dụng',
                    });
                    setIsValidEmail(false);
                }
            })
            .catch(err => toast.error('Có lỗi đã xảy ra'));
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
        if (!validateDate(ngaySinh)) {
            return false;
        }

        const [year, month, day] = ngaySinh.split('-');
        const parsedDate = new Date(year, month - 1, day);
        const todayDate = new Date();

        if (!parsedDate) {
            return false;
        }

        if (parsedDate.getFullYear() > todayDate.getFullYear()) {
            return false;
        }

        if (parsedDate.getFullYear() === todayDate.getFullYear()) {
            if (parsedDate.getMonth() > todayDate.getMonth()) {
                return false;
            }

            if (parsedDate.getMonth() === todayDate.getMonth()) {
                if (parsedDate.getDate() > todayDate.getDate()) {
                    return false;
                }
            }
        }

        let age = todayDate.getFullYear() - parsedDate.getFullYear();
        if (
            todayDate.getMonth() < parsedDate.getMonth() ||
            (todayDate.getMonth() === parsedDate.getMonth() && todayDate.getDay() < parsedDate.getDay())
        ) {
            age -= 1;
        }

        if (age < 14) {
            return false;
        }

        return true;
    }

    function validateDate(ngaySinh) {
        let pattern = /^(19|20)\d{2}-\d{2}-\d{2}$/;
        return pattern.test(ngaySinh);
    }

    function validateHoChieu(hoChieu) {
        let cccdPattern = /^[0-2]\d{10}[1-9]$/;
        let cmndPattern = /^0[1-8]\d{7}|(09[0-2|5])\d{6}|1\d{8}|2[0-79]\d{7}|28[015]\d{6}|3[0-8]\d{7}$/;
        return cccdPattern.test(hoChieu) || cmndPattern.test(hoChieu);
    }

    function validateDiaChi(diaChi) {
        let pattern = /^[\p{L} \d,-]+$/u;
        return pattern.test(diaChi);
    }

    function validateQuocTich(quocTich) {
        return quocTich !== '0';
    }

    function validateMatKhau(matKhau) {
        let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
        return pattern.test(matKhau);
    }

    function validateNhapLaiMatKhau(nhapLaiMatKhau) {
        let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
        return pattern.test(nhapLaiMatKhau);
    }

    function validateTrungKhopMatKhau(matKhau, nhapLaiMatKhau) {
        return matKhau === nhapLaiMatKhau;
    }

    if (state.login === "") 
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
                        <Link to="/Login" className='btn btn-light login'>Đăng nhập</Link><br/>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Đăng Ký</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='form-label'>
                                                Email <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ email"
                                                onChange={event => {
                                                    setEmailInput({
                                                        errorMessage: '',
                                                        inputValue: event.target.value,
                                                    });
                                                    setIsValidEmail(true);
                                                }}
                                            />
                                            <div className='form-text text-danger'>{emailInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Tên tài khoản <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập tên tài khoản"
                                                onChange={event => setTenTaiKhoanInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <div className='form-text text-danger'>{tenTaiKhoanInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Số điện thoại <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại"
                                                onChange={event => setSoDienThoaiInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <div className='form-text text-danger'>{soDienThoaiInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Họ và tên <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập họ và tên"
                                                onChange={event => setHoVaTenInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <div className='form-text text-danger'>{hoVaTenInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Ngày sinh <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                onChange={event => setNgaySinhInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <div className='form-text text-danger'>{ngaySinhInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Giới tính <span className='text-danger'>(*)</span>
                                            </label>
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
                                            <label className='form-label'>
                                                Số CMND/CCCD <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập số CMND/CCCD"
                                                onChange={event => setHoChieuInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value
                                                })}
                                            />
                                            <div className='form-text text-danger'>{hoChieuInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Địa chỉ <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ"
                                                onChange={event => setDiaChiInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <div className='form-text text-danger'>{diaChiInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Quốc gia <span className='text-danger'>(*)</span>
                                            </label>
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
                                            <div className='form-text text-danger'>{quocTichInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Mật khẩu <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Nhập mật khẩu"
                                                onChange={event => setMatKhauInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <div className='form-text text-danger'>{matKhauInput.errorMessage}</div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className='form-label'>
                                                Nhập lại mật khẩu <span className='text-danger'>(*)</span>
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Nhập lại mật khẩu"
                                                onChange={event => setNhapLaiMatKhauInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                            />
                                            <div className='form-text text-danger'>{nhapLaiMatKhauInput.errorMessage}</div>
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
  else return (
    <>
    </>
  )
}
