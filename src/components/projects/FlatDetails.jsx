import React from 'react';
import './FlatDetails.css';

const FlatDetails = ({ flat, onBack, blockName }) => {
  return (
    <div className="flat-details">
      <button onClick={onBack} className="back-button">
        ← Back to Flats
      </button>

      <h2> {blockName} - {flat.number}</h2>

      <div className="flat-details-layout">
        {/* LEFT: Images */}
        <div className="flat-images">
          <div className="detail-section">
            <h3>Images</h3>
            <div className="image-placeholder">
              <p>Flat images would be displayed here</p>
              <div className="image-grid">
                <div className="img-thumbnail">Image 1</div>
                <div className="img-thumbnail">Image 2</div>
                <div className="img-thumbnail">Image 3</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="flat-info">
          <div className="detail-section">
            <h3>Basic Information</h3>
            <div className="detail-row">
              <span>Area:</span>
              <span>{flat.Area}</span>
            </div>
            <div className="detail-row">
              <span>Price:</span>
              <span>{flat.Price || 'Price on request'}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Ownership</h3>
            <div className="detail-row">
              <span>Owner:</span>
              <span>Not Assigned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatDetails;
