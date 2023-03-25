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
  const [car, setCar] = useState(new LinkedList(1));
  const [carCells, setCarCells] = useState(new Set([1]));
  const [car2, setCar2] = useState(new LinkedList(312));
  const [car2Cells, setCar2Cells] = useState(new Set([312]));

  const moveCar = () => {
    const newCarCells = new Set(carCells);
    const newHead = car.head.value + BOARD_SIZE;

    if (newHead <= BOARD_SIZE * 52) {
      newCarCells.delete(car.tail.value);
      const newHeadNode = new LinkedListNode(newHead);
      newHeadNode.next = car.head;
      setCar(new LinkedList(newHead));
      newCarCells.add(newHead);
      setCarCells(newCarCells);
    } else {
      const newCar = new LinkedList(1);
      setCar(newCar);
      setCarCells(new Set([1]));
    }
  };
  const moveCarUp = () => {
    const newCar2Cells = new Set(car2Cells);
    const newHead2 = car2.head.value - BOARD_SIZE;

    if (newHead2 > 0) {
      newCar2Cells.delete(car2.tail.value);
      const newHeadNode2 = new LinkedListNode(newHead2);
      newHeadNode2.next = car2.head;
      setCar2(new LinkedList(newHead2));
      newCar2Cells.add(newHead2);
      setCar2Cells(newCar2Cells);
    } else {
      const newCar2 = new LinkedList(312);
      setCar2(newCar2);
      setCar2Cells(new Set([312]));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(moveCar, 50);
    const intervalId2 = setInterval(moveCarUp, 50);
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [carCells, car2Cells]);
  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cellValue, cellIdx) => {
            return (
              <div
                key={cellIdx}
                className={`cell ${carCells.has(cellValue) ? "car-cell" : ""} ${
                  car2Cells.has(cellValue) ? "car-cell2" : ""
                }`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default GridPage;
