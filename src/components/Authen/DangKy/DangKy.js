import './DangKy.css';

export default function DangKy() {
    return (
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-wrapper">
            <form className="m-auto register-form p-4">
                <h2 className="text-center mb-4">Đăng ký</h2>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group mb-3">
                            <label className="mb-2">Địa chỉ email <span className="text-danger" >*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập địa chỉ email"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Tên tài khoản <span className="text-danger" >*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên tài khoản"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Số điện thoại <span className="text-danger" >*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập số điện thoại"
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
                        <div className="form-group mb-3">
                            <label className="mb-2">Xác nhận mật khẩu <span className="text-danger" >*</span></label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nhập xác nhận mật khẩu"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Giới tính</label>
                            <div className="d-flex flex-row">
                                <div className="form-check me-3">
                                    <input className="form-check-input" type="radio" />
                                    <label>Nam</label>
                                </div>
                                <div className="form-check me-3">
                                    <input className="form-check-input" type="radio" />
                                    <label>Nữ</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" />
                                    <label>Không</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group mb-3">
                            <label className="mb-2">Họ và tên <span className="text-danger" >*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập họ và tên"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Ngày sinh <span className="text-danger" >*</span></label>
                            <input
                                type="date"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Số CMND/CCCD <span className="text-danger" >*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập số CMND/CCCD"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Địa chỉ <span className="text-danger" >*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập địa chỉ"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Quốc tịch</label>
                            <select className="form-select">
                                <option>Việt Nam</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary register-button">Đăng ký</button>
            </form>
        </div>
    );
}