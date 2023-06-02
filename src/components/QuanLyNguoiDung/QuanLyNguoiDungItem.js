import axios from "axios";
import { useEffect, useState } from "react";

export default function QuanLyNguoiDungItem({
    data,
    index,
    currentPage,
    pageSize
}) {
    const [toggleState, setToggleState] = useState(false);

    useEffect(() => {
        if (data.trangThaiXoa === 0) {
            setToggleState(true);
        }
        else {
            setToggleState(false);
        }
    }, []);

    function handleDeleteNguoiDung(email) {
        setToggleState(false);
        let formData = new FormData();
        formData.append("email", email);
        axios
          .post("http://localhost:8080/nguoi-dung/delete-nguoi-dung", formData, {
            withCredentials: true,
          })
          .catch(err => console.log(err));
      }
    
      function handleRemoveDeleteNguoiDung(email) {
        setToggleState(true);
        let formData = new FormData();
        formData.append("email", email);
        axios
          .post("http://localhost:8080/nguoi-dung/remove-delete-nguoi-dung", formData, {
            withCredentials: true,
          })
          .catch(err => console.log(err));
      }

    return (
        <tr className="align-middle" key={data.email}>
            <th scope="row">{index + 1 +currentPage*pageSize}</th>
            <td>{data.hoVaTen}</td>
            <td>{data.email}</td>
            <td>{data.soDienThoai}</td>
            <td>{data.gioiTinh}</td>
            <td>{data.ngaySinh}</td>
            <td>{data.hoChieu}</td>
            <td>{data.diaChi}</td>
            <td>{data.quocTich.tenQuocTich}</td>
            <td>
            {toggleState
            ? <button className="btn btn-danger" type="button" onClick={() => handleDeleteNguoiDung(data.email)}>Khoá</button>
            : <button className="btn btn-info bg" type="button" onClick={() => handleRemoveDeleteNguoiDung(data.email)}>Mở</button>
            }
            </td>
        </tr>
    );
}