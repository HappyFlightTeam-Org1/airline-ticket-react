import './GuiEmail.css';

export default function GuiEmail() {
    return (
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-wrapper">
            <form className="p-4 m-auto change-form">
                <h2 className="text-center mb-4">Thiết lập mật khẩu mới</h2>
                <div className="form-group mb-3">
                    <label className="mb-2">Địa chỉ email <span className="text-danger" >*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập địa chỉ email"
                    />
                </div>
                <button className="btn btn-primary send-button">Gửi</button>
            </form>
        </div>
    );
}