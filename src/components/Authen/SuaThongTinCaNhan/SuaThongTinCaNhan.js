import './SuaThongTinCaNhan.css';

export default function SuaThongTinCaNhan() {
    return (
        <div className="m-auto w-100 d-flex flex-column justify-content-center form-wrapper">
            <form className='p-4 m-auto change-form'>
                <h2 className="text-center mb-4">Chỉnh sửa tài khoản</h2>
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
                            <label className="mb-2">Số điện thoại <span className="text-danger" >*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="mb-2">Quốc tịch</label>
                            <select className="form-select">
                                <option>Việt Nam</option>
                            </select>
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
                    </div>
                </div>
                <button className="btn btn-primary save-button">Lưu thay đổi</button>
            </form>
        </div>
    );
}