import React, { useState, useEffect } from 'react';
import axios from "axios";
const DatCho = () => {
    const [seatList, setSeatList] = useState([]);
    const [selectedSeatList, setSelectedSeatList] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/dat-cho/list/CB002")
            .then((response) => {
                setSeatList(response.data);
                console.log("dDAT CHOO")
                console.log(response.data);
            })
            .catch((err) => console.error);
    }, []);

    const handleSeatSelection = (seat) => {
        setSelectedSeatList([...selectedSeatList, seat]);
        console.log("selectedSeatList",selectedSeatList);
    };

    return (
        <div>
            <div className='d-flex justify-content-center p-1'> <h1>VUI LÒNG CHỌN GHẾ</h1></div>
            <div className="seat-options">
                {seatList.map((seat) => (
                    <div className='col-12 row'>
                        <div
                            key={seat.maDatCho}
                            className={'col-md-3'}
                            onClick={() => handleSeatSelection(seat)}
                        >
                            {/* <img src={seat.image} alt={seat.name} /> */}
                            <i class="fa-solid fa-couch"></i>
                            {/* <span>{seat.name}</span> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatCho;