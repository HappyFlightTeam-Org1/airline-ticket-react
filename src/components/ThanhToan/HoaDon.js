import React from "react";
import './HoaDon.css'
import axios from "axios";
function HoaDon() {
    return (
        <div className='container d-flex justify-content-center mt-3'>
            <div className="order">
                <div className="order-sidebar">
                    <img src="https://www.onlygfx.com/wp-content/uploads/2021/07/paper-plane-1.png" />

                </div>
                <div className="order-content">
                    <h3>CHI TIẾT GIÁ</h3>
                    <div className="content">
                        <div>ViệtNam Airlines(Người Lớn x1) </div>
                        <div>2.650.000VND</div>
                    </div>
                    <div className="content">
                        <div>ViệtNam Airlines(Người Lớn x1) </div>
                        <div>2.650.000VND</div>
                    </div>
                    <div className="content">
                        <div>Bamboo Airways(Người Lớn x1) </div>
                        <div>2.300.000VND</div>
                    </div>
                    <div className="content">
                        <div>Bamboo Airways(Người Lớn x1) </div>
                        <div>2.300.000VND</div>
                    </div>
                    <div className="content">
                        <div>ViệtNam Airlines(Trẻ em x1) </div>
                        <div>650.000VND</div>
                    </div>
                    <div className="content">
                        <div>Bamboo Airways(Trẻ em x1) </div>
                        <div>620.000VND</div>
                    </div>
                    <hr></hr>
                    <div className="content">
                        <div><strong>THÀNH TIỀN</strong></div>
                        <div><strong>11.170.000VND</strong></div>
                    </div>
                    <div className="button">
                        <button classNameName="shadow">Thanh Toán</button>
                    </div>
                </div>
                <div className="item3">
                    <h5>MÃ ĐẶT CHỖ</h5>
                    <h5>OD16052316091</h5>
                    <hr></hr>
                    {/* <div className="trip">
                        <div>
                            CHUYẾN ĐI
                        </div>
                        <div>
                            <a href="">Chi Tiết</a>
                        </div>
                    </div> */}
                    <div className="flight">
                        <h5>CHUYẾN BAY</h5>
                    </div>
                    <h6 className="mb-0">16 thg 5, 2023 - 18 thg 5, 2023</h6>
                    <b>
                        TP HCM(SGN) <i className='bx bx-transfer-alt'></i> DANANG(DAD)
                    </b>
                    <hr></hr>
                    <h5>HÀNH KHÁCH</h5>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Bà. Thị Hoa Lê</th>
                                <td>Người Lớn</td>
                            </tr>
                            <tr>
                                <th scope="row">Ông. Văn Hùng Dũng</th>
                                <td>Người Lớn</td>
                            </tr>
                            <tr>
                                <th scope="row">Ông. Đinh Tiến Luật</th>
                                <td>Trẻ Em</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default HoaDon;
