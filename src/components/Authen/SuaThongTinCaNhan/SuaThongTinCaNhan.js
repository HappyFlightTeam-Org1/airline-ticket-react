import plane from "../../../Assets/planeDC.png";
import logo from "../../../Assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
export default function SuaThongTinCaNhan() {
    const [quocTichList, setQuocTichList] = useState([]);
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

        if (validateFormInput()) {
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

                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setEmailInput({
                            ...emailInput,
                            errorMessage: 'Email đã tồn tại',
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

        return isValid;
    }

    function validateEmail(email) {
        let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return pattern.test(email);
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
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập địa chỉ email"
                                                    onChange={event => setEmailInput({
                                                        errorMessage: '',
                                                        inputValue: event.target.value,
                                                    })}
                                                    value={emailInput.inputValue}
                                                />
                                                <p>{emailInput.errorMessage}</p>
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
                                                value={soDienThoaiInput.inputValue}/>
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
                                                value={hoVaTenInput.inputValue}/>
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
                                                value={ngaySinhInput.inputValue}/>
                                              <p>{ngaySinhInput.errorMessage}</p>
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
                                                    inputValue: event.target.value,
                                                })}
                                                value={hoChieuInput.inputValue}/>
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
                                                value={diaChiInput.inputValue}/>
                                              <p>{diaChiInput.errorMessage}</p>
                                          </div>
                                          <div className="form-group" >
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
                                              <p>{quocTichInput.errorMessage}</p>
                                          </div>
                                          <div className="form-group">
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