import React from 'react';

interface GridContainerProps {
  rows: number;
  columns: number;
  startLetter: string;
  startRow: number; // New prop to specify the starting row number
  seatStatuses: string[]; // Accept seat statuses as a prop
}

// Function to generate the grid items with IDs
const generateGridItems = (
  rows: number,
  columns: number,
  startLetter: string,
  startRow: number, // Add startRow parameter
  seatStatuses: string[]
) => {
  const gridItems = [];
  const startCharCode = startLetter.charCodeAt(0);

  // Loop through each row, now starting from the passed startRow
  for (let row = startRow + rows - 1; row >= startRow; row--) {
    // Loop through each column
    for (let col = 0; col < columns; col++) {
      const letter = String.fromCharCode(startCharCode + col); // Get letter based on column index
      const id = `${row}${letter}`; // Generate ID like 9H, 9I, etc.

      // Check if the seat is occupied
      const isOccupied = !seatStatuses.includes(id);

      // Set the color for the seat
      const seatColor = isOccupied ? 'bg-gray-300' : 'bg-green-300';

      // Push the seat div with the seat ID
      gridItems.push(
        <div
          key={id}
          id={id}
          className={`border-2 ${seatColor} w-10 h-10 flex-shrink-0 flex items-center justify-center`}
        >
          {id}
        </div>
      );
    }
  }

  return gridItems;
};

const GridContainer: React.FC<GridContainerProps> = ({
  rows,
  columns,
  startLetter,
  startRow, // Add startRow as a prop
  seatStatuses,
}) => {
  return (
    <div className="w-full overflow-x-auto flex-shrink-0">
      <div className={`grid grid-cols-${columns} gap-2`}>
        {generateGridItems(rows, columns, startLetter, startRow, seatStatuses)}
      </div>
    </div>
  );
};

export default GridContainer;
