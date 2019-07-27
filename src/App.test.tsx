import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";
import Board from "components/Board";

configure({ adapter: new Adapter() });

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
