/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LichSuDatVe.css";
import axios from "axios";
function LichSuDatVe() {
    const [tickets, setTickets] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [formData, setFormData] = useState({});
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    //CHỨC NĂNG TÌM KIẾM
    const [pageNumber, setPageNumber] = useState(0);
    const [tenHanhKhach, setTenHanhKhach] = useState();
    const [diemDi, setDiemDi] = useState();
    const [diemDen, setDiemDen] = useState();
    const [maVe, setMaVe] = useState();
    const [totalPages, setTotalPages] = useState();
    const [sanBay, setSanBay] = useState([]);

    //CHỨC NĂNG XÓA
    const [selectedObject, setSelectedObject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [maVeDelete, setMaVeDelete] = useState();
    const [tenHanhKhachDelete, setTenHanhKhachDelete] = useState();
    const handleDelete = (veMayBay) => {
        console.log("vemaybaytostring", veMayBay);
        setSelectedObject(veMayBay);
        setMaVeDelete(veMayBay.maVe);
        setTenHanhKhachDelete(veMayBay.hanhKhach.tenHanhKhach)
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        axios
            .delete(`http://localhost:8080/VeMayBay/delete/${selectedObject.maVe}`) // Replace with your API endpoint
            .then((response) => {
                fetchTicketList();
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/VeMayBay/listSanBay")
            .then((response) => {
                setSanBay(response.data);
            })
            .catch((err) => console.error);
    }, []);

    //DuyNT58 load lại danh sách vé máy bay khi có thay đổi
    useEffect(() => {
        fetchTicketList();
    }, [page, size, maVe, tenHanhKhach, diemDi, diemDen]);

    //DuyNT58 lấy danh sách vé máy bay
    const fetchTicketList = async () => {
        try {
            const response = await axios.get("http://localhost:8080/VeMayBay/page", {
                params: {
                    page,
                    size,
                    maVe,
                    tenHanhKhach,
                    diemDi,
                    diemDen,
                },
            });
            setTotalPages(response.data.totalPages);
            if (maVe || tenHanhKhach || diemDi || diemDen) {
                setIsSearching(true);
                setSearchResult(response.data.content);
            } else {
                setIsSearching(false);
                setTickets(response.data.content);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //DuyNT58 nhập thông tin tìm kiếm
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    //DuyNT58 gởi thông tin search/ nếu không nhập gì lấy tìm tất cả
    const handleSearch = (event) => {
        event.preventDefault();
        setPage(0);
        setMaVe(formData.maVe);
        setTenHanhKhach(formData.tenHanhKhach);
        setDiemDi(formData.diemDi);
        setDiemDen(formData.diemDen);
        if (!maVe && !tenHanhKhach && !diemDi && !diemDen) {
            setIsSearching(false);
            fetchTicketList();
        }
    };

    //DuyNT58 chọn trang muốn hiển thị
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    //DuyNT58 tính toán trang được hiển thị trên màn hình
    const calculatePageNumbers = () => {
        const soTrangToiDa = 3;
        const trangDau = Math.max(0, page - Math.floor(soTrangToiDa / 2));
        const trangCuoi = Math.min(totalPages - 1, trangDau + soTrangToiDa - 1);
        const pageNumbers = [];
        for (let i = trangDau; i <= trangCuoi; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    //DuyNT58 hiển thị giao diện số trang
    const renderPageNumbers = () => {
        const pageNumbers = calculatePageNumbers();
        return pageNumbers.map((pageNumber) => (
            <li
                key={pageNumber}
                className={`page-item ${page === pageNumber ? "active" : ""}`}
            >
                <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber + 1}
                </a>
            </li>
        ));
    };

    return (
        <div className="container ticket-container bg-body table-shadow">
            <div className="pt-5 pb-2">
                <div className="text-center pb-2">
                    <h1>LỊCH SỬ ĐẶT VÉ</h1>
                </div>

                {/* form search */}
                <form className="row justify-content-center" onSubmit={handleSearch}>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <h5>Tìm Kiếm Theo</h5>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input
                            id="maVe"
                            value={formData.maVe}
                            type="text"
                            name="maVe"
                            className="form-control"
                            placeholder="Mã Vé"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <input
                            id="tenHanhKhach"
                            value={formData.tenHanhKhach}
                            type="text"
                            name="tenHanhKhach"
                            className="form-control"
                            placeholder="Tên hành khách"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            name="diemDi"
                            id="diemDi"
                            value={formData.diemDi}
                            onChange={handleInputChange}
                            className="form-control "
                        >
                            <option value="">-- Chọn điểm đi --</option>
                            {sanBay.map((sanBay) => (
                                <option key={sanBay.maSanBay} value={sanBay.thanhPho}>
                                    {sanBay.thanhPho}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <select
                            name="diemDen"
                            id="diemDen"
                            value={formData.diemDen}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">-- Chọn điểm đến --</option>
                            {sanBay.map((sanBay) => (
                                <option key={sanBay.maSanBay} value={sanBay.thanhPho}>
                                    {sanBay.thanhPho}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-2 d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn bg">
                            {" "}
                            Tìm Kiếm
                        </button>
                    </div>
                </form>
            </div>
            <div className="mh-300">
                <table className="table table-striped border text-nowrap" >
                    <thead>
                        <tr>
                            <th scope="col">Mã Vé</th>
                            <th scope="col">Tên Hành Khách</th>
                            <th scope="col">Ngày Booking</th>
                            <th scope="col">Ngày Bay</th>
                            <th scope="col">Nơi Đi</th>
                            <th scope="col">Nơi Đến</th>
                            <th scope="col">Hạng Vé</th>
                            <th scope="col">Giá Vé</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSearching
                            ? searchResult.map((item) => {
                                return (
                                    <tr className="align-middle text-nowrap" key={item.maVe}>
                                        <th scope="row">{item.maVe}</th>
                                        <td>{item.hanhKhach.tenHanhKhach}</td>
                                        <td>{item.hoaDon.ngayTao}</td>
                                        <td>{item.datCho.chuyenBay.ngayKhoiHanh}</td>
                                        <td>{item.datCho.chuyenBay.diemDi}</td>
                                        <td>{item.datCho.chuyenBay.diemDen}</td>
                                        <td>{item.datCho.ghe.loaiGhe.tenLoaiGhe}</td>
                                        <td>{item.giaVe}</td>
                                        <td>
                                            <Link
                                                as={Link}
                                                to={`/InVe?maVe=${item.maVe.toString()}`}
                                                className="text-white"
                                            >
                                                <button className="btn bg" type="submit">
                                                    In
                                                </button>
                                            </Link>

                                            <button
                                                className="btn btn-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={() => handleDelete(item)}>Hủy</button>
                                        </td>
                                    </tr>
                                );
                            })
                            : tickets.map((item, index) => {
                                return (
                                    <tr className="align-middle" key={item.maVe}>
                                        <th scope="row">{item.maVe}</th>
                                        <td>{item.hanhKhach.tenHanhKhach}</td>
                                        <td>{item.hoaDon.ngayTao}</td>
                                        <td>{item.datCho.chuyenBay.ngayKhoiHanh}</td>
                                        <td>{item.datCho.chuyenBay.diemDi}</td>
                                        <td>{item.datCho.chuyenBay.diemDen}</td>
                                        <td>{item.datCho.ghe.loaiGhe.tenLoaiGhe}</td>
                                        <td>
                                            {item.datCho.ghe.loaiGhe.tenLoaiGhe === "Phổ Thông"
                                                ? item.giaVe
                                                : item.giaVe * 1.5}
                                        </td>
                                        <td>
                                            <Link
                                                as={Link}
                                                to={`/InVe?maVe=${item.maVe.toString()}`}
                                                className="text-white"
                                            >
                                                <button className="btn bg" type="submit">
                                                    In
                                                </button>
                                            </Link>

                                            <button
                                                className="btn btn-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={() => handleDelete(item)}>Hủy</button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>


            {((tickets.length > 0 && isSearching === false) || searchResult.length > 0) && (
                <div className="pagination">
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                <button
                                    type="button"
                                    className="page-link bg-warning text-white bg"
                                    onClick={() => setPage(0)}
                                    disabled={page === 0}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-double-left"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                <button
                                    type="button"
                                    className="page-link bg-success text-white bg"
                                    disabled={page === 0}
                                    onClick={() => handlePageChange(page - 1)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-left"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            {renderPageNumbers()}

                            <li
                                className={`page-item   ${page === totalPages - 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    type="button"
                                    className={`page-link  bg-success text-white none bg   ${page === totalPages - 1 ? "disabled" : ""
                                        }`}
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages - 1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <li
                                className={`page-item   ${page === totalPages - 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className={`page-link bg-danger text-white bg ${page === totalPages - 1 ? "disabled" : ""
                                        }`}
                                    onClick={() => setPage(totalPages - 1)}
                                    disabled={page === totalPages - 1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-chevron-double-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger">
                            <h5 className="modal-title text-white" id="staticBackdropLabel">
                                XÁC NHẬN
                            </h5>
                            <button
                                type="button"
                                className="btn-close text-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h5>Bạn thực sự muốn hủy vé mày?</h5>
                                <span>- Mã vé: {maVeDelete}</span>
                                <br></br>
                                <span>- Hành khách: {tenHanhKhachDelete}</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={confirmDelete}
                                data-bs-dismiss="modal"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LichSuDatVe;
