import { fireEvent, render, screen } from "@testing-library/react-native";

import Button from "../Button";

describe("Button", () => {
  it("render base button", () => {
    render(<Button />);
    screen.getByText("Button");
  });

  it("render outline button", () => {
    render(<Button outline />);
    screen.getByText("Button");
  });

  it("render loading button", () => {
    render(<Button loading />);
    screen.getByText("Button");
  });

  it("render disabled button", () => {
    render(<Button disabled />);
    screen.getByText("Button");
  });

  it("render base button with custom text", () => {
    render(<Button> ButtonCustomText </Button>);
    screen.getByText("ButtonCustomText");
  });

  it("call onPress when clicked", () => {
    const onPressMock = jest.fn();
    render(<Button onPress={onPressMock}>Press me</Button>);
    fireEvent.press(screen.getByText("Press me"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("don't call onPress when clicked on disabled", () => {
    const onPressMock = jest.fn();
    render(
      <Button disabled onPress={onPressMock}>
        Press me
      </Button>,
    );
    fireEvent.press(screen.getByText("Press me"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("don't call onPress when clicked on loading", () => {
    const onPressMock = jest.fn();
    render(
      <Button loading onPress={onPressMock}>
        Press me
      </Button>,
    );
    fireEvent.press(screen.getByText("Press me"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
