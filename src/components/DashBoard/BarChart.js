
import React, { useState, useCallback, useRef,useEffect, Suspense} from 'react';
import { Bar, Chart, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./BarChart.css";
import axios from "axios";
import { Canvas} from "@react-three/fiber";
import Earth from './Earth';
import Aos from "aos";
function BarChart({on,}) {
  const [total, setTotal] = useState([]);
  const [totalHD, setTotalHD] = useState();
  const [totalHK, setTotalHK] = useState([]);
  const [userDataChuyenBay,setUserDataChuyenBay] = useState([]);
  const [dataChuyenBayMonthNow,setDataChuyenBayMonthNow] = useState([]);
  const [dataVeMayBay,setDataVeMayBay] = useState([]);
  const [hoaDonThongKe,setHoaDonThongKe] = useState([]);
  const [tongTien, setTongTien] = useState(0.0);
  const [soLuongHanhKhachmonthnow, setSoLuongHanhKhachmonthnow] = useState(0);
  // hiển thị icon tìm kiếm
  const [showSearchingIcon, setShowSearchingIcon] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  // Tìm kiếm chuyến bay
  const [chuyenBays, setChuyenBays] = useState([]);
  const [firstDay, setFirstDay] = useState('');
  const [lastDay, setLastDay] = useState('');
  const [flightDetails, setFlightDetails] = useState(null);
  const [hasData, setHasData] = useState(true);

  const handleFlightHover = (maChuyenBay) => {
    // Tìm chuyến bay dựa trên ID
    const chuyenBay = chuyenBays.find((chuyenBay) => chuyenBay.maChuyenBay === maChuyenBay);
    setFlightDetails(chuyenBay);
  };
  //phân trang cho tìm kiếm chuyến bay
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(16);

  // Tính chỉ số của bản ghi đầu tiên và bản ghi cuối cùng trên trang hiện tại
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = chuyenBays.slice(indexOfFirstRecord, indexOfLastRecord);

  // Tạo một mảng chứa các số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(chuyenBays.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Chuyển đến trang mới
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render các nút phân trang
  const renderPageNumbers = pageNumbers.map((pageNumber) => (
    <li
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={pageNumber === currentPage ? 'active' : ''}
    >
      {pageNumber}
    </li>
  ));

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
      .get("http://localhost:8080/dashboard/so-luong-hanh-khach-thang-nay")
      .then((response) => {
        setSoLuongHanhKhachmonthnow(response.data);
      })
      .catch((err) => console.error);

      axios
      .get("http://localhost:8080/dashboard/list-ve-may-bay-thong-ke")
      .then((response) => {
        setDataVeMayBay(response.data);
      })
      .catch((err) => console.error);

      axios
      .get("http://localhost:8080/dashboard/list-chuyen-bay-month-now")
      .then((response) => {
        setDataChuyenBayMonthNow(response.data);
      })
      .catch((err) => console.error);

      axios
      .get("http://localhost:8080/dashboard/chuyenbaythongke")
      .then((response) => {
        setUserDataChuyenBay(response.data);
      })
      .catch((err) => console.error);

      axios
      .get("http://localhost:8080/dashboard/hoadonthongke")
      .then((response) => {
        setHoaDonThongKe(response.data);
      })
      .catch((err) => console.error);

    axios
      .get("http://localhost:8080/dashboard/total")
      .then((response) => {
        setTotal(response.data);
      })
      .catch((err) => console.error);

    axios
    .get("http://localhost:8080/dashboard/totalHK")
    .then((response) => {
      setTotalHK(response.data);
    })
    .catch((err) => console.error);

    setShowSearchResult(false);

  }, [firstDay, lastDay]);
  const getVeMayBayThongKe =() => {
    return {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        label: "total",
        data: dataVeMayBay.map((data) => data.so_luong_ve),
        backgroundColor: ["red","orange","yellow","green","blue","purple","pink","orange","brown","black","gray","lavender"]
      }]
    }
  }
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

  const searchChuyenBay =  () => {
    try {
      if (new Date(lastDay) < new Date(firstDay)) {
        alert("Ngày cuối phải sau ngày đầu");
        return;
      }
      if (!firstDay || !lastDay) {
        alert("Vui lòng nhập ngày đầu và ngày cuối");
        return;
      }
      setShowSearchingIcon(true); // Hiển thị icon tìm kiếm
      setShowSearchResult(false);
      setTimeout(() => {
        const response =  axios
        .get(`http://localhost:8080/dashboard/listchuyenbay?firstDay=${firstDay}&lastDay=${lastDay}`)
        .then((response) =>{
          const data = response.data;
          setChuyenBays(data);
          setShowSearchingIcon(false); // Ẩn icon tìm kiếm
          setShowSearchResult(true); // Hiển thị kết quả tìm kiếm
          setHasData(data.length > 0);
        })
      }, 2000);
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
  //  lấy tháng hiện tại
      let currentDate = new Date();
      let currentMonth = currentDate.getMonth() + 1;
  const tongTienThang = hoaDonThongKe.find(data => data.thang === currentMonth)?.tong_tien_thang;
  const phanTramTien = tongTienThang/100000*100;
  // Tổng số vé máy bay
  const sumVeMayBay = dataVeMayBay.reduce((total, item) => total + item.so_luong_ve, 0);
  const soVeThang = dataVeMayBay.find(data => data.thang === currentMonth)?.so_luong_ve;
  return (

   <div className={`barchart ${on ? "tot" : ""}`}>
    <div data-aos="fade-up" className="container state-overview ">
      <div className="row">
        <div className="col-xl-3 col-md-6 col-12">
          <div className="info-box bg-primary shadow">
            <div className='icon'><i class="fa-regular fa-paper-plane"></i></div>
            <div className="info-box-content">
              <span className="info-box-text">Số Lượng Vé Máy Bay</span><br></br>
              <span className="info-box-number">{sumVeMayBay}</span>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${soVeThang}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
                 {soVeThang} Vé Đạt {soVeThang}% Tháng Này
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
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${soLuongHanhKhachmonthnow}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
               {soLuongHanhKhachmonthnow} Hành Khách Đạt {soLuongHanhKhachmonthnow}% Tháng Này
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
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${dataChuyenBayMonthNow.length}%` }}  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
              {dataChuyenBayMonthNow.length} Chuyến Bay Đạt {dataChuyenBayMonthNow.length}% Tháng Này
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
                <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${phanTramTien}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="progress-description">
                {tongTienThang}$ Đạt {phanTramTien}% Tháng Này
              </span>
              </div>
            </div>
          </div>
         </div>
        </div>
    <div className='chart'>
    <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage2}>Download Line</button>
        <Line data={getChuyenBayThongKe()} ref={lineRef} style={{ display: "inline"}}></Line>
        <h6 className={`${on ? "color" : ""}`}>Biểu Đồ 1.A: Thể Hiện Số Lượng Chuyến Bay Mỗi Tháng</h6>
      </div>
      <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage}>Download Bar</button>
        <Bar data={getHoaDonThongKe()} ref={ref} ></Bar>
        <h6 className={`${on ? "color" : ""}`}>Biểu Đồ 1.B: Thể Hiện Tổng Doanh Thu Mỗi Tháng</h6>
      </div>
      <div  data-aos="fade-up" className='bar'>
        <button type='button' onClick={downloadImage1}>Download Pie</button>
        <Pie data={getVeMayBayThongKe()} ref={pieRef}></Pie>
        <h6 className={`${on ? "color" : ""}`}>Biểu Đồ 1.C: Thể Hiện Số Lượng vé Mỗi Tháng</h6>
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
        {showSearchingIcon && <div className='iconsearch'><img
                        src="https://i.giphy.com/media/HTSsuRrErs54g1Tqr5/giphy.webp" alt="Flight" /></div>}
        {showSearchResult && (
        <div  data-aos="fade-up" className='bay'>
          {currentRecords.map((chuyenBay) => (
            <div data-aos="fade-up" className='plane' key={chuyenBay.maChuyenBay}>
             <i class="fa-solid fa-plane icon"></i>
             <small key={chuyenBay.maChuyenBay} onMouseEnter={() => handleFlightHover(chuyenBay.maChuyenBay)}
            onMouseLeave={handleFlightLeave}>{chuyenBay.maChuyenBay}</small>
          </div>
          ))}
              {!hasData && <h1 className='notdata'>Không có dữ liệu</h1>}
             {flightDetails && (
        <div className='detailCB'>
           <h2>Chuyến Bay : {flightDetails.maChuyenBay}</h2>
          <h2>{flightDetails.diemDi}  <i class="fa-solid fa-plane"></i>  {flightDetails.diemDen}</h2>
          <h2>Thời Gian: {flightDetails.gioKhoiHanh}  <i class="fa-solid fa-arrow-right"></i>  {flightDetails.gioHaCanh}</h2>
          <h2>Ngày Khởi Hành: {flightDetails.ngayKhoiHanh} </h2>
          {/* Các trường thông tin khác */}
        </div>
      )}
             <ul className="pagination">
                {renderPageNumbers}
              </ul>
          </div>
        )}
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
