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
  const [car, setCar] = useState(new LinkedList(1));
  const [carCells, setCarCells] = useState(new Set([1]));
  /*   function handleKeyDown(event) {
    const newCarCells = new Set(carCells);

    // Move the car up
    if (event.key === "ArrowUp") {
      const newHead = car.head.value - BOARD_SIZE;
      if (newHead >= 1) {
        newCarCells.delete(car.tail.value);
        const newHeadNode = new LinkedListNode(newHead);
        newHeadNode.next = car.head;
        setCar(new LinkedList(newHead));
        newCarCells.add(newHead);
        setCarCells(newCarCells);
      }
    }
    // Move the car down
    else if (event.key === "ArrowDown") {
      const newHead = car.head.value + BOARD_SIZE;
      if (newHead <= BOARD_SIZE * BOARD_SIZE) {
        newCarCells.delete(car.tail.value);
        const newHeadNode = new LinkedListNode(newHead);
        newHeadNode.next = car.head;
        setCar(new LinkedList(newHead));
        newCarCells.add(newHead);
        setCarCells(newCarCells);
      }
    }
  } */

  const moveCar = () => {
    const newCarCells = new Set(carCells);
    const newHead = car.head.value + BOARD_SIZE;

    if (newHead <= BOARD_SIZE * BOARD_SIZE) {
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

  useEffect(() => {
    const intervalId = setInterval(moveCar, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [carCells]);
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
