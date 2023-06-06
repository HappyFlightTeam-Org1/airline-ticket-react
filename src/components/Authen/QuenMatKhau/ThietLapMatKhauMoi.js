import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ThietLapMatKhauMoi.css';
import { toast } from 'react-toastify';

export default function ThietLapMatKhauMoi() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

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
            formData.append('resetToken', searchParams.get('reset-token'));
            formData.append('matKhauMoi', matKhauMoiInput.inputValue);
            formData.append('datLaiMatKhauMoi', xacNhanMatKhauMoiInput.inputValue);
            axios
                .post('http://localhost:8080/nguoi-dung/dat-lai-mat-khau', formData)
                .then(response => {
                    toast.success('Reset mật khẩu thành công');
                    navigate('/');
                })
                .catch(err => {
                    toast.error('Có lỗi đã xảy ra');
                });
        }
    }

    function validateFormInput() {
        let isValid = true;

        if (!validateMatKhau(matKhauMoiInput.inputValue)) {
            setMatKhauMoiInput({
                ...matKhauMoiInput,
                errorMessage: 'Mật khẩu mới không hợp lệ. Mật khẩu có độ dài từ 6-20 kí tự, có ít nhất: 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 kí tự đặc biệt (#?!@$%^&*-)',
            });
        }
        else if (!validateTrungKhopMatKhau(matKhauMoiInput.inputValue, xacNhanMatKhauMoiInput.inputValue)) {
            setMatKhauMoiInput({
                ...matKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp',
            });
            setXacNhanMatKhauMoiInput({
                ...xacNhanMatKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp',
            })
        }

        if (!validateMatKhau(xacNhanMatKhauMoiInput.inputValue)) {
            setXacNhanMatKhauMoiInput({
                ...xacNhanMatKhauMoiInput,
                errorMessage: 'Xác nhận mật khẩu mới không hợp lệ. Mật khẩu có độ dài từ 6-20 kí tự, có ít nhất: 1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 kí tự đặc biệt (#?!@$%^&*-)',
            });
        }
        else if (!validateTrungKhopMatKhau(matKhauMoiInput.inputValue, xacNhanMatKhauMoiInput.inputValue)) {
            setMatKhauMoiInput({
                ...matKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp',
            });
            setXacNhanMatKhauMoiInput({
                ...xacNhanMatKhauMoiInput,
                errorMessage: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp',
            })
        }

        return isValid;
    }

    function validateMatKhau(matKhau) {
        let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
        return pattern.test(matKhau);
    }

    function validateTrungKhopMatKhau(matKhau, nhapLaiMatKhau) {
        return matKhau === nhapLaiMatKhau;
    }

    return (
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-wrapper">
            <form className="p-4 m-auto change-form">
                <h2 className="text-center mb-4">Thiết lập mật khẩu mới</h2>
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
                <button className="btn btn-primary save-button" onClick={handleFormSubmit}>Lưu</button>
            </form>
        </div>
    );
}