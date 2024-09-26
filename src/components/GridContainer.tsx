// components/GridContainer.tsx
import React from 'react';

interface GridContainerProps {
  rows: number;
  columns: number;
  startLetter: string;
  seatStatuses: string[]; // Accept seat statuses as a prop
}

// Function to generate the grid items with IDs
const generateGridItems = (rows: number, columns: number, startLetter: string, seatStatuses: string[]) => {
  const gridItems = [];

  for (let row = rows; row > 0; row--) {
    for (let col = 0; col < cols; col++) {
      const letter = String.fromCharCode(65 + col); // Convert col number to letter (A, B, C, ...)
      const id = `${row}${letter}`; // Generate ID like 9A, 9B, etc.

      const isOccupied = !seatStatuses.includes(id); // Check if the seat is occupied

      const seatColor = isOccupied ? 'bg-gray-300' : 'bg-green-300';
      // Push the div with the ID and display the ID inside the div
      gridItems.push(
        <div key={id} id={id} className={`border-2 ${seatColor} w-10 h-10 flex items-center justify-center`}>
          {id}
        </div>
      );
    }
  }

  return gridItems;
};

const GridContainer: React.FC<GridContainerProps> = ({ rows, columns, startLetter, seatStatuses }) => {
  return (
    <div className={`grid grid-cols-${columns} gap-2`}>
      {generateGridItems(rows, columns, startLetter, seatStatuses)}
    </div>
  );
};

export default GridContainer;
