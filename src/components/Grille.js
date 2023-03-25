import React, { useState } from "react";
import "../styles/grille.css";

const BOARD_SIZE = 10;

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}
const createBoard = (BOARD_SIZE) => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

function GridPage() {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [car, setCar] = useState(new LinkedList(44));
  const [carCells, setCarCells] = useState(new Set([44]));
  const [snake, setSnake] = useState({
    cells: new LinkedList(44),
    direction: "right",
  });

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cellValue, cellIdx) => {
            return (
              <div
                key={cellIdx}
                className={`cell ${carCells.has(cellValue) ? "car-cell" : ""}`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default GridPage;
