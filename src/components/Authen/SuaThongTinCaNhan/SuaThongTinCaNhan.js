import plane from "../../../Assets/planeDC.png";
import logo from "../../../Assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export default function SuaThongTinCaNhan() {
    const [quocTichList, setQuocTichList] = useState([]);
    const [isValidEmail, setIsValidEmail] = useState(true);
    useEffect(() => {
        axios
            .get('http://localhost:8080/nguoi-dung/danh-sach-quoc-tich')
            .then(response => setQuocTichList(response.data));

        axios
            .get('http://localhost:8080/nguoi-dung/lay-thong-tin-nguoi-dung', {
                withCredentials: true,
            })
            .then(response => {
                setEmailInput({
                    ...emailInput,
                    inputValue: response.data.email,
                });
                setSoDienThoaiInput({
                    ...soDienThoaiInput,
                    inputValue: response.data.soDienThoai,
                });
                setHoVaTenInput({
                    ...hoVaTenInput,
                    inputValue: response.data.hoVaTen,
                });
                setNgaySinhInput({
                    ...ngaySinhInput,
                    inputValue: response.data.ngaySinh,
                });
                setGioiTinhInput({
                    ...gioiTinhInput,
                    inputValue: response.data.gioiTinh,
                });
                setHoChieuInput({
                    ...hoChieuInput,
                    inputValue: response.data.hoChieu,
                });
                setDiaChiInput({
                    ...diaChiInput,
                    inputValue: response.data.diaChi,
                });
                setQuocTichInput({
                    ...quocTichInput,
                    inputValue: response.data.quocTich.maQuocTich,
                });
            })
            .catch(err => console.error(err));
    }, []);

    const [emailInput, setEmailInput] = useState({
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

    function handleFormSubmit(event) {
        event.preventDefault();

        if (validateFormInput() && isValidEmail) {
            let formData = new FormData();
            formData.append('diaChiEmail', emailInput.inputValue);
            formData.append('soDienThoai', soDienThoaiInput.inputValue);
            formData.append('gioiTinh', gioiTinhInput.inputValue);
            formData.append('hoVaTen', hoVaTenInput.inputValue);
            formData.append('ngaySinh', ngaySinhInput.inputValue);
            formData.append('hoChieu', hoChieuInput.inputValue);
            formData.append('diaChi', diaChiInput.inputValue);
            formData.append('quocTich', quocTichInput.inputValue);
            axios
                .post('http://localhost:8080/nguoi-dung/thay-doi-thong-tin-nguoi-dung', formData, {
                    withCredentials: true,
                })
                .then(response => {
                    toast.success('Lưu thay đổi thông tin người dùng thành công');
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setEmailInput({
                            ...emailInput,
                            errorMessage: 'Email đã tồn tại',
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
                errorMessage: 'Email không hợp lệ',
            });
            setIsValidEmail(false);
        }
        else {
            validateDuplicateEmail(emailInput.inputValue);
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

        return isValid;
    }

    function validateEmail(email) {
        let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return pattern.test(email);
    }

    function validateDuplicateEmail(email) {
        if (email === localStorage.getItem('email')) {
            return;
        }
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
        let pattern = /^((\d{9})|(\d{12}))$/;
        return pattern.test(hoChieu);
    }

    function validateDiaChi(diaChi) {
        let pattern = /^[\p{L} \d,-]+$/u;
        return pattern.test(diaChi);
    }

    function validateQuocTich(quocTich) {
        return quocTich !== '0';
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
                      </div>
                      <div className="col-md-9 register-right">
                          <div className="tab-content" id="myTabContent">
                              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                  <h3 className="register-heading">Thay đổi thông tin cá nhân</h3>
                                  <div className="row register-form">
                                      <div className="col-md-6">
                                          <div className="form-group">
                                                <label className="form-label">
                                                    Email <span className="text-danger">(*)</span>
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
                                                    value={emailInput.inputValue}
                                                />
                                                <div className="form-text text-danger">{emailInput.errorMessage}</div>
                                          </div>
                                          <div className="form-group mt-2">
                                                <label className="form-label">
                                                    Số điện thoại <span className="text-danger">(*)</span>
                                                </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại"
                                                onChange={event => setSoDienThoaiInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                                value={soDienThoaiInput.inputValue}/>
                                              <div className="form-text text-danger">{soDienThoaiInput.errorMessage}</div>
                                          </div>
                                          <div className="form-group mt-2">
                                                <label className="form-label">
                                                    Họ và tên <span className="text-danger">(*)</span>
                                                </label>
                                              <input
                                                type="text"
                                                className="form-control" 
                                                placeholder="Nhập họ và tên"
                                                onChange={event => setHoVaTenInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                                value={hoVaTenInput.inputValue}/>
                                              <div className="form-text text-danger">{hoVaTenInput.errorMessage}</div>
                                          </div>
                                          <div className="form-group mt-2">
                                                <label className="form-label">
                                                    Ngày sinh <span className="text-danger">(*)</span>
                                                </label>
                                              <input
                                                type="date"
                                                className="form-control"
                                                onChange={event => setNgaySinhInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                                value={ngaySinhInput.inputValue}/>
                                              <div className="form-text text-danger">{ngaySinhInput.errorMessage}</div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="form-group">
                                                <label className="form-label">
                                                    Số CMND/CCCD <span className="text-danger">(*)</span>
                                                </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập số CMND/CCCD"
                                                onChange={event => setHoChieuInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                                value={hoChieuInput.inputValue}/>
                                                <div className="form-text text-danger">{hoChieuInput.errorMessage}</div>
                                          </div>
                                          <div className="form-group mt-2">
                                                <label className="form-label">
                                                    Địa chỉ <span className="text-danger">(*)</span>
                                                </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ"
                                                onChange={event => setDiaChiInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}
                                                value={diaChiInput.inputValue}/>
                                              <div className="form-text text-danger">{diaChiInput.errorMessage}</div>
                                          </div>
                                          <div className="form-group mt-2">
                                                <label className="form-label">
                                                    Quốc tịch <span className="text-danger">(*)</span>
                                                </label>
                                              <select
                                                className="form-select"
                                                value={quocTichInput.inputValue}
                                                onChange={event => setQuocTichInput({
                                                    errorMessage: '',
                                                    inputValue: event.target.value,
                                                })}>
                                                  <option value={0} key={0}>Chọn quốc gia của bạn</option>
                                                  {quocTichList.map(quocTich => (
                                                    <option value={quocTich.maQuocTich} key={quocTich.maQuocTich}>{quocTich.tenQuocTich}</option>
                                                  ))}
                                              </select>
                                              <div className="form-text text-danger">{quocTichInput.errorMessage}</div>
                                          </div>
                                          <div className="form-group mt-2">
                                                <label className="form-label">
                                                    Giới tính <span className="text-danger">(*)</span>
                                                </label>
                                              <div className="maxl">
                                                  <label className="radio inline">
                                                      <input
                                                        type="radio"
                                                        checked={gioiTinhInput.checkedButton === 'Nam'}
                                                        onChange={() => setGioiTinhInput({
                                                            inputValue: 'Nam',
                                                            checkedButton: 'Nam',
                                                        })}/>
                                                      <span>Nam </span>
                                                  </label>
                                                  <label className="radio1 inline">
                                                      <input
                                                        type="radio"
                                                        checked={gioiTinhInput.checkedButton === 'Nữ'}
                                                        onChange={() => setGioiTinhInput({
                                                            inputValue: 'Nữ',
                                                            checkedButton: 'Nữ',
                                                        })}
                                                        />
                                                      <span>Nữ </span>
                                                  </label>
                                              </div>
                                          </div>
                                          <button className="btnRegister" onClick={handleFormSubmit}>Lưu thay đổi</button>
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