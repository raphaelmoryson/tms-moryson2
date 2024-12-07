import useFetchReducer from '@/useFetchReducer';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MenuItem, TextField, Button, Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import WorkSheetDocument from '@/pages/orders/worksheet/worksheetPDF';

const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

const PRIMARY_COLOR = "#013368";

const TableContainer = styled(Paper)({
    padding: '2rem',
    marginTop: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
});

const TableHeader = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    background: PRIMARY_COLOR,
    color: '#fff',
    padding: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
});

const TableRow = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    padding: '1rem',
    borderBottom: '1px solid #ddd',
    alignItems: 'center',
});

const FilterContainer = styled('div')({
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
});

function OrdersList() {
    const { data: orders, loading, error } = useFetchReducer('api/orders');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        if (orders) {
            const uniqueDrivers = [...new Set(orders.map(order => order.driver.name))];
            setDrivers(uniqueDrivers);
            setFilteredOrders(orders);
        }
    }, [orders]);

    useEffect(() => {
        const filtered = orders.filter(order => {
            const matchesDriver = selectedDriver ? order.driver.name === selectedDriver : true;
            const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
            return matchesDriver && matchesStatus;
        });
        setFilteredOrders(filtered);
    }, [selectedDriver, selectedStatus, orders]);

    if (loading) return <Typography>Chargement des commandes...</Typography>;
    if (error) return <Typography color="error">Erreur lors du chargement des commandes.</Typography>;

    return (
        <Paper style={{ padding: '2rem', marginTop: '2rem', borderRadius: '8px' }}>

            <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        select
                        label="Filtrer par Chauffeur"
                        value={selectedDriver}
                        onChange={e => setSelectedDriver(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">Tous les chauffeurs</MenuItem>
                        {drivers.map((driver, index) => (
                            <MenuItem key={index} value={driver}>{driver}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        select
                        label="Filtrer par Statut"
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="">Tous les statuts</MenuItem>
                        <MenuItem value="IN_PROGRESS">En cours</MenuItem>
                        <MenuItem value="DELIVERED">Livré</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            {/* Table header */}
            <TableHeader>
                <div>Détails</div>
                <div>Adresse</div>
                <div>Quantité</div>
                <div>Poids (kg)</div>
                <div>Date de Livraison</div>
                <div>Chauffeur</div>
                <div>Statut</div>
                <div>Action</div>
            </TableHeader>

            {/* Orders List */}
            {filteredOrders.map(order => (
                <TableRow key={order.id}>
                    <div>{order.details}</div>
                    <div>
                        <b>{order.pickupAddress}</b> à <b>{order.deliveryAddress}</b>
                    </div>
                    <div>{order.quantity} Palettes</div>
                    <div>{order.weight}kg</div>
                    <div style={{ color: order.status === 'IN_PROGRESS' ? PRIMARY_COLOR : '#000' }}>
                        {new Date(order.deliveryDate).toLocaleDateString()}
                    </div>
                    <div>{order.driver.name}</div>
                    <div
                        style={{
                            color: order.status === 'DELIVERED' ? 'green' : PRIMARY_COLOR,
                            fontWeight: 'bold',
                        }}
                    >
                        {order.status === "IN_PROGRESS" ? "En cours" : "Livré"}
                    </div>
                    <div>
                        <Link href={`/orders/${order.id}`}>
                            <Button variant="outlined" color="primary" size="small">
                                Voir
                            </Button>
                        </Link>
                        <PDFDownloadLink
                            document={<WorkSheetDocument orderDetails={order} />}
                            fileName={`fiche_de_travail_${order.id}.pdf`}
                        >
                            {({ loading }) =>
                                loading ? 'Génération...' : (
                                    <Button variant="contained" color="secondary" size="small">
                                        Télécharger
                                    </Button>
                                )
                            }
                        </PDFDownloadLink>
                    </div>
                </TableRow>
            ))}
        </Paper>
    );
}

export default OrdersList;
