import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, CircularProgress } from '@mui/material';

function CreateCustomerForm() {
    const [siren, setSiren] = useState('');
    const [infoSiren, setInfoSiren] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        address: '',
        postalCode: '',
        city: '',
        country: 'France',
        email: '',
        phone: '',
        siren: '',
        siret: '',
        apeCode: '',
    });

    const [loading, setLoading] = useState(false);

    // Fetch company information based on SIREN
    const getSiren = async () => {
        setLoading(true);
        try {
            let response = await fetch(`/api/proxy?siren=${siren}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();
            setInfoSiren(data);

            // Populate form data with the fetched data
            setFormData({
                ...formData,
                name: data.unite_legale.denomination,
                company: data.unite_legale.denomination,
                siren: data.unite_legale.siren,
                siret: data.unite_legale.etablissement_siege.siret,
                address: `${data.unite_legale.etablissement_siege.numero_voie} ${data.unite_legale.etablissement_siege.type_voie} ${data.unite_legale.etablissement_siege.libelle_voie}`,
                city: data.unite_legale.etablissement_siege.libelle_commune,
                postalCode: data.unite_legale.etablissement_siege.code_postal,
                country: 'France',
            });

            const etatAdministratif = data.unite_legale.etat_administratif;
            console.log(etatAdministratif);
            if (etatAdministratif === 'A') {
                console.log("L'entreprise est active.");
            } else if (etatAdministratif === 'C') {
                console.log("L'entreprise est fermée.");
            } else if (etatAdministratif === 'F') {
                console.log("L'entreprise est fermée administrativement.");
            } else if (etatAdministratif === 'V') {
                console.log("L'entreprise a été radiée.");
            }
        } catch (error) {
            console.error("Error fetching SIREN data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    // Reset the form after successful submission
                    setFormData({
                        name: '', company: '', address: '', postalCode: '', city: '', country: '',
                        email: '', phone: '', siren: '', siret: '', apeCode: ''
                    });
                } else {
                    throw new Error('Failed to create customer');
                }
            })
            .catch((error) => console.error('Error creating customer:', error));
    };

    return (
        <Box sx={{ padding: 3, height: '500px', overflowY: 'scroll' }}>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>Insérer le siren (les informations seront directement insérées)</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="SIREN"
                            variant="outlined"
                            value={siren}
                            onChange={(e) => setSiren(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={getSiren}
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Insérer les infos'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Main customer data form */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Company"
                            name="company"
                            variant="outlined"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            variant="outlined"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Postal Code"
                            name="postalCode"
                            variant="outlined"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            variant="outlined"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            variant="outlined"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="SIREN Number"
                            name="siren"
                            variant="outlined"
                            value={formData.siren}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="SIRET Number"
                            name="siret"
                            variant="outlined"
                            value={formData.siret}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="APE Code"
                            name="apeCode"
                            variant="outlined"
                            value={formData.apeCode}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Create Customer
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default CreateCustomerForm;
