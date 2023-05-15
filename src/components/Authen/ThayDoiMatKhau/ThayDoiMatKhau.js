import './ThayDoiMatKhau.css';

export function ThayDoiMatKhau() {
    return (
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-wrapper">
            <form className="col-5 m-auto change-form p-4">
                <h2 className="text-center mb-4">Thay đổi mật khẩu</h2>
                <div className="form-group mb-3">
                    <label className="mb-2">Mật khẩu hiện tại <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu hiện tại"
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-2">Mật khẩu mới <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu mới"
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-2">Xác nhận mật khẩu mới <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu mới"
                    />
                </div>
                <button className="btn btn-primary save-button">Lưu thay đổi</button>
            </form>
        </div>
    );
}