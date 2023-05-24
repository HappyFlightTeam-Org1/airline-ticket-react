import React from 'react';
import ExportPDFButton from './ExportPDFButton';
import VeMayBay from './InVeMayBay';

import './InVeMayBay.css'
import html2pdf from 'html2pdf.js';
const InVeMayBay = () => {
    const handleExportPDF = () => {
        const element = document.getElementById('pdf-content'); // Lấy thẻ chứa nội dung HTML muốn xuất
        html2pdf().from(element).save('exported.pdf'); // Xuất nội dung HTML thành tệp PDF
    };
    return (
        <div>
            <button onClick={handleExportPDF}>Xuất PDF</button>
            <div id="pdf-content">
                <p>Đây là nội dung được xuất thành PDF.</p>
                <p>Các thẻ &lt;p&gt; sẽ được chuyển đổi thành văn bản trong tệp PDF.</p>
            </div>
        </div>
    );
};

export default InVeMayBay;