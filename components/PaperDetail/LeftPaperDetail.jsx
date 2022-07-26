import React from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const LeftPaperDetail = () => {
    return (
        <div className=''>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                <div className='h-[85vh]'>
                    <Viewer fileUrl="/Gurpreet Singh Resume.pdf" />;
                </div>
            </Worker>

            {/* <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
                <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
            </object> */}
        </div>
    )
}

export default LeftPaperDetail