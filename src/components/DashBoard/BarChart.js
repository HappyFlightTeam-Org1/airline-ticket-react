
import React, { useState, useCallback, useRef,useEffect, Suspense} from 'react';
import { Bar, Chart, Line, Pie } from "react-chartjs-2";
import { UserData } from "./Data";
import { Chart as ChartJS } from "chart.js/auto";
import "./BarChart.css";
import axios from "axios";
import { Canvas} from "@react-three/fiber";
import Earth from './Earth';
import Aos from "aos";
function BarChart() {

  const [total, setTotal] = useState([]);
  const [totalHD, setTotalHD] = useState();
  const [totalHK, setTotalHK] = useState([]);
  const [totalND, setTotalND] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:8080/dashboard/hoadon")
      .then((response) => {
        setTotalHD(response.data);
         console.log(totalHD);
      })
      .catch((err) => console.error);

    axios
      .get("http://localhost:8080/dashboard/total")
      .then((response) => {
        setTotal(response.data);
         console.log(total.length);
      })
      .catch((err) => console.error);

    axios
      .get("http://localhost:8080/dashboard/totalND")
      .then((response) => {
        setTotalND(response.data);
         console.log(totalND.length);
      })
      .catch((err) => console.error);

    axios
    .get("http://localhost:8080/dashboard/totalHK")
    .then((response) => {
      setTotalHK(response.data);
      console.log(totalHK.length);
    })
    .catch((err) => console.error);
  }, []);

  const [userData,setUserData] = useState({
  labels: UserData.map((data) => data.month),
  datasets: [{
    label: "price",
    data: UserData.map((data) => data.price),
    backgroundColor: ["red","orange","yellow","green","blue","purple","pink","orange","brown","black","gray","lavender"]
  }]
});

let ref = useRef(null);
let pieRef = useRef(null);
let lineRef = useRef(null);

  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = ref.current.toBase64Image();
    link.click();
  }, []);

  const downloadImage1 = useCallback(() => {
    const link = document.createElement("a");
    link.download = "pie-chart.png";
    link.href = pieRef.current.toBase64Image();
    link.click();
  }, []);

  const downloadImage2 = useCallback(() => {
    const link = document.createElement("a");
    link.download = "line-chart.png";
    link.href = lineRef.current.toBase64Image();
    link.click();
  }, []);
  return (
    <>
    <div className='barchart'>
    <div data-aos="fade-up" className="container state-overview ">
      <div className="row">
        <div className="col-xl-3 col-md-6 col-12">
          <div className="info-box bg-primary shadow">
            <div className='icon'><i className='bx bxs-user'></i></div>
            <div className="info-box-content">
              <span className="info-box-text">Số Lượng Người Dùng</span><br></br>
              <span className="info-box-number">{totalND.length}</span>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${totalND.length}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
              {totalND.length}% Increase in 28 Days
              </span>
            </div>

          </div>

        </div>

        <div className="col-xl-3 col-md-6 col-12">
          <div className="info-box bg-warning shadow">
            <div className='icon'><i class="fa-solid fa-users"></i></div>
            <div className="info-box-content">
              <span className="info-box-text">Số Lượng Hành </span><br></br>
              <span className="info-box-number">{totalHK.length}</span>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${totalHK.length}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
              {totalHK.length}%  Increase in 28 Days
              </span>
            </div>

          </div>

        </div>

        <div className="col-xl-3 col-md-6 col-12">
          <div className="info-box bg-danger shadow">
            <div className='icon'><i class='bx bxs-plane-alt'></i></div>
            <div className="info-box-content">
              <span className="info-box-text">Số Lượng Chuyến Bay</span><br></br>
              <span className="info-box-number">{total.length}</span>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${total.length}%` }}  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
              {total.length}% Increase in 28 Days
              </span>
            </div>

          </div>

        </div>

        <div className="col-xl-3 col-md-6 col-12">
          <div className="info-box bg-success shadow">
            <div className='icon'><i class='bx bx-dollar-circle'></i></div>
            <div className="info-box-content">
              <span className="info-box-text">Tổng Tiền Thanh Toán</span><br></br>
              <span className="info-box-number">5000</span><span>$</span>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: "80%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
                80% Increase in 28 Days
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
    <div className='chart'>
    <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage2}>Download Line</button>
        <Line data={userData} ref={lineRef} style={{ display: "inline" }}></Line>
      </div>
      <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage}>Download Bar</button>
        <Bar data={userData} ref={ref} ></Bar>
      </div>
    <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage1}>Download Pie</button>
        <Pie data={userData} ref={pieRef}></Pie>
      </div>
      <div  data-aos="fade-up" className='bar1'>
        <div  data-aos="fade-up" className='bay'>
           <i class="fa-solid fa-plane icon"></i>
           <i class="fa-solid fa-plane icon"></i>
           <i class="fa-solid fa-plane icon"></i>
           <i class="fa-solid fa-plane icon"></i>
          </div>
        <Canvas>
          <Suspense fallback={null}>
                 <Earth></Earth>
            </Suspense>
        </Canvas>
      </div>

    </div>
  </div>
  </>
  )
}
export default BarChart;