import useFetchReducer from '@/useFetchReducer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    MenuItem, TextField, Button, Paper, Typography, Grid, Box, CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import WorkSheetDocument from '@/pages/orders/worksheet/worksheetPDF';

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false }
);

const PRIMARY_COLOR = "#013368";

const TableContainer = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    height: "600px",
    overflowY: "auto",
}));

const TableRow = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr 1fr',
    padding: theme.spacing(0.5),
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: 'center',
    textAlign: 'center',
}));

function OrdersList() {
    const { data: orders, loading, error } = useFetchReducer('api/orders');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        if (orders) {
            const uniqueDrivers = [...new Set(orders.map((order) => order.driver.name))];
            setDrivers(uniqueDrivers);
            setFilteredOrders(orders);
        }
    }, [orders]);

    useEffect(() => {
        const filtered = orders.filter((order) => {
            const matchesDriver = selectedDriver ? order.driver.name === selectedDriver : true;
            const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
            return matchesDriver && matchesStatus;
        });
        setFilteredOrders(filtered);
    }, [selectedDriver, selectedStatus, orders]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Erreur de chargement des commandes.</Typography>;

    return (
        <TableContainer>
            <Grid container spacing={1} mb={1}>
                <Grid item xs={6} md={4}>
                    <TextField
                        select
                        label="Filtrer par Chauffeur"
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        fullWidth
                        size="small"
                    >
                        <MenuItem value="">Tous les chauffeurs</MenuItem>
                        {drivers.map((driver, index) => (
                            <MenuItem key={index} value={driver}>{driver}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={6} md={4}>
                    <TextField
                        select
                        label="Filtrer par Statut"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        fullWidth
                        size="small"
                    >
                        <MenuItem value="">Tous les statuts</MenuItem>
                        <MenuItem value="IN_PROGRESS">En cours</MenuItem>
                        <MenuItem value="DELIVERED">Livré</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            <TableRow style={{ background: PRIMARY_COLOR, color: '#fff', fontWeight: 'bold' }} className='tableCollumn'>
                <div>Détails</div>
                <div>Adresses</div>
                <div>Quantité</div>
                <div>Date</div>
                <div>Chauffeur</div>
                <div>Statut</div>
                <div>Actions</div>
            </TableRow>

            {filteredOrders.map((order) => (
                <TableRow key={order.id} className='tableCollumn'>
                    <div>{order.details}</div>
                    <div>
                        <Typography variant="body2"><b>Ramasse:</b> {order.pickupAddress}</Typography>
                        <Typography variant="body2"><b>Livraison:</b> {order.deliveryAddress}</Typography>
                    </div>
                    <div>{order.quantity} Palettes / {order.weight} kg</div>
                    <div style={{ color: PRIMARY_COLOR }}>
                        {new Date(order.deliveryDate).toLocaleDateString()}
                    </div>
                    <div>{order.driver.name}</div>
                    <div style={{
                        color: order.status === 'DELIVERED' ? 'green' : PRIMARY_COLOR,
                        fontWeight: 'bold',
                    }}>
                        {order.status === "IN_PROGRESS" ? "En cours" : "Livré"}
                    </div>
                    <div>
                        <Link href={`/orders/${order.id}`} passHref>
                            <Button variant="outlined" color="primary" size="small" style={{marginRight:"5px"}}>
                                Voir
                            </Button>
                        </Link>
                        <PDFDownloadLink
                            document={<WorkSheetDocument orderDetails={order} />}
                            fileName={`fiche_de_travail_${order.id}.pdf`}
                        >
                            {({ loading }) =>
                                loading ? (
                                    'Génération...'
                                ) : (
                                    <Button variant="contained" color="secondary" size="small">
                                        Télécharger
                                    </Button>
                                )
                            }
                        </PDFDownloadLink>
                    </div>
                </TableRow>
            ))}
        </TableContainer>
    );
}

export default OrdersList;
