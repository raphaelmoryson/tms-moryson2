import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography,
} from '@mui/material';
import { Visibility, PictureAsPdf } from '@mui/icons-material';
import { styled } from '@mui/system';
import Link from 'next/link';
import useFetchReducer from '@/useFetchReducer';

const PRIMARY_COLOR = "#013368";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
}));

const StatusChip = styled('span')(({ status }) => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '16px',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor:
        status === 'Paid' ? '#4caf50' :
        status === 'Pending' ? '#ffa726' :
        '#f44336',
}));

export default function InvoicesList() {
    const { data: invoices, loading, error } = useFetchReducer('api/invoices');

    if (loading) return <Typography>Chargement des factures...</Typography>;
    if (error) return <Typography>Erreur lors du chargement des factures.</Typography>;

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Numéro de Facture</StyledTableCell>
                        <StyledTableCell>Client</StyledTableCell>
                        <StyledTableCell>Total HT (€)</StyledTableCell>
                        <StyledTableCell>Total TTC (€)</StyledTableCell>
                        <StyledTableCell>Date de Création</StyledTableCell>
                        <StyledTableCell>Échéance</StyledTableCell>
                        <StyledTableCell>Statut</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                            <TableCell>{invoice.customerName}</TableCell>
                            <TableCell>{invoice.TotalHT.toFixed(2)} €</TableCell>
                            <TableCell>{invoice.TotalTTC.toFixed(2)} €</TableCell>
                            <TableCell>{new Date(invoice.issuanceDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <StatusChip status={invoice.paymentStatus}>
                                    {invoice.paymentStatus === 'Paid' && 'Payée'}
                                    {invoice.paymentStatus === 'Pending' && 'En attente'}
                                    {invoice.paymentStatus === 'Unpaid' && 'Non payée'}
                                </StatusChip>
                            </TableCell>
                            <TableCell align="center">
                                <Link href={`invoices/${invoice.id}`}>
                                    <IconButton color="primary" title="Voir Détails">
                                        <Visibility />
                                    </IconButton>
                                </Link>
                                <IconButton color="secondary" title="Télécharger PDF">
                                    <PictureAsPdf />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
