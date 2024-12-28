import React from 'react';
import {
    useForm, Controller, useFieldArray
} from 'react-hook-form';
import {
    TextField, Button, MenuItem, Paper, Typography
} from '@mui/material';
import { styled } from '@mui/system';

const PRIMARY_COLOR = "#013368";

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: "100%",
    height: "600px",
    overflowY: "auto",
    overflowX: "hidden",
}));

const StyledButton = styled(Button)({
    backgroundColor: PRIMARY_COLOR,
    color: "#fff",
    "&:hover": {
        backgroundColor: "#011d4c",
    },
});

function CreateInvoicesForm() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            invoiceNumber: '',
            issuanceDate: '',
            dueDate: '',
            customerName: '',
            TotalHT: 0,
            TotalTVA: 0,
            TotalTTC: 0,
            customerAddress: '',
            customerCity: '',
            customerZipCode: '',
            paymentStatus: 'Pending',
            createdBy: '',
            services: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "services",
    });

    const handleFormSubmit = async (data) => {
        try {
            let priceList = data.services.map((s) => s.prixHT);
            let TotalHT = priceList.reduce((acc, val) => parseFloat(acc) + parseFloat(val), 0);
            let TotalTVA = (TotalHT * 20) / 100;
            let TotalTTC = TotalHT + TotalTVA;

            const response = await fetch('/api/invoices/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    TotalHT,
                    TotalTVA,
                    TotalTTC,
                }),
            });

            if (response.ok) {
                alert("Facture créée avec succès !");
                reset();
            } else {
                const result = await response.json();
                alert("Erreur: " + result.error);
            }
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
            alert("Une erreur est survenue");
        }
    };

    return (
        <FormContainer>
            <Typography variant="h5" gutterBottom>
                Créer une Facture
            </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {[
                    { name: "invoiceNumber", label: "Numéro de Facture" },
                    { name: "customerName", label: "Nom du Client" },
                    { name: "customerAddress", label: "Adresse du Client" },
                    { name: "customerCity", label: "Ville du Client" },
                    { name: "customerZipCode", label: "Code Postal" },
                    { name: "createdBy", label: "Créé Par" },
                ].map(({ name, label }) => (
                    <Controller
                        key={name}
                        name={name}
                        control={control}
                        rules={{ required: `${label} requis` }}
                        render={({ field }) => (
                            <TextField
                                fullWidth
                                label={label}
                                margin="normal"
                                {...field}
                                error={!!errors[name]}
                                helperText={errors[name]?.message}
                            />
                        )}
                    />
                ))}

                <Controller
                    name="issuanceDate"
                    control={control}
                    rules={{ required: "Date d'émission requise" }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Date d'Émission"
                            type="date"
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            error={!!errors.issuanceDate}
                            helperText={errors.issuanceDate?.message}
                        />
                    )}
                />

                <Controller
                    name="dueDate"
                    control={control}
                    rules={{ required: "Date d'échéance requise" }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Date d'Échéance"
                            type="date"
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            error={!!errors.dueDate}
                            helperText={errors.dueDate?.message}
                        />
                    )}
                />

                <Controller
                    name="paymentStatus"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            fullWidth
                            label="Statut de Paiement"
                            margin="normal"
                            {...field}
                        >
                            <MenuItem value="Paid">Payée</MenuItem>
                            <MenuItem value="Unpaid">Non Payée</MenuItem>
                            <MenuItem value="Pending">En attente</MenuItem>
                        </TextField>
                    )}
                />

                <Typography variant="h6" sx={{ mt: 2, color: PRIMARY_COLOR }}>
                    Services
                </Typography>
                {fields.map((item, index) => (
                    <div
                        key={item.id}
                        style={{
                            marginBottom: "1rem",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "1rem",
                        }}
                    >
                        {[
                            { name: "date", label: "Date", type: "date" },
                            { name: "enlevement", label: "Enlèvement" },
                            { name: "livraison", label: "Livraison" },
                            { name: "reference", label: "Référence" },
                            { name: "prixHT", label: "Prix HT (€)", type: "number" },
                        ].map(({ name, label, type }) => (
                            <Controller
                                key={name}
                                name={`services[${index}].${name}`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label={label}
                                        type={type || "text"}
                                        margin="normal"
                                        fullWidth
                                        {...field}
                                    />
                                )}
                            />
                        ))}
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => remove(index)}
                            sx={{ mt: 1 }}
                        >
                            Supprimer
                        </Button>
                    </div>
                ))}

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => append({ date: '', enlevement: '', livraison: '', reference: '', prixHT: '' })}
                    sx={{ mt: 2 }}
                >
                    Ajouter un Service
                </Button>

                <StyledButton type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                    Enregistrer la Facture
                </StyledButton>
            </form>
        </FormContainer>
    );
}

export default CreateInvoicesForm;
