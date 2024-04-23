import { fireEvent, render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
  it("should render label when provided", () => {
    render(<Checkbox label="Checkbox" />);

    expect(screen.getByText("Checkbox")).toBeTruthy();
  });

  it("should render label when provided as ReactNode", () => {
    render(<Checkbox label={<Text>Checkbox</Text>} />);

    expect(screen.getByText("Checkbox")).toBeTruthy();
  });

  it("should render default unchecked checkbox", () => {
    render(<Checkbox />);

    expect(screen.getByTestId("checkbox")).toBeTruthy();
  });

  it("should render checked checkbox", () => {
    render(<Checkbox value />);

    expect(screen.getByTestId("checkbox-icon")).toBeTruthy();
  });

  it("should render disabled checkbox", () => {
    render(<Checkbox disabled />);

    expect(screen.getByTestId("checkbox")).toBeTruthy();
  });

  it("should press checkbox", () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} />);

    fireEvent.press(screen.getByTestId("checkbox"));

    expect(onChange).toHaveBeenCalled();
  });
});
