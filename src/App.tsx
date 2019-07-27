import React, { useState } from "react";
import Board from "components/Board";
import { hot } from "react-hot-loader/root";

const onChange = (event: any, setState: any): void => {
  const {
    target: { value }
  } = event;
  if (parseInt(value)) setState(parseInt(value));
};

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState(3);
  return (
    <div>
      <label htmlFor="boardSizeInput">
        Change board size:{" "}
        <input
          onChange={e => onChange(e, setBoardSize)}
          value={boardSize}
          name="boardSizeInput"
        />
      </label>
      <Board boardSize={boardSize} />
    </div>
  );
};

export default hot(App);
