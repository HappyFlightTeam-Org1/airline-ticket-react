import './ThietLapMatKhauMoi.css';

export default function ThietLapMatKhauMoi() {
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
                    />
                     <p>Ban da nhap sai</p>
                </div>
                <div className="form-group mb-4">
                    <label className="mb-2">Xác nhận mật khẩu mới <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu mới"
                    />
                     <p>Ban da nhap sai</p>
                </div>
                <button className="btn btn-primary save-button">Lưu</button>
            </form>
        </div>
    );
}