import React, { useState, useEffect } from 'react';
import './quotation.css';

const Quotation = () => {
  const [client, setClient] = useState({ name: '', phone: '', email: '', date: '' });
  const [items, setItems] = useState([]);
  const [itemInput, setItemInput] = useState({ service: '', desc: '', price: '', qty: 0, discount: 0, tax: 0 });
  const [editingIndex, setEditingIndex] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('real-estate-quote')) || { client: {}, items: [] };
    setClient(stored.client || {});
    setItems(stored.items || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('real-estate-quote', JSON.stringify({ client, items }));
  }, [client, items]);

  const handleClientChange = (e) => {
    setClient(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (e) => {
    setItemInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addItem = () => {
    if (!itemInput.service || !itemInput.price) return;
    const newItem = { ...itemInput, price: parseFloat(itemInput.price), qty: parseInt(itemInput.qty), discount: parseFloat(itemInput.discount), tax: parseFloat(itemInput.tax) };
    setItems([...items, newItem]);
    resetItemForm();
  };

  const updateItem = () => {
    const updated = items.map((item, i) => (i === editingIndex ? itemInput : item));
    setItems(updated);
    setEditingIndex(null);
    resetItemForm();
  };

  const editItem = (index) => {
    setEditingIndex(index);
    setItemInput(items[index]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const resetItemForm = () => {
    setItemInput({ service: '', desc: '', price: '', qty: 1, discount: 0, tax: 0 });
  };

  const calculateRowTotal = (item) => {
    const price = item.price * item.qty;
    const discountAmount = price * (item.discount / 100);
    const taxAmount = (price - discountAmount) * (item.tax / 100);
    return (price - discountAmount + taxAmount).toFixed(2);
  };

  const calculateSummary = () => {
    let subtotal = 0, discount = 0, tax = 0;
    items.forEach(item => {
      const base = item.price * item.qty;
      const dis = base * (item.discount / 100);
      const tx = (base - dis) * (item.tax / 100);
      subtotal += base;
      discount += dis;
      tax += tx;
    });
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      tax: tax.toFixed(2),
      grandTotal: (subtotal - discount + tax).toFixed(2)
    };
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const summary = calculateSummary();

  return (
    <div className="quote-container">

      <div className="item-form">
        <input name="service" placeholder="Property / Service" value={itemInput.service} onChange={handleItemChange} />
        <input name="desc" placeholder="Description" value={itemInput.desc} onChange={handleItemChange} />
        <input name="price" type="number" placeholder="Unit Price" value={itemInput.price} onChange={handleItemChange} />
        <input name="qty" type="number" placeholder="Qty" value={itemInput.qty} onChange={handleItemChange} />
        <input name="discount" type="number" placeholder="Discount (%)" value={itemInput.discount} onChange={handleItemChange} />
        <input name="tax" type="number" placeholder="Tax (%)" value={itemInput.tax} onChange={handleItemChange} />
        {editingIndex !== null ? (
          <button onClick={updateItem}>Update</button>
        ) : (
          <button onClick={addItem}>+ Add</button>
        )}
      </div>
      <div className="table-wrapper">
        <table className="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Property/Service</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Discount (%)</th>
              <th>Tax (%)</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, i) => (
              <tr key={i}>
                <td>{indexOfFirstItem + i + 1}</td>
                <td>{item.service}</td>
                <td>{item.desc}</td>
                <td>₹{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.discount}</td>
                <td>{item.tax}</td>
                <td>₹{calculateRowTotal(item)}</td>
                <td>
                  <button onClick={() => editItem(indexOfFirstItem + i)}>Edit</button>
                  <button onClick={() => deleteItem(indexOfFirstItem + i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="quote-summary">
        <p>Subtotal: ₹{summary.subtotal}</p>
        <p>Discount: ₹{summary.discount}</p>
        <p>Tax: ₹{summary.tax}</p>
        <h3>Grand Total: ₹{summary.grandTotal}</h3>
      </div>
    </div>
  );
};

export default Quotation;
