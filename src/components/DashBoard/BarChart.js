import React, { useState, useCallback, useRef } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { UserData } from "./Data";
import { Chart as ChartJS } from "chart.js/auto";
import "./BarChart.css";

function BarChart() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: "price",
        data: UserData.map((data) => data.price),
        backgroundColor: [
          "red",
          "orange",
          "yellow",
          "green",
          "blue",
          "purple",
          "pink",
          "orange",
          "brown",
          "black",
          "gray",
          "lavender",
        ],
      },
    ],
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
    <div>
      <div className="container state-overview ">
        <div className="row">
          <div className="col-xl-3 col-md-6 col-12">
            <div className="info-box bg-primary shadow">
              <div className="icon">
                <i className="bx bxs-user"></i>
              </div>
              <div className="info-box-content">
                <span className="info-box-text">Users</span>
                <br></br>
                <span className="info-box-number">30</span>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-info"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="progress-description">
                  60% Increase in 28 Days
                </span>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 col-12">
            <div className="info-box bg-warning shadow">
              <div className="icon">
                <i class="bx bx-phone-call"></i>
              </div>
              <div className="info-box-content">
                <span className="info-box-text">Products</span>
                <br></br>
                <span className="info-box-number">30</span>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-info"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="progress-description">
                  50% Increase in 28 Days
                </span>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 col-12">
            <div className="info-box bg-danger shadow">
              <div className="icon">
                <i class="bx bxs-plane-alt"></i>
              </div>
              <div className="info-box-content">
                <span className="info-box-text">Total Product On Order</span>
                <br></br>
                <span className="info-box-number">50</span>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-info"
                    role="progressbar"
                    style={{ width: "30%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="progress-description">
                  30% Increase in 28 Days
                </span>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 col-12">
            <div className="info-box bg-success shadow">
              <div className="icon">
                <i class="bx bx-dollar-circle"></i>
              </div>
              <div className="info-box-content">
                <span className="info-box-text">Total Earning</span>
                <br></br>
                <span className="info-box-number">5000</span>
                <span>$</span>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-info"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="progress-description">
                  80% Increase in 28 Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart">
        <div className="bar">
          <button type="button" onClick={downloadImage}>
            Download Bar
          </button>
          <Bar data={userData} ref={ref}></Bar>
        </div>
        <div className="bar">
          <button type="button" onClick={downloadImage2}>
            Download Line
          </button>
          <Line
            data={userData}
            ref={lineRef}
            style={{ display: "inline" }}
          ></Line>
        </div>
        <div className="bar">
          <button type="button" onClick={downloadImage1}>
            Download Pie
          </button>
          <Pie data={userData} ref={pieRef}></Pie>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
