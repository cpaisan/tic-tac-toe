import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = (boardSize: number = 3): any =>
  createUseStyles({
    root: {
      display: "grid",
      gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
      maxWidth: "60%"
    }
  });

interface BoardProps {
  boardSize?: number;
}

export const constructBoard = (boardSize: number): Array<Array<JSX.Element>> =>
  [...Array(boardSize)].map(
    (): Array<JSX.Element> => {
      const boardRow = [];
      for (let x = 0; x < boardSize; x++) {
        boardRow.push(<button key={x}>{x}</button>);
      }
      return boardRow;
    }
  );

const Board: React.FC<BoardProps> = props => {
  const { boardSize = 3 } = props;
  const classes = useStyles(boardSize)();
  const board = constructBoard(boardSize);
  return <div className={classes.root}>{board}</div>;
};

Board.defaultProps = {
  boardSize: 3
};

export default Board;
