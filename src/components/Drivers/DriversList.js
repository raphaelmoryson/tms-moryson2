import useFetchReducer from '@/useFetchReducer';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import DailyWorkSheet from '@/pages/orders/worksheet/DailyWorkSheet';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { useDemoData } from '@mui/x-data-grid-generator';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

function DriversList() {

    const [worksheetDate, setWorksheetDate] = useState(new Date().toISOString().split('T')[0]);
    const [confirmedDate, setConfirmedDate] = useState(null);
    const { data: drivers, loading, error } = useFetchReducer('api/drivers');

    const handleDateChange = (e) => {
        setWorksheetDate(e.target.value);
        setConfirmedDate(null);
    };

    const handleDateConfirm = () => {
        setConfirmedDate(worksheetDate);
    };

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
                            <input
                                type="date"
                                value={worksheetDate}
                                onChange={handleDateChange}
                            />
                            <button
                                onClick={handleDateConfirm}
                                className={"workSheetButton"}
                            >
                                Définir la date
                            </button>
        

                            {confirmedDate && (
                                <PDFDownloadLink
                                    document={<DailyWorkSheet id={driver.id} dateOrders={confirmedDate} />}
                                    fileName={`travail_${driver.name}_${confirmedDate}.pdf`}
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Chargement...' : (
                                            <button className={"workSheetButton"} style={{ margin: "5px 0" }}>
                                                Télécharger Fiche de Travail
                                            </button>
                                        )
                                    }
                                </PDFDownloadLink>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DriversList;
