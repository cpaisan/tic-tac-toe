import React from "react";
import Board from "components/Board";
import { hot } from "react-hot-loader/root";

const App: React.FC = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default hot(App);
