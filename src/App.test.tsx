import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App, {
  constructGameState,
  updateGameState,
  checkRowWin,
  checkColumnWin,
  checkWinConditions,
  checkDiagonalWin
} from "./App";
import Board from "components/Board";
import BoardTile from "components/BoardTile";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should update the board size", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Board).props().boardSize).toEqual(3);
    expect(wrapper.find(Board).find("button").length).toEqual(9);
    wrapper.find("input").simulate("change", { target: { value: 8 } });
    expect(wrapper.find(Board).props().boardSize).toEqual(8);
    expect(wrapper.find(Board).find("button").length).toEqual(64);
  });

  it("should return true when there is a winning row", () => {
    const winningRow = ["X", "X", "X"];
    const nonWinningRow = ["X", "O", "X"];
    expect(checkRowWin(winningRow)).toEqual(true);
    expect(checkRowWin(nonWinningRow)).toEqual(false);
  });

  it("should return true when there is a winning column", () => {
    const winningGameState = [["X", "X", "X"], ["X", "O", "X"], ["X", "X", ""]];
    const nonWinningGameState = [
      ["", "X", "X"],
      ["X", "O", "X"],
      ["O", "X", ""]
    ];
    expect(checkColumnWin(winningGameState)).toEqual(true);
    expect(checkColumnWin(nonWinningGameState)).toEqual(false);
  });

  it("should evaluate when there is a winning diagonal condition", () => {
    const winningGameState = [
      ["O", "X", "X"],
      ["X", "O", "X"],
      ["O", "X", "O"]
    ];
    const nonWinningGameState = [
      ["", "X", "O"],
      ["X", "X", "X"],
      ["X", "X", ""]
    ];
    expect(checkDiagonalWin(winningGameState)).toEqual(true);
    expect(checkDiagonalWin(nonWinningGameState)).toEqual(false);
  });

  it("should evaluate a winning and non-winning game state", () => {
    const winningGameState = [["X", "X", "X"], ["X", "O", "X"], ["X", "X", ""]];
    const nonWinningGameState = [
      ["", "X", "X"],
      ["X", "O", "X"],
      ["O", "X", ""]
    ];
    expect(checkWinConditions(winningGameState)).toEqual(true);
    expect(checkWinConditions(nonWinningGameState)).toEqual(false);
  });

  it("should switch players' turns after making a move", () => {
    const wrapper = mount(<App />);
    // First player should be "X"
    wrapper
      .find(BoardTile)
      .at(0)
      .simulate("click");
    expect(
      wrapper
        .find(BoardTile)
        .at(0)
        .props().value
    ).toEqual("X");
    //Second player should be "O"
    wrapper
      .find(BoardTile)
      .at(1)
      .simulate("click");
    expect(
      wrapper
        .find(BoardTile)
        .at(1)
        .props().value
    ).toEqual("O");
  });

  it("should construct the initial board state", () => {
    const boardState = constructGameState(2);
    const expectedBoardState = [["", ""], ["", ""]];
    expect(boardState).toEqual(expectedBoardState);
  });

  it("should update the game state", () => {
    const initialGameState = constructGameState(2);
    const setGameState = jest.fn();
    const setPlayerTurn = jest.fn();
    const playerTurn = "X";
    const expectedGameState = [["X", ""], ["", ""]];
    updateGameState(initialGameState, setGameState, playerTurn, setPlayerTurn)(
      0,
      0
    );
    // Game state should be updated
    expect(setGameState.mock.calls.length).toEqual(1);
    expect(setGameState).toHaveBeenCalledWith(expectedGameState);
    // Player turn should be updated
    expect(setPlayerTurn.mock.calls.length).toEqual(1);
    expect(setPlayerTurn).toHaveBeenCalledWith("O");
  });
});
