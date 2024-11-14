import useFetchReducer from '@/useFetchReducer';
import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrashAlt, FaUserCircle } from 'react-icons/fa';

function CustomersList() {
  // const { data: customers, loading, error } = useFetchReducer('api/customers');
  // const [searchTerm, setSearchTerm] = useState('');

  // const filteredCustomers = customers?.filter(customer =>
  //   customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  let test = false
  return test && (
    <div className="customers-container">
      <h2 className="title">Customers List</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error loading customers</div>
      ) : filteredCustomers?.length > 0 ? (
        <table className="customers-table">
          <thead>
            <tr>
              <th><FaUserCircle className="icon" /> Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.company}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td className="actions">
                  <button className="edit-btn"><FaEdit /></button>
                  <button className="delete-btn"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-results">No customers found</div>
      )}
    </div>
  );
}

export default CustomersList;
