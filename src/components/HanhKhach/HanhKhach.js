import './HanhKhach.css';

function HanhKhach() {
    return (
        <div className='container table-shadow'>
        <h1 className="pt-3 mb-0">QUẢN LÝ HÀNH KHÁCH</h1>
        <form className="row justify-content-center search">
            <div className="form-group col-md-2 ">
                <h5>Tìm Kiếm</h5>
            </div>
            <div className="form-group col-md-2"> <input id="adults" type="text" name="adults" className="form-control"
                    placeholder="Tên hành khách"></input> </div>

            <div className="form-group col-md-2 "> <button type="submit" className="btn btn-success"> Tìm Kiếm</button> </div>
        </form>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Mã Hành khách</th>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">CCCD/Hộ chiếu</th>
                    <th scope="col">Mã Vé</th>
                    <th scope="col">Mã Chuyến bay</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">HK001</th>
                    <td>Nguyen Van A</td>
                    <td>02-06-2001</td>
                    <td>034954955</td>
                    <td>Nam</td>
                    <td>049584859384</td>
                    <td>V003</td>
                    <td>CB002</td>
                </tr>
                <tr>
                    <th scope="row">HK002</th>
                    <td>Nguyen Van B</td>
                    <td>02-06-2002</td>
                    <td>034954555</td>
                    <td>Nam</td>
                    <td>049584559384</td>
                    <td>V004</td>
                    <td>CB005</td>
                </tr>
                <tr>
                    <th scope="row">HK003</th>
                    <td>Nguyen Thi C</td>
                    <td>02-05-1999</td>
                    <td>034954445</td>
                    <td>Nu</td>
                    <td>04958465384</td>
                    <td>V009</td>
                    <td>CB005</td>
                </tr>
                <tr>
                    <th scope="row">HK004</th>
                    <td>Nguyen Van D</td>
                    <td>02-06-2004</td>
                    <td>034934735</td>
                    <td>Nam</td>
                    <td>04953485384</td>
                    <td>V011</td>
                    <td>CB025</td>
                </tr>
            </tbody>
        </table>
        <div className="pagination">
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item disabled"> <span className="page-link">Previous</span> </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active" aria-current="page"> <span className="page-link">2</span> </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"> <a className="page-link" href="#">Next</a> </li>
                </ul>
            </nav>
        </div>
    </div>
    );
}
export default HanhKhach;