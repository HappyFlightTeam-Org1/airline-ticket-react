import React, { useState, useEffect } from "react";
import axios from "axios";
import maybay from "../../../Assets/plane.webp";
import "./DatCho.css";
const DatCho = () => {
  // const [seatList, setSeatList] = useState([]);
  // const [selectedSeatList, setSelectedSeatList] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/dat-cho/list/CB002")
  //     .then((response) => {
  //       setSeatList(response.data);
  //       console.log("dDAT CHOO");
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.error);
  // }, []);

  // const handleSeatSelection = (seat) => {
  //   setSelectedSeatList([...selectedSeatList, seat]);
  //   console.log("selectedSeatList", selectedSeatList);
  // };

  return (
    // <div>
    //   <div className="d-flex justify-content-center p-1">
    //     {" "}
    //     <h1>VUI LÒNG CHỌN GHẾ</h1>
    //   </div>
    //   <div className="seat-options">
    //     {seatList.map((seat) => (
    //       <div className="col-12 row">
    //         <div
    //           key={seat.maDatCho}
    //           className={"col-md-3"}
    //           onClick={() => handleSeatSelection(seat)}
    //         >
    //           {/* <img src={seat.image} alt={seat.name} /> */}
    //           <i class="fa-solid fa-couch"></i>
    //           {/* <span>{seat.name}</span> */}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="datcho">
      <div className="datcholeft">
        <div className="ghichu1">
          <i class="fa-solid fa-couch"></i>
          <h4>Ghế Hạng Thương Gia</h4>
        </div>
        <div className="ghichu2">
          <i class="fa-solid fa-couch"></i>
          <h4> Ghế Hạng Phổ Thông</h4>
        </div>
        <div className="ghichu3 ">
          <i class="fa-solid fa-couch"></i>
          <h4> Ghế Đã Được Đặt</h4>
        </div>
      </div>
      <div className="maybay">
        <div className="datghe">
          <div className="thuonggia">
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <h3>A</h3>
                </div>
                <div className="ghe">
                  <h3>B</h3>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <h3>C</h3>
                </div>
                <div className="ghe">
                  <h3>D</h3>
                </div>
              </div>
            </div>

            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="phothong">
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
            <div className="hangghe">
              <div className="hangtrai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
              <div className="hangphai">
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
                <div className="ghe">
                  <i class="fa-solid fa-couch"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="datchoright"></div>
    </div>
  );
};

export default DatCho;