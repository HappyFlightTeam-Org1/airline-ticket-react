import React from 'react';
// import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

class ExportPDFButton extends React.Component {
    // exportToPDF = () => {
    //     const element = document.getElementById('content-to-export'); // ID của phần tử chứa HTML cần xuất
    //     const options = {
    //         filename: 'exported.pdf',
    //         image: { type: 'jpeg', quality: 0.98 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    //     };

    //     html2pdf().from(element).set(options).save();
    // };

    // render() {
    //     return (
    //         <button className="btn btn-primary" onClick={this.exportToPDF}>In vé</button>
    //     );
    // }
    exportToPDF = () => {
        const doc = new jsPDF();
        const ticketContent = this.generateTicketContent(); // Hàm để tạo nội dung vé máy bay
    
        doc.text(ticketContent, 10, 10); // Vẽ nội dung vé máy bay lên tài liệu PDF
        doc.save('ve-may-bay.pdf'); // Lưu tệp PDF với tên "ve-may-bay.pdf"
      };
    
      generateTicketContent = () => {
        // Hàm này tạo và trả về nội dung vé máy bay dưới dạng chuỗi
        // Bạn có thể tạo nội dung vé máy bay dựa trên dữ liệu thực tế của bạn
        return 'Nội dung vé máy bay';
      };
    
      render() {
        return (
          <button onClick={this.exportToPDF}>Xuất vé máy bay PDF</button>
        );
      }
}

export default ExportPDFButton;