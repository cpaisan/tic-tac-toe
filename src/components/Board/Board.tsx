import React from "react";
import { createUseStyles } from "react-jss";
import BoardTile from "components/BoardTile";

const useStyles = createUseStyles({
  root: ({ boardSize }: { boardSize: number }) => ({
    display: "grid",
    gridTemplateRows: `repeat(${boardSize}, max-content)`,
    gridTemplateColumns: `repeat(${boardSize}, max-content)`,
    maxWidth: "60%"
  })
});

interface BoardProps {
  boardSize?: number;
  gameState: any;
  updateGameState: any;
  gameOver: boolean;
  className: string;
}

export const constructBoard = (
  gameState: Array<Array<string>>,
  updateGameState: any,
  gameOver: boolean
): Array<Array<JSX.Element>> =>
  gameState.map(
    (row, rowIndex): Array<JSX.Element> => {
      const boardRow = [];
      for (let column = 0; column < gameState.length; column++) {
        boardRow.push(
          <BoardTile
            key={column}
            value={row[column]}
            onClick={() => updateGameState(rowIndex, column)}
            gameOver={gameOver}
          />
        );
      }
      return boardRow;
    }
  );

const Board: React.FC<BoardProps> = props => {
  const {
    boardSize = 3,
    gameState,
    updateGameState,
    gameOver,
    className
  } = props;
  const classes = useStyles({ boardSize });
  const board = constructBoard(gameState, updateGameState, gameOver);
  return <div className={[className, classes.root].join(" ")}>{board}</div>;
};

Board.defaultProps = {
  boardSize: 3
};

export default Board;
