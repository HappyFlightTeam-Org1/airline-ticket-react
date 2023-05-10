import React from 'react'

export default function Silde() {
  return (
    <div>
<section>
  <div className="silde">
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://img.freepik.com/free-vector/plane-fly-blue-sky-with-clouds_107791-9038.jpg?w=1800&t=st=1683706881~exp=1683707481~hmac=33cec136051ede8337920303066e6a4cd6bddbdd1a56146679890d5aa2710fa3" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-photo/speed-drive-urban-architecture-city_1112-1198.jpg?w=1800&t=st=1683707033~exp=1683707633~hmac=fd506110772c180c51fd95e2b2a64e52fe50b7236238189174e7683ae60b1a32" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-photo/airplane-sunset_1150-8338.jpg?w=1800&t=st=1683707689~exp=1683708289~hmac=c4c33e32ea6d393db716d36df0f9c3683d621fc41702deb32f0b83eea7116811" className="d-block w-100" alt="..."/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <div className="search">
      <form className="row justify-content-center mt-5">
        <div className="form-group col-md-2">
          <h3>Tìm Nhanh</h3>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="flightType">Loại chuyến bay</label>
          <select id="flightType" className="form-control" name="flightType">
            <option value="Một Chiều">Một Chiều</option>
            <option value="Khứ Hồi">Khứ Hồi</option>
          </select>
        </div>
        <div className="form-group col-md-2"> <label htmlFor="fromCity">Điểm đi</label>
          <select id="fromCity" type="text" className="form-control" name="fromCity">
            <option>Sân Bay Nội Bài</option>
            <option>Sân Bay Đà Nẵng</option>
            <option>Sân Bay Tân Sơn Nhất</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="toCity">Điểm đến</label>
          <select id="toCity" type="text" className="form-control" name="toCity">
            <option>Sân Bay Nội Bài</option>
            <option>Sân Bay Đà Nẵng</option>
            <option>Sân Bay Tân Sơn Nhất</option>
          </select>
        </div>
        <div className="form-group col-md-2"> <label htmlFor="departureDate">Ngày đi</label>
          <input id="departureDate" type="date" className="form-control" name="departureDate" />
        </div>
        <div className="form-group col-md-2"> <label htmlFor="returnDate" id="label_return_date"> Ngày về </label> <input
            type="date" className="form-control" name="returnDate" id="return_date" /> </div>
        <div className="form-group col-md-3"> <label htmlFor="adults">Người lớn (trên 12 tuổi)</label>
          <input id="adults" type="number" name="adults" className="form-control"  />
        </div>
        <div className="form-group col-md-3"> <label htmlFor="children">Trẻ em (dưới 12 tuổi)</label> <input id="children"
            type="number" className="form-control" name="children" /> </div>
        <div className="form-group col-md-3"> <label htmlFor="baby">Em bé (dưới 24 tháng)</label> <input id="baby"
            type="number" className="form-control" name="baby" />
        </div>
        <div className="form-group col-md-3 text-center">
               <div className="text-white" >
                  <button type="submit" className="btn btn-success"> Tìm Chuyến Bay </button>
               </div>
        </div>
      </form>
    </div>
  </div>
 </section>

    </div>
  )
}
