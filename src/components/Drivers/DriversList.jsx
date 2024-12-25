import React, { useState } from 'react';
import useFetchReducer from '@/useFetchReducer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DailyWorkSheet from '@/pages/orders/worksheet/DailyWorkSheet';
import {
    Box,
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

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
        <Box >

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Conducteur</TableCell>
                            <TableCell>Date de fiche de travail</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Télécharger</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drivers?.map((driver) => (
                            <TableRow key={driver.id}>
                                <TableCell>
                                    <Typography variant="subtitle1">{driver.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="date"
                                        value={worksheetDate}
                                        onChange={handleDateChange}
                                        fullWidth
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={handleDateConfirm}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        Définir la date
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {confirmedDate && (
                                        <PDFDownloadLink
                                            document={<DailyWorkSheet id={driver.id} dateOrders={confirmedDate} />}
                                            fileName={`travail_${driver.name}_${confirmedDate}.pdf`}
                                        >
                                            {({ loading }) =>
                                                loading ? (
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        disabled
                                                    >
                                                        Chargement...
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        size="small"
                                                    >
                                                        Télécharger
                                                    </Button>
                                                )
                                            }
                                        </PDFDownloadLink>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default DriversList;
