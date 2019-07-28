import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Board, { constructBoard } from "../Board";
import BoardTile from "components/BoardTile";
import { constructGameState, updateGameState } from "App";

configure({ adapter: new Adapter() });

describe("Board", () => {
  it("should render the game board", () => {
    const gameState = constructGameState(5);
    const setGameState = jest.fn();
    const setPlayerTurn = jest.fn();
    const wrapper = mount(
      <Board
        boardSize={5}
        gameState={gameState}
        playerTurn="X"
        updateGameState={updateGameState(
          gameState,
          setGameState,
          "X",
          setPlayerTurn
        )}
      />
    );
    expect(wrapper.props().boardSize).toEqual(5);
    expect(wrapper.find("button").length).toBe(25);
  });

  it("should render the game board without a specified boardSize", () => {
    const gameState = constructGameState();
    const setGameState = jest.fn();
    const setPlayerTurn = jest.fn();
    const wrapper = mount(
      <Board
        gameState={gameState}
        playerTurn="X"
        updateGameState={updateGameState(
          gameState,
          setGameState,
          "X",
          setPlayerTurn
        )}
      />
    );
    expect(wrapper.props().boardSize).toEqual(3);
    expect(wrapper.find(BoardTile).length).toEqual(9);
  });

  it("should construct a multidimensional array", () => {
    const gameState = constructGameState(10);
    const updateGameState = jest.fn();
    const board = constructBoard(gameState, updateGameState, "X");
    expect(board.length).toEqual(10);
    board.forEach(row => expect(row.length).toEqual(10));
  });
});
