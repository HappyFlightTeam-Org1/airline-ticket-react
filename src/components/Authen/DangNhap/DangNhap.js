import './DangNhap.css';

export default function DangNhap() {
    return (
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-wrapper">
            <form className="p-4 login-form m-auto">
                <h2 className="text-center mb-4">Đăng nhập</h2>
                <div className="form-group mb-3">
                    <label className="mb-2">Tên tài khoản <span className="text-danger" >*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên tài khoản"
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-2">Mật khẩu <span className="text-danger" >*</span></label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu"
                    />
                </div>
                <div class="mb-2"><a href="#" class="mb-3">Quên mật khẩu</a></div>
                <div class="mb-3">Chưa có tài khoản? <a href="#">Đăng ký ngay</a></div>
                <button className="btn btn-primary login-button">Đăng nhập</button>
            </form>
        </div>
    );
};