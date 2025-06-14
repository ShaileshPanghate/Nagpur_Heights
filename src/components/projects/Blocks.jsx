import React, { useState } from 'react';
import FlatDetails from './FlatDetails';
import './Blocks.css';
import data from '../data.json';

const Blocks = ({ project }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedFlat, setSelectedFlat] = useState(null);

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
    setSelectedFloor(null);
    setSelectedFlat(null);
  };

  const handleFloorClick = (floor) => {
    setSelectedFloor(floor);
    setSelectedFlat(null);
  };

  return (
    <div className="blocks-container">
      {/* Block List */}
      {!selectedBlock && (
        <div className="block-list">
          <div className='block-button1'>
            <h3>Select a Block</h3>
          </div>
          <div className="block-grid">
            {project.Blocks.map((block) => (
              <div
                key={block.blockId}
                className="block-card"
                onClick={() => handleBlockClick(block)}
              >
                {block.blockName}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floor List */}
      {selectedBlock && !selectedFloor && (
        <div className="floor-list">
          <div className="floors-button">
            <button onClick={() => setSelectedBlock(null)} className="back-button">
              ← Back to Blocks
            </button>
            <h3>{selectedBlock.blockName} - Select a Floor</h3>
          </div>
          <div className="floor-grid">
            {selectedBlock.Floors.slice().reverse().map((floor) => (
              <div
                key={floor.floorId}
                className="floor-card"
                onClick={() => handleFloorClick(floor)}
              >
                {floor.floor}
              </div>
            ))}
          </div>
          <hr /><hr />
        </div>
      )}

      {/* Flats List */}
      {selectedFloor && !selectedFlat && (
        <div>
          <div className='floor-button'>
            <button onClick={() => setSelectedFloor(null)} className="back-button">
              ← Back to Floors
            </button>
            <h3>{selectedBlock.blockName} - {selectedFloor.floor}</h3>
          </div>
          <div className="flats-grid">
            {selectedFloor.flats.slice().reverse().map((flat) => (
              <div
                key={flat.flatId}
                className={`flat-card ${flat.status}`}
                onClick={() => setSelectedFlat({
                  number: flat.flat,
                  area: flat.Area,
                  type: flat.flatType || flat.propertyType,
                  Price: flat.Price,
                  img1: flat.img1,
                  img2: flat.img2,
                  img3: flat.img3,
                  img4: flat.img4,
                  Info: flat.otherInfo,
                  status: flat.Price ? 'Sold' : 'Available',
                  rooms: 3,
                  owner: flat.status === 'sold' ? `${flat.Owner}` : 'Available for purchase',
                })}
              >
                <div>{flat.flat}</div>
                <div>{flat.flatType}</div>
                <div>{flat.Area}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flat Details */}
      {selectedFlat && (
        <FlatDetails
          flat={selectedFlat}
          onBack={() => setSelectedFlat(null)}
          blockName={`${selectedBlock.blockName} - ${selectedFloor.floor} `}
        />
      )}
    </div>
  );
};

export default Blocks;
