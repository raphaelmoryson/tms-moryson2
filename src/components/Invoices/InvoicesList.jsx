import React from 'react';
import {
    Grid, Paper, Typography, Box, Chip, IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, PictureAsPdf } from '@mui/icons-material';
import useFetchReducer from '@/useFetchReducer';

const PRIMARY_COLOR = "#013368";




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
    const { data: invoices, loading, error } = useFetchReducer('api/invoices');
    console.log(invoices)
    return (
        <Box sx={{ p: 2, height: "calc(600px - 64px)", overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ width: "100%", overflowX: "auto" }}>
                {invoices.map((invoice) => (
                    <InvoiceContainer key={invoice.numero}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={2}>
                                <Typography variant="h6"><b>#{invoice.invoiceNumber}</b></Typography>
                                <Typography variant="subtitle2">Client: {invoice.customerName}</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                
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
