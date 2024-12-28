import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography,
} from '@mui/material';
import { Visibility, PictureAsPdf } from '@mui/icons-material';
import { styled } from '@mui/system';
import Link from 'next/link';
import useFetchReducer from '@/useFetchReducer';
import Link from 'next/link';

const PRIMARY_COLOR = "#013368";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
}));

const StatusChip = styled(Chip)(({ status }) => ({
    backgroundColor: status === "paid" ? "#4caf50" :
        status === "unPaid" ? "#f44336" : "#ffa726",
    color: "#fff",
    fontWeight: "bold",
}));

export default function InvoicesList() {
    const { data: invoices, loading, error } = useFetchReducer('api/invoices');

    if (loading) return <Typography>Chargement des factures...</Typography>;
    if (error) return <Typography>Erreur lors du chargement des factures.</Typography>;

    return (
        <Box sx={{ p: 2, height: "calc(600px - 64px)", overflowY: "auto", overflowX: "hidden" }}>
            <div style={{ width: "100%", overflowX: "auto" }}>
                {invoices.map((invoice) => (
                    <InvoiceContainer key={invoice.numero}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={2}>
                                <Typography variant="h6"><b>{invoice.invoiceNumber}</b></Typography>
                                <Typography variant="subtitle2">Client: {invoice.customerName}</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>

                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography><b>Total HT:</b> {invoice.TotalHT} €</Typography>
                                <Typography><b>Total TTC:</b> {invoice.TotalTTC} €</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography><b>Date Création:</b> {new Date(invoice.issuanceDate).toLocaleDateString()}</Typography>
                                <Typography><b>Échéance:</b> {new Date(invoice.dueDate).toLocaleDateString()}</Typography>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <StatusChip
                                    label={invoice.paymentStatus == "Pending" ? "En attente" : undefined || invoice.paymentStatus == "Paid" ? "En attente" : undefined || invoice.paymentStatus == "unPaid" ? "En attente" : undefined}
                                    status={invoice.paymentStatus == "Pending" ? "En attente" : undefined || invoice.paymentStatus == "Paid" ? "En attente" : undefined || invoice.paymentStatus == "unPaid" ? "En attente" : undefined}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={2} textAlign="right">
                                <Link href={`invoices/${invoice.id}`}>
                                    <IconButton color="primary" title="Voir Détails">
                                        <Visibility />
                                    </IconButton>
                                </Link>
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
