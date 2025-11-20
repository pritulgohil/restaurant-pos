import { Armchair, UsersRound } from "lucide-react";
import styles from "./TableRenderer.module.css";
import AssignTable from "./AssignTable";

const TableRenderer = ({
  table,
  assignDialogOpen,
  setAssignDialogOpen,
  selectedTable,
  setSelectedTable,
}) => {
  const { occupancy, isOccupied, tableNumber, peopleCount } = table;
  let remaining = isOccupied ? peopleCount : 0;

  // Determine number of chairs per position
  let chairsTop = 0,
    chairsBottom = 0,
    chairsLeft = 0,
    chairsRight = 0;

  if (occupancy === 10) {
    chairsTop = 4;
    chairsBottom = 4;
    chairsLeft = 1;
    chairsRight = 1;
  } else if (occupancy === 4) {
    chairsTop = 1;
    chairsBottom = 1;
    chairsLeft = 1;
    chairsRight = 1;
  } else if (occupancy === 2) {
    chairsTop = 1;
    chairsBottom = 1;
  }

  // Compute colors per position
  const topColors = Array.from({ length: chairsTop }, () =>
    remaining-- > 0 ? "text-green-700" : "text-gray-400"
  );
  const bottomColors = Array.from({ length: chairsBottom }, () =>
    remaining-- > 0 ? "text-green-700" : "text-gray-400"
  );
  const leftColors = Array.from({ length: chairsLeft }, () =>
    remaining-- > 0 ? "text-green-700" : "text-gray-400"
  );
  const rightColors = Array.from({ length: chairsRight }, () =>
    remaining-- > 0 ? "text-green-700" : "text-gray-400"
  );

  return (
    <div
      className={styles.tableContainer}
      onClick={() => {
        setSelectedTable(table);
        setAssignDialogOpen(true);
      }}
    >
      {/* TOP ROW */}
      <div className={`${styles.tableFlex} ${styles.tableGap}`}>
        {topColors.map((color, i) => (
          <Armchair key={`top-${i}`} size={16} className={color} />
        ))}
      </div>

      {/* MIDDLE ROW */}
      <div className={styles.tableFlex}>
        {/* LEFT CHAIR */}
        {leftColors.map((color, i) => (
          <Armchair
            key={`left-${i}`}
            size={16}
            className={`-rotate-90 ${color}`}
          />
        ))}

        {/* TABLE CARD */}
        <div
          className={`
            ${
              [2, 4].includes(occupancy)
                ? styles.tableCardSquare
                : styles.tableCard
            }
            ${isOccupied ? styles.occupiedTableCard : styles.freeTableCard}
          `}
        >
          Table {tableNumber}
          <div className={styles.iconRow}>
            <UsersRound size={14} />
            {peopleCount}
          </div>
        </div>

        {/* RIGHT CHAIR */}
        {rightColors.map((color, i) => (
          <Armchair
            key={`right-${i}`}
            size={16}
            className={`rotate-90 ${color}`}
          />
        ))}
      </div>

      {/* BOTTOM ROW */}
      <div className={`${styles.tableFlex} ${styles.tableGap}`}>
        {bottomColors.map((color, i) => (
          <Armchair
            key={`bottom-${i}`}
            size={16}
            className={`-rotate-180 ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TableRenderer;
