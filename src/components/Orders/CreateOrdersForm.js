import React, { useState } from 'react';
import { FaBox, FaUser } from 'react-icons/fa';
import { LiaPalletSolid } from "react-icons/lia";
import { TbBarrel } from "react-icons/tb";

function CreateOrdersForm({ driversList }) {
  const [selectedMerchandise, setSelectedMerchandise] = useState(null);
  const [selectDriver, setSelectedDriver] = useState(null);
  const [orderType, setOrderType] = useState('livraison');
  const [formData, setFormData] = useState({
    company: '',
    quantity: '',
    weight: '',
    departureAddress: '',
    dimensions: '',
    destinationAddress: '',
    specialInstructions: '',
    deliveryDate: ''
  });

  const handleMerchandiseSelect = (type) => {
    setSelectedMerchandise(type);
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
  };

  const handleOrderTypeChange = (event) => {
    setOrderType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const orderDetails = {
      details: `Commande de ${formData.company} pour ${formData.quantity} ${selectedMerchandise}`,
      pickupAddress: formData.departureAddress,
      deliveryAddress: formData.destinationAddress,
      status: 'IN_PROGRESS',
      deliveryDate: new Date(formData.deliveryDate),
      weight: formData.weight,
      quantity: formData.quantity,
      dimensions: formData.dimensions,
      driverId: selectDriver ? selectDriver : null,
    };

    const response = await fetch('/api/orders/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newOrder = await response.json();
    console.log('Détails de la commande :', newOrder);
    return newOrder;
  };

  return (
    <div className="create-orders-form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Détails de la commande</legend>

          <div className="form-group">
            <label htmlFor="company">Nom de l'entreprise</label>
            <input
              type="text"
              id="company"
              placeholder="Entrez l'entreprise"
              required
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Type de commande</label>
            <select value={orderType} onChange={handleOrderTypeChange} required>
              <option value="livraison">Livraison</option>
              <option value="chargement">Chargement</option>
            </select>
          </div>

          <div className="form-group">
            <label>Type de marchandise</label>
            <div className="selection">
              <div
                className={`selection-box ${selectedMerchandise === 'palette' ? 'active' : ''}`}
                onClick={() => handleMerchandiseSelect('palette')}
              >
                <div className="icon"><LiaPalletSolid /></div>
                <div className="label">Palette</div>
              </div>

              <div
                className={`selection-box ${selectedMerchandise === 'colis' ? 'active' : ''}`}
                onClick={() => handleMerchandiseSelect('colis')}
              >
                <div className="icon"><FaBox /></div>
                <div className="label">Colis</div>
              </div>

              <div
                className={`selection-box ${selectedMerchandise === 'vraq' ? 'active' : ''}`}
                onClick={() => handleMerchandiseSelect('vraq')}
              >
                <div className="icon"><TbBarrel /></div>
                <div className="label">Vraq</div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantité</label>
            <input
              type="number"
              id="quantity"
              placeholder="Entrez la quantité"
              required
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Poids</label>
            <input
              type="number"
              id="weight"
              placeholder="Entrez le poids"
              required
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="departureAddress">Adresse de départ</label>
            <input
              type="text"
              id="departureAddress"
              placeholder="Entrez l'adresse de départ"
              required
              value={formData.departureAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dimensions">Dimensions</label>
            <input
              type="text"
              id="dimensions"
              placeholder="Dimensions"
              required
              value={formData.dimensions}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="destinationAddress">Adresse de destination</label>
            <input
              type="text"
              id="destinationAddress"
              placeholder="Entrez l'adresse de destination"
              required
              value={formData.destinationAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialInstructions">Instructions spéciales</label>
            <textarea
              id="specialInstructions"
              placeholder="Entrez des instructions spéciales"
              rows="4"
              value={formData.specialInstructions}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="deliveryDate">Date et heure précise de {orderType}</label>
            <input
              type="datetime-local"
              id="deliveryDate"
              required
              value={formData.deliveryDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Sélection du chauffeur</label>
            <div className="selection">
              {driversList.map((driver, index) => (
                <div
                  key={index}
                  className={`selection-box ${selectDriver === driver.id ? 'active' : ''}`}
                  onClick={() => handleDriverSelect(driver.id)}
                >
                  <div className="icon"><FaUser /></div>
                  <div className="label">{driver.name}</div>
                  <div className="role">{driver.role}</div>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">Créer la commande</button>
      </form>
    </div>
  );
}

export default CreateOrdersForm;
