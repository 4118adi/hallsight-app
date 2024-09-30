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
  // Use conditional class mapping for grid-cols-N classes
  const gridColumnClass = `grid-cols-${columns}`;

  // Define a class map for Tailwind grid columns
  const columnClasses ={
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    // Add more if needed
  };

  return (
    <div className="w-full overflow-x-auto flex-shrink-0">
      <div className={`grid gap-2 ${columnClasses[columns as keyof typeof columnClasses] || 'grid-cols-1'}`}>
        {generateGridItems(rows, columns, startLetter, startRow, seatStatuses)}
      </div>
    </div>
  );
};

export default GridContainer;
