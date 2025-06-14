import React from 'react';
import './FlatDetails.css';
import ved from '../../assets/Ved.png';


const FlatDetails = ({ flat, onBack, blockName }) => {
  const getImage = (filename) => {
    try {
      return require(`../../assets/${filename}`);
    } catch {
      return ''; // fallback if image not found
    }
  };

  return (
    <div className="flat-details">

      <button onClick={onBack} className="back-button">
        ← Back 
      </button>

      <h2> {blockName} - {flat.number}</h2>

      <div className="flat-details-layout">
        {/* LEFT: Images */}
        <div className="flat-images">
          <div className="detail-section">
            <h3>Images</h3>
            <div className="image-placeholder">
              <div className="image-grid">
                <div className="img-thumbnail"><img src={getImage(flat.img1)} alt="Flat Img" className='image-thumb' /></div>
                <div className="img-thumbnail"><img src={getImage(flat.img2)} alt="Flat Img" className='image-thumb' /></div>
                <div className="img-thumbnail"><img src={getImage(flat.img3)} alt="Flat Img" className='image-thumb' /></div>
                <div className="img-thumbnail"><img src={getImage(flat.img4)} alt="Flat Img" className='image-thumb' /></div>
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
              <span>{flat.area}</span>
            </div>
            {
              flat.flatType ?
                <div className="detail-row">
                  <span>Flat Type:</span>
                  <span>{flat.type}</span>
                </div> : <div className="detail-row">
                  <span>Property Type:</span>
                  <span>{flat.type}</span> 
                  </div>
            }
            <div className="detail-row">
              <span>Price:</span>
              <span>{flat.Price || 'Price on request'}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Ownership</h3>
            <div className="detail-row">
              <span>Owner:</span>
              <span>{flat.owner}</span>
            </div>
          </div>


        </div>
        <div className="detail-section">
          <h3>Amenities & Features</h3>
          <div className="detail-row">
            <ul className="feature-list">
              {flat.Info?.split(',').map((feature, index) => (
                <li key={index}>{feature.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlatDetails;
