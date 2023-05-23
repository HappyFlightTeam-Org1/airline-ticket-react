import React, { useState, useEffect } from "react";
import axios from "axios";
import maybay from "../../../Assets/plane.webp";
import "./DatCho.css";
const DatCho = () => {
  return (
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
