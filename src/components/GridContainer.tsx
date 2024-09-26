// components/GridContainer.tsx
import React from 'react';

interface GridContainerProps {
  rows: number;
  columns: number;
 
}

// Function to generate the grid items with IDs
const generateGridItems = (rows: number, cols: number) => {
  const gridItems = [];

  for (let row = rows; row > 0; row--) {
    for (let col = 0; col < cols; col++) {
      const letter = String.fromCharCode(65 + col); // Convert col number to letter (A, B, C, ...)
      const id = `${row}${letter}`; // Generate ID like 9A, 9B, etc.

      // Push the div with the ID and display the ID inside the div
      gridItems.push(
        <div key={id} id={id} className="border-2 border-green-500 w-10 h-14 flex items-center justify-center">
          {id}
        </div>
      );
    }
  }

  return gridItems;
};

const GridContainer: React.FC<GridContainerProps> = ({ rows, columns }) => {
  return (
    <div className={`flex grid-cols-8 flex-wrap gap-2`}>
      {generateGridItems(rows, columns)}
    </div>
  );
};

export default GridContainer;
