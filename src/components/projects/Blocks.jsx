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
          <h3>Select a Block</h3>
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
          <button onClick={() => setSelectedBlock(null)} className="back-button">
            ← Back to Blocks
          </button>
          <h3>{selectedBlock.blockName} - Select a Floor</h3>
          <div className="floor-grid">
            {selectedBlock.Floors.map((floor) => (
              <div
                key={floor.floorId}
                className="floor-card"
                onClick={() => handleFloorClick(floor)}
              >
                {floor.floor}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flats List */}
      {selectedFloor && !selectedFlat && (
        <div>
          <button onClick={() => setSelectedFloor(null)} className="back-button">
            ← Back to Floors
          </button>
          <h3>{selectedBlock.blockName} - {selectedFloor.floor}</h3>
          <div className="flats-grid">
            {selectedFloor.flats.map((flat) => (
              <div
                key={flat.flatId}
                className={`flat-card available`}
                onClick={() => setSelectedFlat({
                  number: flat.flat,
                  area: flat.Area,
                  status: flat.Price ? 'Sold' : 'Available',
                  rooms: 3,
                  owner: flat.Price ? 'Mr. Sharma' : 'Available for purchase',
                })}
              >
                <div>{flat.flat}</div>
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
