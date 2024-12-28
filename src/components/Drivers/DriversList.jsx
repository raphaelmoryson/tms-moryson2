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
        <Box className="container" sx={4}>
            <Grid container spacing={4}>
                {drivers?.map((driver) => (
                    <Grid item xs={12} sm={6} md={4} key={driver.id}>
                        <Box
                            sx={{
                                border: '1px solid #ddd',
                                borderRadius: 2,
                                padding: 2,
                                boxShadow: 3,
                                textAlign: 'center',
                                backgroundColor: '#fff',
                            }}
                        >
                            <FaUserCircle style={{ fontSize: '3rem', color: '#3f51b5' }} />
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                {driver.name}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Date de fiche de travail :
                            </Typography>
                            <TextField
                                type="date"
                                value={worksheetDate}
                                onChange={handleDateChange}
                                fullWidth
                                variant="outlined"
                                size="small"
                                sx={{ mb: 2 }}
                            />
                            <Button
                                onClick={handleDateConfirm}
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Définir la date
                            </Button>

                            {confirmedDate && (
                                <PDFDownloadLink
                                    document={<DailyWorkSheet id={driver.id} dateOrders={confirmedDate} />}
                                    fileName={`travail_${driver.name}_${confirmedDate}.pdf`}
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? (
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                                disabled
                                            >
                                                Chargement...
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                            >
                                                Télécharger Fiche de Travail
                                            </Button>
                                        )
                                    }
                                </PDFDownloadLink>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default DriversList;
