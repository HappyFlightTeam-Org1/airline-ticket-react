import React, { useRef } from 'react';
import { PDFJSStatic, PDFDocumentProxy } from 'pdfjs-dist';

const VeMayBay = () => {
    const pdfViewerRef = useRef < HTMLDivElement > (null);

    const handlePrint = async () => {
        const pdfjs: PDFJSStatic = (window as any).pdfjsLib;
        const loadingTask = pdfjs.getDocument('path/to/your/flight-ticket.pdf');

        try {
            const pdf: PDFDocumentProxy = await loadingTask.promise;
            const page = await pdf.getPage(1);

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: 1 });

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            await page.render(renderContext);
            const imageData = canvas.toDataURL('image/png');

            const printWindow = window.open('', '_blank');
            printWindow?.document.open();
            printWindow?.document.write(`<img src="${imageData}" onload="window.print();window.close();" />`);
            printWindow?.document.close();
        } catch (error) {
            console.error('Failed to load PDF:', error);
        }
    };

    return (
        <div>
            <h1>Vé máy bay</h1>
            <div ref={pdfViewerRef} />
            <button onClick={handlePrint}>In vé</button>
        </div>
    );
};

export default VeMayBay;