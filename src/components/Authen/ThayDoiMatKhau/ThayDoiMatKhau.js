import axios from 'axios';
import { useState } from 'react';
import './ThayDoiMatKhau.css';
import { toast } from 'react-toastify';

export default function ThayDoiMatKhau() {
    const [matKhauHienTaiInput, setMatkhauHienTaiInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [matKhauMoiInput, setMatKhauMoiInput] = useState({
        inputValue: '',
        errorMessage: '',
    });
    const [xacNhanMatKhauMoiInput, setXacNhanMatKhauMoiInput] = useState({
        inputValue: '',
        errorMessage: '',
    });

    function handleFormSubmit(event) {
        event.preventDefault();

        if (validateFormInput()) {
            let formData = new FormData();
            formData.append('matKhauHienTai', matKhauHienTaiInput.inputValue);
            formData.append('matKhauMoi', matKhauMoiInput.inputValue);
            formData.append('xacNhanMatKhauMoi', xacNhanMatKhauMoiInput.inputValue);
            axios
                .post('http://localhost:8080/nguoi-dung/thay-doi-mat-khau', formData, {
                    withCredentials: true
                })
                .then(response => {
                    toast.success('Thay đổi mật khẩu thành công');
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setMatkhauHienTaiInput({
                            ...matKhauHienTaiInput,
                            errorMessage: 'Mật khẩu hiện tại không trùng khớp',
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

        if (!validateMatKhau(matKhauHienTaiInput.inputValue)) {
            isValid = false;
            setMatkhauHienTaiInput({
                ...matKhauHienTaiInput,
                errorMessage: 'Mật khẩu hiện tại không hợp lệ',
            });
        }

        if (!validateMatKhau(matKhauMoiInput.inputValue)) {
            isValid = false;
            setMatKhauMoiInput({
                ...matKhauMoiInput,
                errorMessage: 'Mật khẩu mới không hợp lệ',
            });
        }
        else if (!validateTrungKhopMatKhau(matKhauMoiInput.inputValue, xacNhanMatKhauMoiInput.inputValue)) {
            isValid = false;
            setMatKhauMoiInput({
                ...matKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng',
            });
            setXacNhanMatKhauMoiInput({
                ...xacNhanMatKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng',
            });
        }

        if (!validateMatKhau(xacNhanMatKhauMoiInput.inputValue)) {
            isValid = false;
            setXacNhanMatKhauMoiInput({
                ...xacNhanMatKhauMoiInput,
                errorMessage: 'Xác nhận mật khẩu mới không hợp lệ',
            });
        }
        else if (!validateTrungKhopMatKhau(matKhauMoiInput.inputValue, xacNhanMatKhauMoiInput.inputValue)) {
            isValid = false;
            setMatKhauMoiInput({
                ...matKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng',
            });
            setXacNhanMatKhauMoiInput({
                ...xacNhanMatKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng',
            });
        }

        return isValid;
    }

    function validateMatKhau(matKhau) {
        return matKhau.length > 0;
    }

    function validateTrungKhopMatKhau(matKhau, nhapLaiMatKhau) {
        return matKhau === nhapLaiMatKhau;
    }

    return (
        <>
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-MatKhau">
            <form className="col-5 m-auto change-form p-4">
                <h2 className="text-center mb-4">Thay đổi mật khẩu</h2>
                <div className="form-group mb-4">
                    <label className="mb-2">Mật khẩu hiện tại <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu hiện tại"
                        onChange={event => setMatkhauHienTaiInput({
                            errorMessage: '',
                            inputValue: event.target.value,
                        })}
                    />
                    <p>{matKhauHienTaiInput.errorMessage}</p>
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2">Mật khẩu mới <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu mới"
                        onChange={event => setMatKhauMoiInput({
                            errorMessage: '',
                            inputValue: event.target.value,
                        })}
                    />
                    <p>{matKhauMoiInput.errorMessage}</p>
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2">Xác nhận mật khẩu mới <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu mới"
                        onChange={event => setXacNhanMatKhauMoiInput({
                            errorMessage: '',
                            inputValue: event.target.value,
                        })}
                    />
                    <p>{xacNhanMatKhauMoiInput.errorMessage}</p>
                </div>
                <button className="btn btn-primary save-button" onClick={handleFormSubmit}>Lưu thay đổi</button>
            </form>
        </div>
        </>
    );
}