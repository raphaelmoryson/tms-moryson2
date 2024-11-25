import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import proj4 from 'proj4';

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

    const getSiren = async () => {
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
            console.log(data.unite_legale)
            const etatAdministratif = data.unite_legale.etat_administratif;
            console.log(etatAdministratif)
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
        <div className="form-container" style={{ height: '750px', overflowY: 'scroll' }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sirenGet">Insérer le siren (les info seront directement insérées)</label>
                    <input
                        type="text"
                        id="sirenGet"
                        name="sirenGet"
                        value={siren}
                        onChange={(e) => setSiren(e.target.value)}
                    />
                    <button type="button" onClick={getSiren}>Insérer les info</button>
                </div>
            </form>

            {/* Form to create new customer */}
            <h2>Create New Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="siren">SIREN Number</label>
                    <input
                        type="text"
                        id="siren"
                        name="siren"
                        value={formData.siren}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="siret">SIRET Number</label>
                    <input
                        type="text"
                        id="siret"
                        name="siret"
                        value={formData.siret}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="apeCode">APE Code</label>
                    <input
                        type="text"
                        id="apeCode"
                        name="apeCode"
                        value={formData.apeCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Create Customer</button>
            </form>
        </div>
    );
}

export default CreateCustomerForm;
