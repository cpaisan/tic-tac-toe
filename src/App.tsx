import React, { useState } from "react";
import Board from "components/Board";
import { hot } from "react-hot-loader/root";
import { createUseStyles } from "react-jss";

const onChange = (
  event: any,
  setBoardSize: any,
  resetGameState: any,
  constructGameState: any
): void => {
  const {
    target: { value }
  } = event;
  const numberValue = parseInt(value);
  if (value === "") {
    setBoardSize(0);
    return;
  }
  if (numberValue < 0 || numberValue > 10) {
    // default to a 3x3 board
    setBoardSize(3);
    return;
  }
  if (numberValue) {
    setBoardSize(numberValue);
    resetGameState(constructGameState(numberValue));
  }
};

export const constructGameState = (
  boardSize: number = 3
): Array<Array<string>> => {
  return [...Array(boardSize)].map(
    (): Array<string> => [...Array(boardSize)].map(_ => "")
  );
};

export const checkRowWin = (row: Array<string>): boolean => {
  if (row.includes("")) return false;
  if (row.every(entry => entry === "X")) return true;
  if (row.every(entry => entry === "O")) return true;
  return false;
};

export const checkColumnWin = (gameState: Array<Array<string>>): boolean => {
  for (let x = 0; x < gameState.length; x++) {
    let isWinState = true;
    let player = gameState[0][x];
    // If the game tile has not been selected by a player
    // continue to next column
    if (player === "") continue;
    for (let y = 0; y < gameState.length; y++) {
      if (player !== gameState[y][x]) isWinState = false;
    }
    if (isWinState) return true;
  }
  return false;
};

export const checkDiagonalWin = (gameState: Array<Array<string>>): boolean => {
  let backslashPlayer;
  let forwardslashPlayer;
  let backslashWin = true;
  let forwardslashWin = true;

  for (let x = 0; x < gameState.length; x++) {
    if (gameState[x][x] === "") backslashWin = false;
    if (gameState[x][gameState.length - 1 - x] === "") forwardslashWin = false;
    if (!backslashWin && !forwardslashWin) return false;
    if (x === 0) {
      backslashPlayer = gameState[0][0];
      forwardslashPlayer = gameState[0][gameState.length - 1];
    }
    if (gameState[x][x] !== backslashPlayer) backslashWin = false;
    if (gameState[x][gameState.length - 1 - x] !== forwardslashPlayer)
      forwardslashWin = false;
  }
  return backslashWin || forwardslashWin;
};

export const checkWinConditions = (
  gameState: Array<Array<string>>
): boolean => {
  if (gameState.some(row => checkRowWin(row))) return true;
  if (checkColumnWin(gameState)) return true;
  if (checkDiagonalWin(gameState)) return true;
  return false;
};

export const updateGameState = (
  gameState: Array<Array<string>>,
  setGameState: any,
  playerTurn: string,
  setPlayerTurn: any
) => (row: number, column: number): void | string => {
  const updatedGameState = gameState.map((boardRow: any, index: number) => {
    if (index === row) {
      return boardRow.map(
        (boardTileValue: string, index: number) =>
          index === column ? playerTurn : boardTileValue
      );
    }
    return boardRow;
  });
  setGameState(updatedGameState);
  setPlayerTurn(playerTurn === "X" ? "O" : "X");
};

const useStyles = createUseStyles({
  root: {
    margin: "0 auto",
    width: "max-content",
    display: "grid",
    gridTemplateAreas: `
      "label  label  label"
      "header header header"
      "...... board  ....."
    `,
    gridTemplateColumns: "auto auto auto"
  },
  label: {
    gridArea: "label",
    justifySelf: "center"
  },
  header: {
    gridArea: "header",
    justifySelf: "center"
  },
  board: {
    gridArea: "board"
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  const [boardSize, setBoardSize] = useState(3);
  const [gameState, setGameState] = useState(constructGameState(boardSize));
  const [playerTurn, setPlayerTurn] = useState("X");
  const gameOver = checkWinConditions(gameState);
  return (
    <div className={classes.root}>
      <label htmlFor="boardSizeInput" className={classes.label}>
        Change board size:{" "}
        <input
          onChange={e =>
            onChange(e, setBoardSize, setGameState, constructGameState)
          }
          value={boardSize}
          name="boardSizeInput"
        />
      </label>
      {gameOver && (
        <h1 className={classes.header}>{`Player ${
          playerTurn === "X" ? "O" : "X"
        } has won!`}</h1>
      )}
      <Board
        className={classes.board}
        gameOver={gameOver}
        boardSize={boardSize}
        gameState={gameState}
        updateGameState={updateGameState(
          gameState,
          setGameState,
          playerTurn,
          setPlayerTurn
        )}
      />
    </div>
  );
};

export default hot(App);
