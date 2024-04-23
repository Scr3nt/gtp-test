import { render, screen } from "@testing-library/react-native";

import Skeleton from "../Skeleton";

describe("Skeleton", () => {
  it("render base skeleton", () => {
    render(<Skeleton testID="skeleton" />);
    screen.getByTestId("skeleton");
  });

  it("render circle skeleton", () => {
    render(<Skeleton testID="skeleton_circle" type="circle" />);
    screen.getByTestId("skeleton_circle");
  });

  it("render square skeleton", () => {
    render(<Skeleton testID="skeleton_square" type="square" />);
    screen.getByTestId("skeleton_square");
  });

  it("render button skeleton", () => {
    render(<Skeleton testID="skeleton_button" type="button" />);
    screen.getByTestId("skeleton_button");
  });

  it("render text skeleton", () => {
    render(<Skeleton testID="skeleton_text" type="text" />);
    screen.getByTestId("skeleton_text");
  });

  it("render textinput skeleton", () => {
    render(<Skeleton testID="skeleton_textinput" type="textinput" />);
    screen.getByTestId("skeleton_textinput");
  });

  it("render pill skeleton", () => {
    render(<Skeleton testID="skeleton_pill" type="pill" />);
    screen.getByTestId("skeleton_pill");
  });

  it("render card skeleton", () => {
    render(<Skeleton testID="skeleton_card" type="card" />);
    screen.getByTestId("skeleton_card");
  });

  it("render skeleton with custom height", () => {
    render(<Skeleton testID="skeleton" height={100} />);
    screen.getByTestId("skeleton");
  });

  it("render skeleton with custom width", () => {
    render(<Skeleton testID="skeleton" width={100} />);
    screen.getByTestId("skeleton");
  });

  it("render skeleton with custom radius", () => {
    render(<Skeleton testID="skeleton" radius={100} />);
    screen.getByTestId("skeleton");
  });

  it("render skeleton with custom style", () => {
    // eslint-disable-next-line react-native/no-inline-styles
    render(<Skeleton testID="skeleton" style={{ marginBottom: 10 }} />);
    screen.getByTestId("skeleton");
  });
});
