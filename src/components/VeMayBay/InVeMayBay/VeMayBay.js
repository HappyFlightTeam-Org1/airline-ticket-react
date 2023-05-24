import React from 'react';
import backgroundImage from './airline-ticket.jpg';
import ExportPDFButton from './ExportPDFButton';
import './InVeMayBay.css'
import html2pdf from 'html2pdf.js';
import { Color } from 'three';

import jsPDF from 'jspdf';


export default function VeMayBay() {
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    const handleExportPDF = () => {
        const doc = new jsPDF(); // Khởi tạo đối tượng jsPDF
        const element = document.getElementById('pdf-content'); // Lấy thẻ chứa nội dung HTML muốn xuất
        doc.html(element, {
            callback: function () {
                doc.save('exported.pdf'); // Lưu tệp PDF
            }
        });
    };

    return (
        <div>
            <button onClick={handleExportPDF}>Xuất PDF</button>
            <div id="pdf-content">
                {/* <div className=''>
                    <div className='col-3'><img src={backgroundImage} alt='done' /></div>
                </div> */}
                <div className='height container-ticket-to-print col-3' style={divStyle}>
                    <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
                    <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
                    <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
                </div>
                <p>Đây là nội dung được xuất thành PDF.</p>
                <p>Nội dung trong thẻ &lt;div&gt; này sẽ được chuyển đổi thành tệp PDF.</p>

            </div>
        </div >
    );
    //     render() {
    //         return (
    //             <div>
    //                 <h1>Vé máy bay</h1>
    //                 {/* Hiển thị thông tin vé máy bay */}
    //                 <ExportPDFButton />
    //             </div>
    //         );
    //     }
}

// const VeMayBay = () => {

// const handleExportPDF = () => {
//     const element = document.getElementById('pdf-content'); // Lấy thẻ chứa nội dung HTML muốn xuất
//     html2pdf().from(element).save('exported.pdf'); // Xuất nội dung HTML thành tệp PDF
// };
// return (
//     <div>
//         <button onClick={handleExportPDF}>Xuất PDF</button>
//         <div id="pdf-content">
//             <p className='text-danger'>Đây là nội dung được xuất thành PDF.</p>
//             <p>Các thẻ &lt;p&gt; sẽ được chuyển đổi thành văn bản trong tệp PDF.</p>
//         </div>
//     </div >
// );


// const divStyle = {
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: '100%',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
// };
// //     return <div style={divStyle}>Content goes here</div>;
// return (
//     <div>
//         {/* <h1>Trang HTML</h1> */}
//         <div className='container d-flex justify-content-center'>
//             <div className='col-9'>
//                 <div id="content-to-export">
//                     {/* <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                     <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                     <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                     <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                     <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                     <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p> */}

//                     <div className='height container-ticket-to-print' style={divStyle}>
//                         <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                         <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                         <p>THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95 THIEN DUY 95</p>
//                     </div>

//                 </div>
//             </div>

//         </div>
//         <div className='d-flex justify-content-end'>
//             <ExportPDFButton />
//         </div>
//     </div>
// );
// };

// export default VeMayBay;