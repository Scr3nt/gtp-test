import { fireEvent, render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Radio from "../Radio";

describe("Radio", () => {
  it("should render label when provided", () => {
    render(<Radio label="Radio" />);

    expect(screen.getByText("Radio")).toBeTruthy();
  });

  it("should render label when provided as ReactNode", () => {
    render(<Radio label={<Text>Radio</Text>} />);

    expect(screen.getByText("Radio")).toBeTruthy();
  });

  it("should render default unchecked radio", () => {
    render(<Radio />);

    expect(screen.getByTestId("radio")).toBeTruthy();
  });

  it("should render checked radio", () => {
    render(<Radio value />);

    expect(screen.getByTestId("radio-icon")).toBeTruthy();
  });

  it("should render disabled radio", () => {
    render(<Radio disabled />);

    expect(screen.getByTestId("radio")).toBeTruthy();
  });

  it("should press radio", () => {
    const onChange = jest.fn();
    render(<Radio onChange={onChange} />);

    fireEvent.press(screen.getByTestId("radio"));

    expect(onChange).toHaveBeenCalled();
  });
});
