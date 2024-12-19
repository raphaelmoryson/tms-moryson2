import ViewInvoice from '@/components/Invoices/ViewInvoice'
import { PDFViewer } from '@react-pdf/renderer'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TextField, Button, Paper, Grid } from '@mui/material'

function ShowInvoice() {
    const router = useRouter()
    const { id } = router.query

    const [invoice, setInvoice] = useState({
        invoiceNumber: '',
        issuanceDate: '',
        dueDate: '',
        customerName: '',
        customerAddress: '',
        customerCity: '',
        customerZipCode: '',
        paymentStatus: '',
        priceList: [],
        dateList: [],
        pickupList: [],
        deliveryList: [],
        referenceList: []
    })

    const [editedInvoice, setEditedInvoice] = useState({ ...invoice })
    const [reloadPDF, setReloadPDF] = useState(false)

    useEffect(() => {
        if (!id || isNaN(id)) return
        async function getInvoice() {
            const response = await fetch(`/api/invoices/${id}`)
            const data = await response.json()
            setInvoice(data)
            setEditedInvoice(data) 
        }
        getInvoice()
    }, [id, reloadPDF])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedInvoice((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleServiceChange = (listName, index, value) => {
        const updatedList = [...editedInvoice[listName]]
        updatedList[index] = value
        setEditedInvoice((prev) => ({
            ...prev,
            [listName]: updatedList,
        }))
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/invoices/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedInvoice),
            })

            if (response.ok) {
                alert('Facture mise à jour avec succès')
            } else {
                alert('Erreur lors de la mise à jour de la facture')
            }
        } catch (error) {
            console.error('Erreur:', error)
            alert('Une erreur est survenue')
        }
    }

    const handleReloadPDF = () => {
        setInvoice({ ...editedInvoice })
        setReloadPDF(!reloadPDF)
    }

    return id && (
        <Grid container spacing={2} style={{ padding: "2rem" }}>
            <Grid item xs={6}>
                <PDFViewer width="100%" height={800}>
                    <ViewInvoice info={invoice} />
                </PDFViewer>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReloadPDF}
                    style={{ marginTop: "1rem", width: "100%" }}
                >
                    Recharger le PDF
                </Button>
            </Grid>

            <Grid item xs={6}>
                <Paper style={{ padding: "2rem", height: "800px", overflowY: "scroll" }}>
                    <h2>Modifier la Facture</h2>
                    <form>
                        {[
                            { label: 'Numéro de Facture', name: 'invoiceNumber' },
                            { label: 'Nom du Client', name: 'customerName' },
                            { label: 'Adresse', name: 'customerAddress' },
                            { label: 'Ville', name: 'customerCity' },
                            { label: 'Code Postal', name: 'customerZipCode' },
                            { label: 'Statut de Paiement', name: 'paymentStatus' },
                        ].map(({ label, name }) => (
                            <TextField
                                key={name}
                                fullWidth
                                label={label}
                                name={name}
                                value={editedInvoice[name] || ''}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                        ))}

                        <h3>Services</h3>
                        {editedInvoice.priceList.map((_, index) => (
                            <div key={index} style={{ marginBottom: "1rem" }}>
                                {[
                                    { label: 'Date', name: 'dateList', type: 'date' },
                                    { label: 'Enlèvement', name: 'pickupList' },
                                    { label: 'Livraison', name: 'deliveryList' },
                                    { label: 'Référence', name: 'referenceList' },
                                    { label: 'Prix HT (€)', name: 'priceList', type: 'number' }
                                ].map(({ label, name, type }) => (
                                    <TextField
                                        key={name}
                                        label={label}
                                        type={type || 'text'}
                                        margin="normal"
                                        fullWidth
                                        value={editedInvoice[name][index] || ''}
                                        onChange={(e) =>
                                            handleServiceChange(name, index, e.target.value)
                                        }
                                    />
                                ))}
                            </div>
                        ))}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            style={{ marginTop: "1rem" }}
                            fullWidth
                        >
                            Enregistrer les Modifications
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ShowInvoice
