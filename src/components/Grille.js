import React, { useState, useEffect } from "react";
import "../styles/grille.css";

const BOARD_SIZE = 6;

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
  for (let row = 0; row < 52; row++) {
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
  const [carBottom, setCarBottom] = useState(new LinkedList(1));
  const [carBottomCells, setCarBottomCells] = useState(new Set([1]));
  const [carUp, setCarUp] = useState(new LinkedList(312));
  const [carUpCells, setCarUpCells] = useState(new Set([312]));

  const moveCar = () => {
    const newCarCells = new Set(carBottomCells);
    const newHead = carBottom.head.value + BOARD_SIZE;

    if (newHead <= BOARD_SIZE * 52) {
      newCarCells.delete(carBottom.tail.value);
      const newHeadNode = new LinkedListNode(newHead);
      newHeadNode.next = carBottom.head;
      setCarBottom(new LinkedList(newHead));
      newCarCells.add(newHead);
      setCarBottomCells(newCarCells);
    } else {
      const newCar = new LinkedList(1);
      setCarBottom(newCar);
      setCarBottomCells(new Set([1]));
    }
  };
  const moveCarUp = () => {
    const newCar2Cells = new Set(carUpCells);
    const newHead2 = carUp.head.value - BOARD_SIZE;

    if (newHead2 > 0) {
      newCar2Cells.delete(carUp.tail.value);
      const newHeadNode2 = new LinkedListNode(newHead2);
      newHeadNode2.next = carUp.head;
      setCarUp(new LinkedList(newHead2));
      newCar2Cells.add(newHead2);
      setCarUpCells(newCar2Cells);
    } else {
      const newCar2 = new LinkedList(312);
      setCarUp(newCar2);
      setCarUpCells(new Set([312]));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(moveCar, 50);
    const intervalId2 = setInterval(moveCarUp, 50);
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [carBottomCells, carUpCells]);
  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cellValue, cellIdx) => {
            return (
              <div
                key={cellIdx}
                className={`cell ${
                  carBottomCells.has(cellValue) ? "car-cell" : ""
                } ${carUpCells.has(cellValue) ? "car-cell2" : ""}`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default GridPage;
