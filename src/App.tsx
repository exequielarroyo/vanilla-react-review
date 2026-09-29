import { useState } from 'react';

function Square({ value, onClick }: { value: 'X' | 'O' | null; onClick: () => void }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));

  function handleClick(index: number) {
    const newSquares = squares.slice();

    if (calculateWinner(newSquares) || squares[index]) {
      return;
    }

    if (!newSquares[index]) {
      newSquares[index] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
    }
  }

  let winner = calculateWinner(squares);
  let status = '';
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'O' : 'X'}`;
  }

  return <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onClick={() => handleClick(0)} />
      <Square value={squares[1]} onClick={() => handleClick(1)} />
      <Square value={squares[2]} onClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onClick={() => handleClick(3)} />
      <Square value={squares[4]} onClick={() => handleClick(4)} />
      <Square value={squares[5]} onClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onClick={() => handleClick(6)} />
      <Square value={squares[7]} onClick={() => handleClick(7)} />
      <Square value={squares[8]} onClick={() => handleClick(8)} />
    </div>
  </>;
}

function calculateWinner(squares: Array<'X' | 'O' | null>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}