import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const PRIMARY_COLOR = "#013368";
const FORM_STYLES = {
    padding: "2rem",
    maxWidth: "1800px",
    margin: "2rem auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const StyledButton = styled(Button)({
    backgroundColor: PRIMARY_COLOR,
    color: "#fff",
    "&:hover": {
        backgroundColor: "#011d4c",
    }
});
function CreateInvoicesForm() {

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            numero: '',
            client: '',
            depart: '',
            destination: '',
            distance: '',
            rate: '',
            dateCreation: '',
            dateEcheance: '',
            status: '',
        }
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
        reset();  // Réinitialiser le formulaire après soumission
    };

    return (
        <Paper style={FORM_STYLES}>
            <form onSubmit={handleSubmit(handleFormSubmit)} style={{height:"500px", overflowY:"scroll"}}>
                <h2 style={{ color: PRIMARY_COLOR }}>Créer une Facture</h2>

                <Controller
                    name="numero"
                    control={control}
                    rules={{ required: "Numéro de facture requis" }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Numéro de Facture"
                            margin="normal"
                            {...field}
                            error={!!errors.numero}
                            helperText={errors.numero?.message}
                        />
                    )}
                />

                <Controller
                    name="client"
                    control={control}
                    rules={{ required: "Nom du client requis" }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Nom du Client"
                            margin="normal"
                            {...field}
                            error={!!errors.client}
                            helperText={errors.client?.message}
                        />
                    )}
                />

                <Controller
                    name="depart"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Départ"
                            margin="normal"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="destination"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Destination"
                            margin="normal"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="distance"
                    control={control}
                    rules={{
                        required: "Distance requise",
                        validate: (value) => value > 0 || "Distance invalide"
                    }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Distance (km)"
                            margin="normal"
                            type="number"
                            {...field}
                            error={!!errors.distance}
                            helperText={errors.distance?.message}
                        />
                    )}
                />

                <Controller
                    name="rate"
                    control={control}
                    rules={{
                        required: "Tarif requis",
                        validate: (value) => value > 0 || "Tarif invalide"
                    }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Tarif (€/km)"
                            margin="normal"
                            type="number"
                            {...field}
                            error={!!errors.rate}
                            helperText={errors.rate?.message}
                        />
                    )}
                />

                <Controller
                    name="dateCreation"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Date de Création"
                            type="date"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="dateEcheance"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Date d'Échéance"
                            type="date"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            fullWidth
                            label="Statut de Paiement"
                            margin="normal"
                            {...field}
                        >
                            <MenuItem value="Payée">Payée</MenuItem>
                            <MenuItem value="Non Payée">Non Payée</MenuItem>
                            <MenuItem value="En attente">En attente</MenuItem>
                        </TextField>
                    )}
                />

                <StyledButton type="submit" variant="contained" fullWidth>
                    Enregistrer la Facture
                </StyledButton>
            </form>
        </Paper>
    )
}

export default CreateInvoicesForm