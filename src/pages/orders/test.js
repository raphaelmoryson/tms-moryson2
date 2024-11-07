import React from 'react'
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), { ssr: false });

import DailyWorkSheet from './worksheet/DailyWorkSheet';
import dynamic from 'next/dynamic';
function test() {
    return (
        <PDFViewer width={1080} height={1920}>
            <DailyWorkSheet />
        </PDFViewer>
    )
}

export default test