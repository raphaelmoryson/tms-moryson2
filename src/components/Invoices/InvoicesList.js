import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import { useMediaQuery, Box, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const TAX_RATE = 0.2;
const PRIMARY_COLOR = "#013368";
const TEXT_COLOR_LIGHT = "#fff";
const TOT_HT = 250.00
function ccyFormat(num) {
    return parseFloat(num.toFixed(2));
}

function createRow(numero, client, depart, destination,  dateCreation, dateEcheance, status) {
    const totalHT = TOT_HT;
    const totalTVA = totalHT * TAX_RATE;
    const totalTTC = totalHT + totalTVA;
    return { numero, client, depart, destination, dateCreation, dateEcheance, status, totalHT, totalTVA, totalTTC };
}

const rows = [
    createRow("INV-2024-001", "Transport SARL", "Paris", "Lyon", "2024-12-01", "2024-12-31", "En attente"),
    createRow("INV-2024-002", "LogiTrans", "Marseille", "Nice", "2024-12-05", "2024-12-25", "Payée"),
    createRow("INV-2024-003", "FastCargo", "Bordeaux", "Toulouse", "2024-12-02", "2024-12-22", "Non Payée"),
];

const StyledTableContainer = styled(TableContainer)({
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
    overflowX: "auto",
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: PRIMARY_COLOR,
    "& .MuiTableCell-root": {
        color: TEXT_COLOR_LIGHT,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});

const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(odd)": {
        backgroundColor: "#f4f6f8",
    },
});

// Responsive pour mobile
const Row = ({ row }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.numero}
                </TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.depart}</TableCell>
                <TableCell>{row.destination}</TableCell>
                    <>
                        <TableCell align="right">{ccyFormat(row.totalHT)}</TableCell>
                        <TableCell align="right">{ccyFormat(row.totalTVA)}</TableCell>
                        <TableCell align="right" style={{ color: PRIMARY_COLOR, fontWeight: "bold" }}>
                            {ccyFormat(row.totalTTC)}
                        </TableCell>
                    </>
                <TableCell>{row.dateCreation}</TableCell>
                <TableCell>{row.dateEcheance}</TableCell>
                <TableCell style={{
                    color:
                        row.status === "Payée" ? "green" :
                            row.status === "Non Payée" ? "red" : "orange"
                }}>
                    <b>{row.status}</b>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Détails supplémentaires
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Numéro</TableCell>
                                        <TableCell>{row.numero}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Client</TableCell>
                                        <TableCell>{row.client}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Date de création</TableCell>
                                        <TableCell>{row.dateCreation}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Date d'échéance</TableCell>
                                        <TableCell>{row.dateEcheance}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Statut</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default function InvoicesList() {

    return (
        <StyledTableContainer component={Paper}>
            <Table aria-label="invoice table">
                <StyledTableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Numéro</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Départ</TableCell>
                        <TableCell>Destination</TableCell>
                            <>
                                <TableCell align="right">Prix HT (€)</TableCell>
                                <TableCell align="right">TVA (€)</TableCell>
                                <TableCell align="right">Total TTC (€)</TableCell>
                            </>
                        <TableCell>Date Création</TableCell>
                        <TableCell>Date Échéance</TableCell>
                        <TableCell>Statut</TableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
