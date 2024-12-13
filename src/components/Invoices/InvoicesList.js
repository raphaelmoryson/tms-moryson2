import React from 'react';
import {
    Grid, Paper, Typography, Box, Chip, IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, PictureAsPdf } from '@mui/icons-material';

const PRIMARY_COLOR = "#013368";

const invoices = [
    { numero: "INV-2024-001", client: "Transport SARL", depart: "Paris", destination: "Lyon", totalHT: 250, totalTVA: 50, totalTTC: 300, dateCreation: "2024-12-01", dateEcheance: "2024-12-31", status: "En attente" },
    { numero: "INV-2024-002", client: "LogiTrans", depart: "Marseille", destination: "Nice", totalHT: 350, totalTVA: 70, totalTTC: 420, dateCreation: "2024-12-05", dateEcheance: "2024-12-25", status: "Payée" },
    { numero: "INV-2024-003", client: "FastCargo", depart: "Bordeaux", destination: "Toulouse", totalHT: 150, totalTVA: 30, totalTTC: 180, dateCreation: "2024-12-02", dateEcheance: "2024-12-22", status: "Non Payée" },
];

const InvoiceContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}));

const StatusChip = styled(Chip)(({ status }) => ({
    backgroundColor: status === "Payée" ? "#4caf50" :
        status === "Non Payée" ? "#f44336" : "#ffa726",
    color: "#fff",
    fontWeight: "bold",
}));

export default function InvoicesList() {
    return (
        <Box sx={{ p: 2, height: "calc(600px - 64px)", overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ width: "100%", overflowX: "auto" }}>
                {invoices.map((invoice) => (
                    <InvoiceContainer key={invoice.numero}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={2}>
                                <Typography variant="h6"><b>#{invoice.numero}</b></Typography>
                                <Typography variant="subtitle2">Client: {invoice.client}</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography><b>Départ:</b> {invoice.depart}</Typography>
                                <Typography><b>Destination:</b> {invoice.destination}</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography><b>Total HT:</b> {invoice.totalHT} €</Typography>
                                <Typography><b>Total TTC:</b> {invoice.totalTTC} €</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography><b>Date Création:</b> {invoice.dateCreation}</Typography>
                                <Typography><b>Échéance:</b> {invoice.dateEcheance}</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <StatusChip
                                    label={invoice.status}
                                    status={invoice.status}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={2} textAlign="right">
                                <IconButton color="primary" title="Voir Détails">
                                    <Visibility />
                                </IconButton>
                                <IconButton color="secondary" title="Télécharger PDF">
                                    <PictureAsPdf />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </InvoiceContainer>
                ))}
            </div>
        </Box>
    );
}
