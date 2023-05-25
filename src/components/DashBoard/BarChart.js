
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
  const [userDataChuyenBay,setUserDataChuyenBay] = useState([]);
  const [hoaDonThongKe,setHoaDonThongKe] = useState([]);
  const [tongTien, setTongTien] = useState(0.0);
  // Tìm kiếm chuyến bay
  const [chuyenBays, setChuyenBays] = useState([]);
  const [firstDay, setFirstDay] = useState('');
  const [lastDay, setLastDay] = useState('');
  const [flightDetails, setFlightDetails] = useState(null);

  const handleFlightHover = (maChuyenBay) => {
    // Tìm chuyến bay dựa trên ID
    const chuyenBay = chuyenBays.find((chuyenBay) => chuyenBay.maChuyenBay === maChuyenBay);
    setFlightDetails(chuyenBay);
  };

  const handleFlightLeave = () => {
    setFlightDetails(null);
    console.log(flightDetails);
  };

  useEffect(() => {

    axios
      .get("http://localhost:8080/dashboard/hoadon")
      .then((response) => {
        setTotalHD(response.data);
         console.log(totalHD);
      })
      .catch((err) => console.error);

      axios
      .get("http://localhost:8080/dashboard/tongtien")
      .then((response) => {
        setTongTien(response.data);
         console.log(tongTien);
      })
      .catch((err) => console.error);

      axios
      .get("http://localhost:8080/dashboard/chuyenbaythongke")
      .then((response) => {
        setUserDataChuyenBay(response.data);
         console.log(userDataChuyenBay);
      })
      .catch((err) => console.error);

      axios
      .get("http://localhost:8080/dashboard/hoadonthongke")
      .then((response) => {
        setHoaDonThongKe(response.data);
        console.log(hoaDonThongKe);
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

  const getChuyenBayThongKe =() => {
    return {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        label: "total",
        data: userDataChuyenBay.map((data) => data.flight_count),
        backgroundColor: ["red","orange","yellow","green","blue","purple","pink","orange","brown","black","gray","lavender"]
      }]
    }
  }
  let ref = useRef(null);
  let pieRef = useRef(null);
  let lineRef = useRef(null);

  const getHoaDonThongKe =() => {
    return {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        label: "price",
        data: hoaDonThongKe.map((data) => data.tong_tien_thang),
        backgroundColor: ["red","orange","yellow","green","blue","purple","pink","orange","brown","black","gray","lavender"]
      }]
    }
  }

  const searchChuyenBay = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/dashboard/listchuyenbay?firstDay=${firstDay}&lastDay=${lastDay}`);
      const data = await response.data;
      setChuyenBays(data);
      console.log(chuyenBays.data+ "chuyen bay");
    } catch (error) {
      console.error(error);
    }
  };

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
              <span className="info-box-text">Số Lượng Hành Khách</span><br></br>
              <span className="info-box-number">{totalHK.length}</span>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${totalHK.length}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
               12 Hành Khách Tháng này đạt 30% CTT
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
              <span className="info-box-number">{tongTien}</span><span>$</span>
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
        <Line data={getChuyenBayThongKe()} ref={lineRef} style={{ display: "inline" }}></Line>
        <h6>Biểu Đồ 1.A: Thể Hiện Số Lượng Chuyến Bay Mỗi Tháng</h6>
      </div>
      <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage}>Download Bar</button>
        <Bar data={getHoaDonThongKe()} ref={ref} ></Bar>
        <h6>Biểu Đồ 1.B: Thể Hiện Tổng Doanh Thu Mỗi Tháng</h6>
      </div>
      <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage1}>Download Pie</button>
        <Pie data={userData} ref={pieRef}></Pie>
        <h6>Biểu Đồ 1.C: Thể Hiện Số Lượng vé Mỗi Tháng</h6>
      </div>
       <div  data-aos="fade-up" className='bar1'>
       <div className='searchCB'>
              <input
                type="date"
                value={firstDay}
                onChange={(e) => setFirstDay(e.target.value)}
              />
              <input
                type="date"
                value={lastDay}
                onChange={(e) => setLastDay(e.target.value)}
              />
              <button onClick={searchChuyenBay}>Tìm Chuyến Bay</button>
            </div>
        <div  data-aos="fade-up" className='bay'>
          {chuyenBays.map((chuyenBay) => (
            <div data-aos="fade-up" className='plane' key={chuyenBay.maChuyenBay}>
             <i class="fa-solid fa-plane icon"></i>
             <small key={chuyenBay.maChuyenBay} onMouseEnter={() => handleFlightHover(chuyenBay.maChuyenBay)}
            onMouseLeave={handleFlightLeave}>{chuyenBay.maChuyenBay}</small>
          </div>
          ))}
             {flightDetails && (
        <div className='detailCB'>
           <h2>Chuyến Bay : {flightDetails.maChuyenBay}</h2>
          <h2>{flightDetails.diemDi}  <i class="fa-solid fa-plane"></i>  {flightDetails.diemDen}</h2>
          <h2>Thời Gian: {flightDetails.gioKhoiHanh}  <i class="fa-solid fa-arrow-right"></i>  {flightDetails.gioHaCanh}</h2>
          <h2>Ngày Khởi Hành: {flightDetails.ngayKhoiHanh} </h2>
          {/* Các trường thông tin khác */}
        </div>
      )}
          </div>
        <Canvas>
          <Suspense fallback={null}>
                 <Earth></Earth>
            </Suspense>
        </Canvas>
      </div>
   </div>
</div>
  );
}

export default BarChart;
