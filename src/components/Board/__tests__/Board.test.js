import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Board, { constructBoard } from "../Board";

configure({ adapter: new Adapter() });

describe("Board", () => {
  it("should render the game board", () => {
    const wrapper = mount(<Board boardSize={5} />);
    expect(wrapper.props().boardSize).toEqual(5);
    expect(wrapper.find("button").length).toBe(25);
  });

  it("should render the game board without a specified boardSize", () => {
    const wrapper = mount(<Board />);
    expect(wrapper.props().boardSize).toEqual(3);
    expect(wrapper.find("button").length).toEqual(9);
  });

  it("should construct a multidimensional array", () => {
    const board = constructBoard(10);
    expect(board.length).toEqual(10);
    board.forEach(row => expect(row.length).toEqual(10));
  });
});
