// QuotationForm.jsx
import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { v4 as uuidv4 } from "uuid";
import "./invoice.css";

export default function Invoice() {
  const [client, setClient] = useState({ name: "", contact: "", email: "", address: "" });
  const [quotation, setQuotation] = useState({
    id: uuidv4(),
    date: new Date().toISOString().split("T")[0],
    validTill: "",
    executive: "",
  });

  const [items, setItems] = useState([
    { id: uuidv4(), name: "", location: "", type: "", size: "", rate: 0, price: 0 }
  ]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");

  const formRef = useRef();

  const handleGeneratePDF = () => {
    const element = formRef.current;

    // Temporarily remove scroll style
    element.classList.remove("scrollable-container");

    const options = {
      margin: 0.5,
      filename: `Invoice.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save().then(() => {
      // Restore scroll styling after PDF is saved
      element.classList.add("scrollable-container");
    });
  };


  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value, price: field === 'rate' || field === 'size' ? item.rate * item.size : item.price } : item));
  };

  const handleAddItem = () => {
    setItems([...items, { id: uuidv4(), name: "", location: "", type: "", size: "", rate: 0, price: 0 }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + Number(item.price), 0);
  const total = subtotal + Number(tax) - Number(discount);

  return (
    <div ref={formRef} className="quotation-container scrollable-container">

      <h1 className="quotation-title">Invoice</h1>

      <section className="quotation-section">
        <h2>Client Information</h2>
        <div className="TakeDetails">
          <input placeholder="Client Name" value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} />
          <input placeholder="Contact Number" value={client.contact} onChange={e => setClient({ ...client, contact: e.target.value })} />
          <input placeholder="Email Address" value={client.email} onChange={e => setClient({ ...client, email: e.target.value })} />
          <textarea placeholder="Address" value={client.address} onChange={e => setClient({ ...client, address: e.target.value })} />
        </div>
      </section>

      <section className="quotation-section">
        <h2>Invoice Details</h2>
        <div className="TakeDetails">
          <input placeholder="Quotation Date" value={quotation.date} readOnly />
          <input placeholder="Valid Till" type="date" value={quotation.validTill} onChange={e => setQuotation({ ...quotation, validTill: e.target.value })} />
          <input placeholder="Executive Name" value={quotation.executive} onChange={e => setQuotation({ ...quotation, executive: e.target.value })} />
        </div>
      </section>

      <section className="quotation-section">
        <h2>Property / Service Details</h2>
        <table className="quotation-table">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Location</th>
              <th>Type</th>
              <th>Size (sq.ft)</th>
              <th>Rate</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><input value={item.name} onChange={e => handleItemChange(item.id, "name", e.target.value)} /></td>
                <td><input value={item.location} onChange={e => handleItemChange(item.id, "location", e.target.value)} /></td>
                <td><input value={item.type} onChange={e => handleItemChange(item.id, "type", e.target.value)} /></td>
                <td><input type="number" value={item.size} onChange={e => handleItemChange(item.id, "size", e.target.value)} /></td>
                <td><input type="number" value={item.rate} onChange={e => handleItemChange(item.id, "rate", e.target.value)} /></td>
                <td>{item.price.toFixed(2)}</td>
                <td><button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-btn" onClick={handleAddItem}>Add Property</button>
      </section>

      <section className="quotation-section cost-summary-box">
        <h2>Cost Summary</h2>
        <div className="input-group">
          <label title="Enter applicable tax amount">Tax (₹):</label>
          <input type="number" value={tax} onChange={e => setTax(e.target.value)} />
        </div>
        <div className="input-group">
          <label title="Enter any discount offered">Discount (₹):</label>
          <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
        </div>
        <div className="summary-line">Subtotal: ₹{subtotal.toFixed(2)}</div>
        <div className="summary-line total">Total: ₹{total.toFixed(2)}</div>
      </section>

      <section className="quotation-section">
        <h2>Notes / Remarks</h2>
        <textarea className="Notes" placeholder="Enter any additional notes or terms" value={notes} onChange={e => setNotes(e.target.value)} />
      </section>

      <button className="submit-btn" onClick={handleGeneratePDF}>
        Generate Invoice PDF
      </button>


    </div>
  );
}
