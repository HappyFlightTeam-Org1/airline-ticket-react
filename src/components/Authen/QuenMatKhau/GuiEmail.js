import axios from 'axios';
import { useState } from 'react';
import './GuiEmail.css';

export default function GuiEmail() {
    const [emailInput, setEmailInput] = useState({
        inputValue: '',
        errorMessage: '',
    });

    function handleFormSubmit(event) {
        event.preventDefault();

        if (validateFormInput()) {
            let formData = new FormData();
            formData.append('email', emailInput.inputValue);
            axios
                .post('http://localhost:8080/nguoi-dung/email-dat-lai-mat-khau', formData)
                .then(response => {

                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setEmailInput({
                            ...emailInput,
                            errorMessage: 'Email không tồn tại',
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
                errorMessage: 'Định dạng email không hợp lệ',
            });
        }

        return isValid;
    }

    function validateEmail(email) {
        let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return pattern.test(email);
    }

    return (
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-wrapper">
            <form className="p-4 m-auto change-form">
                <h2 className="text-center mb-4">Thiết lập mật khẩu mới</h2>
                <div className="form-group mb-4">
                    <label className="mb-2">Địa chỉ email <span className="text-danger" >*</span></label>
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
                <button className="btn btn-primary send-button" onClick={handleFormSubmit}>Gửi</button>
            </form>
        </div>
    );
}