import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const createEmptyBoard = (size) => {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(Array(size).fill(null));
  }
  return matrix;
};

function App() {
  const [board, setBoard] = useState(createEmptyBoard(3));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex]) return;
    let newBoard = [...board];
    newBoard[rowIndex][cellIndex] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(rowIndex, cellIndex);
    //Check winner call
  };

  const checkWinner = (rowIndex, cellIndex) => {
    let size = board.length;
    let currentPLayer = board[rowIndex][cellIndex];

    let rowCount = 0;
    for (let i = 0; i < size; i++) {
      if (board[rowIndex][i] == currentPLayer) rowCount++;
    }
    if (rowCount == size) {
      setWinner(currentPLayer);
      return;
    }

    let colCount = 0;
    for (let i = 0; i < size; i++) {
      if (board[i][cellIndex] == currentPLayer) colCount++;
    }
    if (colCount == size) {
      setWinner(currentPLayer);
      return;
    }

    if (rowIndex == cellIndex) {
      let diagonalCount = 0;
      for (let i = 0; i < size; i++) {
        if (board[i][i] == currentPLayer) diagonalCount++;
      }
      if (diagonalCount == size) {
        setWinner(currentPLayer);
        return;
      }
    }

    if (rowIndex + cellIndex == size - 1) {
      let antiDiagonalCount = 0;
      for (let i = 0; i < size; i++) {
        if (board[i][size - i - 1] == currentPLayer) antiDiagonalCount++;
      }
      if (antiDiagonalCount == size) {
        setWinner(currentPLayer);
        return;
      }
    }

    let isDraw = true;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] == null) {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) break;
    }
    if (isDraw) setWinner("Draw");
  };

  const reset = () => {
    setBoard(createEmptyBoard(3));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="app">
      {winner ? (
        <div className="winner">
          {winner == "Draw" ? (
            <h2> It is a Draw</h2>
          ) : (
            <h2>{winner} Wins!!!</h2>
          )}
        </div>
      ) : (
        <div>
          <h1>Tic Tac Toe</h1>
          <div className="board">
            {board.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="row">
                  {row.map((cell, cellIndex) => {
                    return (
                      <div
                        key={cellIndex}
                        className="square"
                        onClick={() => handleClick(rowIndex, cellIndex)}
                      >
                        {cell}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

export default App;
