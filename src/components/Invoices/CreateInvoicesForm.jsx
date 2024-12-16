import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
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
            services: [{ date: '', enlèvement: '', livraison: '', référence: '', prixHT: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "services"
    });

    const handleFormSubmit = (data) => {
        console.log("Form Submitted:", data);
        console.log(data)
        reset();
    };

    return (
        <Paper style={FORM_STYLES}>
            <form onSubmit={handleSubmit(handleFormSubmit)} style={{ height: "700px", overflowY: "scroll" }}>
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

                <h3 style={{ color: PRIMARY_COLOR }}>Services</h3>
                {fields.map((item, index) => (
                    <div key={item.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
                        <Controller
                            name={`services[${index}].date`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Date"
                                    type="date"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name={`services[${index}].enlèvement`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Enlèvement"
                                    margin="normal"
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name={`services[${index}].livraison`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Livraison"
                                    margin="normal"
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name={`services[${index}].référence`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Référence"
                                    margin="normal"
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name={`services[${index}].prixHT`}
                            control={control}
                            rules={{
                                validate: (value) => value > 0 || "Prix invalide"
                            }}
                            render={({ field }) => (
                                <TextField
                                    label="Prix HT (€)"
                                    type="number"
                                    margin="normal"
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => remove(index)}
                            style={{ marginTop: "0.5rem" }}
                        >
                            Supprimer
                        </Button>
                    </div>
                ))}

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => append({ date: '', enlèvement: '', livraison: '', référence: '', prixHT: '' })}
                    style={{ marginBottom: "1rem" }}
                >
                    Ajouter un Service
                </Button>

                <StyledButton type="submit" variant="contained" fullWidth>
                    Enregistrer la Facture
                </StyledButton>
            </form>
        </Paper>
    )
}

export default CreateInvoicesForm;
