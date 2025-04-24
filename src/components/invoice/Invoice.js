import React, { useState, useEffect } from 'react';
import './invoice.css';

const Invoice = () => {
  // const [items, setItems] = useState([
  //   { name: 'New Saree', price: 1000, original: 1999, discount: '50', seller: 'MahaHandloom', delivery: '13 Apr' },
  //   { name: 'Kanji Silk', price: 16000, original: 17990, discount: '11', seller: 'MahaHandloom', delivery: '13 Apr' },
  //   { name: 'Kanji Silk', price: 16000, original: 17990, discount: '11', seller: 'MahaHandloom', delivery: '13 Apr' },
  //   { name: 'Cotton Wicks', price: 100, original: 150, discount: '33', seller: 'MahaHandloom', delivery: '13 Apr' },
  //   { name: 'Carpet', price: 465, original: 480, discount: '1', seller: 'MahaHandloom', delivery: '13 Apr' },
  // ]);
  const [items, setItems] = useState([]);

  const [quantities, setQuantities] = useState(Array(items.length).fill(1));
  const [gstRates, setGstRates] = useState(Array(items.length).fill(0));
  const [cgstRates, setCgstRates] = useState(Array(items.length).fill(0));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceCharge, setServiceCharge] = useState(100);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [manualDiscount, setManualDiscount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(stored);
    setQuantities(stored.map(item => item.quantity || 1));
    setGstRates(Array(stored.length).fill(0));
    setCgstRates(Array(stored.length).fill(0));
  }, []);

  const increaseQty = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const decreaseQty = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) newQuantities[index]--;
    setQuantities(newQuantities);
  };

  const handleGstChange = (index, value) => {
    const newRates = [...gstRates];
    newRates[index] = parseFloat(value);
    setGstRates(newRates);
  };

  const handleCgstChange = (index, value) => {
    const newRates = [...cgstRates];
    newRates[index] = parseFloat(value);
    setCgstRates(newRates);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    const updatedQuantities = quantities.filter((_, i) => i !== index);
    const updatedGstRates = gstRates.filter((_, i) => i !== index);
    const updatedCgstRates = cgstRates.filter((_, i) => i !== index);

    setItems(updatedItems);
    setQuantities(updatedQuantities);
    setGstRates(updatedGstRates);
    setCgstRates(updatedCgstRates);
  };

  const getDeliveryDate = () => {
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3); // add 3 days

    const options = { weekday: 'short', day: 'numeric', month: 'short' }; // e.g., Sun, 14 Apr
    return delivery.toLocaleDateString('en-IN', options);
  };

  const sendToWhatsApp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid WhatsApp number.");
      return;
    }

    const message = `📦 *Invoice Summary*
  🧾 Total Items: ${totalItems}
  💰 💰 Original Price: ₹ ${totalOriginalPrice.toLocaleString()}
  🎉 Discount: ₹ ${totalDiscount.toLocaleString()}
  🚚 Delivery Charges: ${deliveryCharge}
  🧾 GST + CGST: ₹ ${totalTaxAmount.toFixed(2)}
  💼 Service Charge: ₹ ${parseFloat(serviceCharge || 0).toFixed(2)}
  🧮 *Total Amount: ₹ ${totalPriceWithTax.toLocaleString()}*
  💚 You saved ₹ ${totalDiscount.toLocaleString()} on this order!
  
  
  🛍️ Thank you for shopping with us!`;

    const encodedMessage = encodeURIComponent(message);
    const fullNumber = `91${phoneNumber.replace(/\D/g, '')}`; // Add country code & strip non-digits
    const url = `https://wa.me/${fullNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
    setPhoneNumber('');
  };


  const totalOriginalPrice = items.reduce((total, item, index) => total + item.price * quantities[index], 0);
  // const totalPriceWithoutTax = items.reduce((total, item, index) => total + item.price * quantities[index], 0);
  const totalTaxAmount = items.reduce((total, item, index) => total + item.price * quantities[index] * (gstRates[index] + cgstRates[index]), 0);
  const totalItems = quantities.reduce((sum, q) => sum + q, 0); // ✅ define this here
  const totalDiscount = parseFloat(manualDiscount || 0);
  const totalPriceWithTax =
    totalOriginalPrice - totalDiscount +
    totalTaxAmount +
    parseFloat(serviceCharge || 0) +
    parseFloat(deliveryCharge || 0);




  return (
    <div className='mainDiv'>
      <main className="cart-container">

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Seller: {item.seller}</p>
                  <p>
                    ₹{item.price}{' '}
                    <span style={{ textDecoration: 'line-through' }}>₹{item.original}</span>{' '}
                    <span style={{ color: 'green' }}>{item.discount}% off</span>
                  </p>
                  <p>
                    Delivery by {getDeliveryDate()} Free <br />
                    <small>7 Days Replacement Policy</small>
                  </p>
                  <div className="actions">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{quantities[index]}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                    &nbsp;&nbsp;
                    <span onClick={() => removeItem(index)} style={{ color: 'red', cursor: 'pointer', fontWeight: 500 }}>
                      REMOVE ITEM
                    </span>

                  </div>

                  <div className="tax-dropdowns">
                    <label>
                      GST (%): &nbsp;
                      <select value={gstRates[index]} onChange={(e) => handleGstChange(index, e.target.value)}>
                        <option value={0}>0%</option>
                        <option value={0.05}>5%</option>
                        <option value={0.12}>12%</option>
                        <option value={0.18}>18%</option>
                        <option value={0.28}>28%</option>
                      </select>
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      CGST (%): &nbsp;
                      <select value={cgstRates[index]} onChange={(e) => handleCgstChange(index, e.target.value)}>
                        <option value={0}>0%</option>
                        <option value={0.05}>5%</option>
                        <option value={0.12}>12%</option>
                        <option value={0.18}>18%</option>
                        <option value={0.28}>28%</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="price-details">
            <h3 style={{ color: 'blue' }}>PRICE DETAILS</h3>
            <p>Price ({totalItems} items): <span>₹ {totalOriginalPrice.toLocaleString()}</span></p>
            <p>GST + CGST Charges: <span>₹ {totalTaxAmount.toFixed(2)}</span></p>
            <p>
              Discount: ₹&nbsp;
               <input
                type="number"
                value={manualDiscount}
                onChange={(e) => setManualDiscount(e.target.value)}
                style={{ width: '80px', color: 'green', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </p>

            <p>
              Delivery Charges: ₹&nbsp;
              <input
                type="number"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                style={{ width: '80px' }}
              />
            </p>


            <p>
              Service Charge: ₹&nbsp;
              <input
                type="number"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(e.target.value)}
                style={{ width: '80px' }}
              />
            </p>

            <hr />
            <p><strong>Total Amount:</strong> <span>₹ {totalPriceWithTax.toLocaleString()}</span></p>
            <p style={{ color: 'green' }}>
              You will save ₹ {totalDiscount.toLocaleString()} on this order
            </p>
            <input
              type="tel"
              placeholder="Enter WhatsApp number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="phone-input"
            />
            <button className="apply-coupon" onClick={sendToWhatsApp}>
              Send Invoice
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Invoice;   