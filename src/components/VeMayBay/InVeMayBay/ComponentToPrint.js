import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import backgroundImage from '../../../Assets/airline-ticket.jpg';
import { useLocation } from "react-router-dom";
import axios from "axios";
import './InVeMayBay.css'
export default function ComponentToPrint() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const maVe = queryParams.get("maVe");
    const [veMayBay, setVeMayBay] = useState(null);
    const [ticketTitle, setTicketTitle] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/VeMayBay/InVe?maVe=" + maVe)
            .then((response) => {
                setVeMayBay(response.data);
                setTicketTitle(response.data.datCho.chuyenBay.hangBay.tenHangBay + " - " + response.data.maVe + " - " + response.data.hanhKhach.tenHanhKhach);
            })
            .catch((err) => console.error);
    }, [maVe]);

    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        height: window.innerHeight,
        width: '100%'
    };
    const convertName = (fullName) => {
        var nameArray = [];
        nameArray = fullName.toString().split(" ");
        const name = nameArray[nameArray.length - 1] + " / " + nameArray[0];
        console.log("name", name);
        return name;
    }

    const convertBoardingTime = (fullBoaringTime) => {
        const boardingTime = fullBoaringTime.substr(0, 5);;
        return boardingTime;
    }

    const convertBoardingDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: ticketTitle,
        // onAfterPrint: () => alert('print success')
    })

    return (
        <div className='container'>
            <div className='d-flex justify-content-end pt-3'>
                <button className='btn bg' onClick={handlePrint}>IN VÉ</button>
            </div>
            <div ref={componentRef} className='d-flex justify-content-center mt-2' style={{ width: '100%' }}>
                <div className='height container-ticket-to-print' style={divStyle}>
                    <div className='ticket-header row d-flex align-items-center p-2'>
                        <div className='first-header w-700 d-flex justify-content-between'>

                            <div style={{ paddingLeft: '1rem' }}>
                                <strong>{veMayBay !== null && veMayBay.maVe}</strong>
                            </div>
                            <div style={{ paddingLeft: '1rem' }}>
                                <img style={{ height: "25px" }} src={veMayBay !== null && veMayBay.datCho.chuyenBay.hangBay.logoURL} alt='logoHangBay' />

                            </div>
                        </div>
                        <div className='second-header w-300'>
                            <div style={{ paddingLeft: '1rem' }}>
                                <strong>{veMayBay !== null && veMayBay.maVe}</strong>
                            </div>
                        </div>

                    </div>
                    <div className='ticket-body row mt-2 p-2'>
                        <div className='first-body w-700 d-flex'>

                            <div className='' style={{ paddingLeft: '8rem', width: '100%' }}>
                                <div className='filght-detail d-flex row pt-2'>
                                    <div className='col-md-2'>
                                        <div className='text-center'>
                                            <small>FLIGHT</small>
                                        </div>
                                        <div className='text-center'>
                                            <strong><h4>{veMayBay !== null && veMayBay.datCho.chuyenBay.maChuyenBay}</h4></strong>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='text-center'>
                                            <small>BOARDING TIME</small>
                                        </div>
                                        <div className='text-center'>
                                            <strong><h4>{veMayBay !== null && convertBoardingTime(veMayBay.datCho.chuyenBay.gioKhoiHanh)}</h4></strong>
                                        </div>
                                    </div>

                                    <div className='col-md-3'>
                                        <div className='text-center'>
                                            <small>GATE</small>
                                        </div>
                                        <div className='text-center'>
                                            <strong><h4>{'08'}</h4></strong>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='text-center'>
                                            <small>SEAT</small>
                                        </div>
                                        <div className='text-center'>
                                            <strong><h4>{veMayBay !== null && veMayBay.datCho.ghe.tenGhe}</h4></strong>
                                        </div>
                                    </div>
                                </div>

                                <div className='filght-detail d-flex row pt-2'>
                                    <div className='col-md-3'>
                                        <small>PASSENGER: </small>
                                    </div>
                                    <div className='col-md-4'>
                                        <strong>{veMayBay !== null && convertName(veMayBay.hanhKhach.tenHanhKhach)}</strong>
                                    </div>

                                    <div className='col-md-2'>
                                        <small>CLASS: </small>
                                    </div>
                                    <div className='col-md-3'>
                                        <strong>{veMayBay !== null && (veMayBay.datCho.ghe.loaiGhe.tenLoaiGhe === 'Phổ Thông') ? "ECONOMY" : "BUSINESS"}</strong>
                                    </div>
                                </div>

                                <div className='filght-detail d-flex row pt-2'>
                                    <div className='col-md-3'>
                                        <small>FROM: </small>
                                    </div>
                                    <div className='col-md-4'>
                                        <strong>{veMayBay !== null && veMayBay.datCho.chuyenBay.diemDi}</strong>
                                    </div>

                                    <div className='col-md-2'>
                                        <small>TO: </small>
                                    </div>
                                    <div className='col-md-3'>
                                        <strong>{veMayBay !== null && veMayBay.datCho.chuyenBay.diemDen}</strong>
                                    </div>
                                </div>

                                <div className='filght-detail d-flex row pt-2'>
                                    <div className='col-md-3'>
                                        <small>DATE: </small>
                                    </div>
                                    <div className='col-md-4'>
                                        <strong>{veMayBay !== null && convertBoardingDate(veMayBay.datCho.chuyenBay.ngayKhoiHanh)}</strong>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='second-body w-300'>
                            <div className='row'>
                                <div className='col-3 pt-2'>
                                    <div className='text-center'>
                                        <small>SEAT</small>
                                    </div>
                                    <div className='text-center'>
                                        <strong><h4>{veMayBay !== null && veMayBay.datCho.ghe.tenGhe}</h4></strong>
                                    </div>
                                </div>
                                <div className='col-9 row scale-center pt-2'>
                                    <div className='col-4'>
                                        <small>CLASS:</small>
                                    </div>
                                    <div className='col-8'>
                                        <strong>{veMayBay !== null && (veMayBay.datCho.ghe.loaiGhe.tenLoaiGhe === 'Phổ Thông') ? "ECONOMY" : "BUSINESS"}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-3'>
                                    <small>PASSENGER:</small>
                                </div>
                                <div className='col-9 scale-center'>
                                    <strong>{veMayBay !== null && convertName(veMayBay.hanhKhach.tenHanhKhach)}</strong>
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-md-3'>
                                    <small>FROM: </small>
                                </div>
                                <div className='col-md-9 scale-center'>
                                    <strong>{veMayBay !== null && veMayBay.datCho.chuyenBay.diemDi}</strong>
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-md-3'>
                                    <small>TO: </small>
                                </div>
                                <div className='col-md-9 scale-center'>
                                    <strong>{veMayBay !== null && veMayBay.datCho.chuyenBay.diemDen}</strong>
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-md-3'>
                                    <small>DATE: </small>
                                </div>
                                <div className='col-md-9 scale-center'>
                                    <strong>{veMayBay !== null && convertBoardingDate(veMayBay.datCho.chuyenBay.ngayKhoiHanh)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}