import './HanhKhach.css';

function HanhKhach() {
    return (
        <div class='container table-shadow'>
        <h1 class="pt-3 mb-0">QUẢN LÝ HÀNH KHÁCH</h1>
        <form class="row justify-content-center search">
            <div class="form-group col-md-2 ">
                <h5>Tìm Kiếm</h5>
            </div>
            <div class="form-group col-md-2"> <input id="adults" type="text" name="adults" class="form-control"
                    placeholder="Tên hành khách" /> </div>

            <div class="form-group col-md-2 "> <button type="submit" class="btn btn-success"> Tìm Kiếm</button> </div>
        </form>
        <table class="table table-striped">
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
        <div class="pagination">
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item disabled"> <span class="page-link">Previous</span> </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active" aria-current="page"> <span class="page-link">2</span> </li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"> <a class="page-link" href="#">Next</a> </li>
                </ul>
            </nav>
        </div>
    </div>
    );
}
export default HanhKhach;