import React, { useState, useEffect } from "react";
import './LichSuDatVe.css'
import axios from "axios";
import ReactPaginate from 'react-paginate';
function LichSuDatVe() {



    const [pageNumber, setPageNumber] = useState(0);

    const ticketPerPages = 5;
    const pagesVisited = pageNumber * ticketPerPages;

    const getTicketList = async () => {
        const response = await axios.get(`http://localhost:8080/VeMayBay/list?page=${pageNumber}&size=${ticketPerPages}`)
            .then((response) => {
                setTickets(response.data);
                console.log("VE MAY BAY");
                console.log(response.data);
            })
            .catch((err) => console.error);

        return response;
    };

    const [tickets, setTickets] = useState(getTicketList);

    useEffect(() => {
        getTicketList();
    }, [pagesVisited]);


    const pageCount = Math.ceil(tickets.length / ticketPerPages);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8080/VeMayBay/list")
    //         .then((response) => {
    //             setTickets(response.data);
    //             console.log("VE MAY BAY");
    //             console.log(response.data);
    //         })
    //         .catch((err) => console.error);
    // }, []);
    return (
        <div>Thien Duy</div>
        // <div className='container bg-body table-shadow mt-3'>
        //     <div className="pt-5 pb-2">
        //         <div className="text-center pb-2">
        //             <h1>LỊCH SỬ ĐẶT VÉ</h1>
        //         </div>
        //         <form className="row justify-content-center">
        //             <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
        //                 <h5>Tìm Kiếm Theo</h5>
        //             </div>
        //             <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
        //                 <input id="adults" type="text" name="maVe" className="form-control" placeholder="Mã Vé" />
        //             </div>
        //             <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
        //                 <input id="adults" type="text" name="adults" className="form-control" placeholder="Tên hành khách" />
        //             </div>
        //             <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
        //                 <input id="adults" type="text" name="adults" className="form-control" placeholder="Nơi Đi" />
        //             </div>
        //             <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
        //                 <input id="adults" type="text" name="adults" className="form-control" placeholder="Nơi đến" />
        //             </div>
        //             <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
        //                 <button type="submit" className="btn btn-success"> Tìm Kiếm</button>
        //             </div>
        //         </form>
        //     </div>
        //     <table className="table table-striped border">
        //         <thead>
        //             <tr>
        //                 <th scope="col">Mã Vé</th>
        //                 <th scope="col">Tên Hành Khách</th>
        //                 <th scope="col">Ngày Booking</th>
        //                 <th scope="col">Ngày Bay</th>
        //                 <th scope="col">Nơi Đi</th>
        //                 <th scope="col">Nơi Đến</th>
        //                 <th scope="col">Hạng Vé</th>
        //                 <th scope="col">Giá Vé</th>
        //                 <th scope="col">Thao Tác</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {tickets != null && tickets.map((item, index) => {
        //                 return (
        //                     <tr className="align-middle" key={item.maVe}>
        //                         <th scope="row">{item.maVe}</th>
        //                         <td>{item.hanhKhach.tenHanhKhach}</td>
        //                         <td>{item.hoaDon.ngayTao}</td>
        //                         <td>{item.datCho.chuyenBay.ngayKhoiHanh}</td>
        //                         <td>{item.datCho.chuyenBay.diemDi}</td>
        //                         <td>{item.datCho.chuyenBay.diemDen}</td>
        //                         <td>{item.datCho.ghe.loaiGhe.tenLoaiGhe}</td>
        //                         <td>{item.giaVe}</td>
        //                         <td>
        //                             <button className="btn btn-primary" type="submit">In</button>
        //                             <button className="btn btn-danger" type="submit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Huỷ</button>
        //                         </td>
        //                     </tr>
        //                 )
        //             })}
        //         </tbody>

        //     </table>
        //     <ReactPaginate
        //         previousLabel="Previous"
        //         nextLabel="Next"
        //         pageCount={pageCount}
        //         onPageChange={changePage}
        //         containerClassName="pagination"
        //         activeClassName="active"
        //     />
        //     <div className="justify-content-center pagination">
        //         <nav aria-label="...">
        //             <ul className="pagination">
        //                 <li className="page-item disabled">
        //                     <span className="page-link">Previous</span>
        //                 </li>
        //                 <li className="page-item"><a className="page-link" href="#">1</a></li>
        //                 <li className="page-item active" aria-current="page">
        //                     <span className="page-link">2</span>
        //                 </li>
        //                 <li className="page-item"><a className="page-link" href="#">3</a></li>
        //                 <li className="page-item">
        //                     <a className="page-link" href="#">Next</a>
        //                 </li>
        //             </ul>
        //         </nav>
        //     </div>

        //     <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        //         <div className="modal-dialog">
        //             <div className="modal-content">
        //                 <div className="modal-header bg-danger">
        //                     <h5 className="modal-title text-white" id="staticBackdropLabel">XÁC NHẬN</h5>
        //                     <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
        //                 </div>
        //                 <div className="modal-body">
        //                     <div>
        //                         <h5>Bạn thực sự muốn hủy vé mày?</h5>
        //                         <span>- Mã vé: TK001</span>
        //                         <br></br>
        //                         <span>- Hành khách: Nguyen Van A</span>
        //                     </div>
        //                 </div>
        //                 <div className="modal-footer">
        //                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy bỏ</button>
        //                     <button type="button" className="btn btn-warning">Xác nhận</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
export default LichSuDatVe;
