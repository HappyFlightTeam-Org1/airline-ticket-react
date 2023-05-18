import React, { useState } from 'react';

const DatCho = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seatOptions = [
    { id: 1, name: 'A1', image: 'path/to/image-A1.jpg' },
    { id: 2, name: 'A2', image: 'path/to/image-A2.jpg' },
    { id: 3, name: 'B1', image: 'path/to/image-B1.jpg' },
    // Thêm các ghế khác vào đây
  ];

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div>
      <h2>Chọn ghế trong khoang máy bay</h2>
      <div className="seat-options">
        {seatOptions.map((seat) => (
          <div
            key={seat.id}
            className={`seat-option ${selectedSeat === seat ? 'selected' : ''}`}
            onClick={() => handleSeatSelection(seat)}
          >
            <img src={seat.image} alt={seat.name} />
            <span>{seat.name}</span>
          </div>
        ))}
      </div>
      {selectedSeat && (
        <div>
          <h3>Ghế đã chọn: {selectedSeat.name}</h3>
          <img src={selectedSeat.image} alt={selectedSeat.name} />
        </div>
      )}
    </div>
  );
};

export default DatCho;