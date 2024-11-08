
import useFetchReducer from '@/useFetchReducer';
import React from 'react';
import { useRouter } from 'next/router';
import { FaUserCircle } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import DailyWorkSheet from '@/pages/orders/worksheet/DailyWorkSheet';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

function DriversList() {
    const { data: drivers, loading, error } = useFetchReducer('api/drivers');
    const router = useRouter();



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading drivers</div>;

    return (
        <div className={"container"}>
            <div className={"driversGrid"}>
                {drivers.map((driver) => (
                    <div key={driver.driverId} className={"driverCard"}>
                        <FaUserCircle className={"icon"} />
                        <div className={"driverInfo"}>
                            <h2 className={"driverName"}>{driver.name}</h2>

                            <PDFDownloadLink
                                document={<DailyWorkSheet id={driver.id} />}
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
