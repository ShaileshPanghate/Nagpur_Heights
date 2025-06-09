import React, { useState } from 'react';
import FlatDetails from './FlatDetails';
import './Blocks.css';

const Blocks = ({ projectId }) => {
  // This would normally come from an API based on projectId
  const [blocks] = useState([
    { id: 'A', name: 'Block A', floors: 5, flatsPerFloor: 4 },
    { id: 'B', name: 'Block B', floors: 5, flatsPerFloor: 4 },
    { id: 'C', name: 'Block C', floors: 5, flatsPerFloor: 4 },
    { id: 'D', name: 'Block D', floors: 5, flatsPerFloor: 4 },
  ]);

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [flats, setFlats] = useState([]);

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
    // Generate mock flats data - in real app, this would come from API
    const generatedFlats = [];
    for (let floor = 1; floor <= block.floors; floor++) {
      for (let flatNum = 1; flatNum <= block.flatsPerFloor; flatNum++) {
        generatedFlats.push({
          id: `${block.id}-${floor}${String.fromCharCode(64 + flatNum)}`,
          number: `${floor}${String.fromCharCode(64 + flatNum)}`,
          status: Math.random() > 0.5 ? 'Available' : 'Sold',
          rooms: Math.floor(Math.random() * 4) + 1,
          area: `${Math.floor(Math.random() * 500) + 500} sq.ft.`,
          owner: Math.random() > 0.5 ? 'Available for purchase' : 'Mr. Sharma',
        });
      }
    }
    setFlats(generatedFlats);
  };

  const [selectedFlat, setSelectedFlat] = useState(null);

  return (
    <div className="blocks-container">
      {!selectedBlock ? (
        <div className="block-list">
          <h3>Select a Block</h3>
          <div className="block-grid">
            {blocks.map((block) => (
              <div
                key={block.id}
                className="block-card"
                onClick={() => handleBlockClick(block)}
              >
                {block.name}
              </div>
            ))}
          </div>
        </div>
      ) : !selectedFlat ? (
        <div>
        <button onClick={() => setSelectedBlock(null)} className="back-button">
          ← Back to Blocks
        </button>
        <h3>{selectedBlock.name} - Flats</h3>
        <div className="flats-grid">
          {flats.map((flat) => (
            <div
              key={flat.id}
              className={`flat-card ${flat.status.toLowerCase()}`}
              onClick={() => setSelectedFlat(flat)}
            >
              <div>Flat {flat.number}</div>
              <div>Status: {flat.status}</div>
              <div>{flat.area}</div>
            </div>
          ))}
        </div>
      </div>
      
      ) : (
        <FlatDetails 
          flat={selectedFlat} 
          onBack={() => setSelectedFlat(null)}
          blockName={selectedBlock.name}
        />
      )}
    </div>
  );
};

export default Blocks;