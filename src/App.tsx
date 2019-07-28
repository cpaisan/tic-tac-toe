import React, { useState } from "react";
import Board from "components/Board";
import { hot } from "react-hot-loader/root";

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
  if (numberValue) {
    setBoardSize(numberValue);
    resetGameState(constructGameState(numberValue));
  }
};

export const constructGameState = (
  boardSize: number = 3
): Array<Array<string>> =>
  [...Array(boardSize)].map(
    (): Array<string> => [...Array(boardSize)].map(_ => "")
  );

export const updateGameState = (
  gameState: Array<Array<string>>,
  setGameState: any,
  playerTurn: string,
  setPlayerTurn: any
) => (row: number, column: number): void => {
  setGameState(
    gameState.map((boardRow: any, index: number) => {
      if (index === row) {
        return boardRow.map(
          (boardTileValue: string, index: number) =>
            index === column ? playerTurn : boardTileValue
        );
      }
      return boardRow;
    })
  );
  setPlayerTurn(playerTurn === "X" ? "O" : "X");
};

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [gameState, setGameState] = useState(constructGameState(boardSize));
  const [playerTurn, setPlayerTurn] = useState("X");

  return (
    <div>
      <label htmlFor="boardSizeInput">
        Change board size:{" "}
        <input
          onChange={e =>
            onChange(e, setBoardSize, setGameState, constructGameState)
          }
          value={boardSize}
          name="boardSizeInput"
        />
      </label>
      <Board
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
