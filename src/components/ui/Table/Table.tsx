'use client';

import React from 'react';

export type TableRow = {
  id: string;
  [key: string | number | symbol]: React.ReactNode;
};

export type TableColumn<T extends TableRow = TableRow> = {
  label?: string;
  keyOrComponent: keyof T | React.FC<{ row: T; index: number; rows: T[] }>;
};

type TableProps<T extends TableRow> = {
  showTableHead?: boolean;
  columns: TableColumn<T>[];
  rows: T[];
};

const Table = <T extends TableRow>({ columns, rows, showTableHead = true }: TableProps<T>) => {
  return (
    <table className="mt-8 border border-primary/50">
      {showTableHead && (
        <thead>
          <tr>
            {columns.map((column) => (
              <td key={column.label} className="p-2 border border-primary/50">
                {column.label}
              </td>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={row.id}>
            {columns.map((column, columnIndex) => {
              const cellData =
                typeof column.keyOrComponent === 'function'
                  ? column.keyOrComponent({ row, index: rowIndex, rows })
                  : row[column.keyOrComponent];

              return (
                <td key={row.id + columnIndex} className="p-2 border border-primary/50">
                  {cellData}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
