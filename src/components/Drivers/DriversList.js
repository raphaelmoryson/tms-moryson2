
import useFetchReducer from '@/useFetchReducer';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import DailyWorkSheet from '@/pages/orders/worksheet/DailyWorkSheet';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

function DriversList() {
    const [worksheetDate, setworksheetDate] = useState()
    const { data: drivers, loading, error } = useFetchReducer('api/drivers');
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading drivers</div>;
    return (
        <div className={"container"}>
            <div className={"driversFlex"}>
                {drivers?.map((driver) => (
                    <div key={driver.id} className={"driverCard"}>
                        <FaUserCircle className={"icon"} />
                        <div className={"driverInfo"}>
                            <h2 className={"driverName"}>{driver.name}</h2>
                            <p>Date de fiche de travail :</p>
                            <input type='date' onChange={(e) => {
                                setworksheetDate(new Date(e.target.value))
                            }} />
                            <PDFDownloadLink
                                document={<DailyWorkSheet id={driver.id} dateOrders={worksheetDate} />}
                                fileName={`travail_${driver.name}_journalier.pdf`}>
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : <button
                                        className={"workSheetButton"}>
                                        Voir Fiche de Travail
                                    </button>
                                }
                            </PDFDownloadLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DriversList;
