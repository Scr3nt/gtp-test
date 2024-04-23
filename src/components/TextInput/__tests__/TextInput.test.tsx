import { fireEvent, render, screen } from "@testing-library/react-native";

import TextInput from "../TextInput";

const onPressMock = jest.fn();
const onChangeTextMock = jest.fn();

describe("TextInput", () => {
  it("render base TextInput", () => {
    render(<TextInput value="TextInput" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput and write text", () => {
    render(<TextInput placeholder="Enter data" onChange={onChangeTextMock} />);
    fireEvent.changeText(
      screen.getByPlaceholderText("Enter data"),
      "TextInput",
    );
  });

  it("render TextInput with label", () => {
    render(<TextInput label="Label" />);
    screen.getByText("Label");
  });

  it("render TextInput with hint", () => {
    render(<TextInput hint="Hint" />);
    screen.getByText("Hint");
  });

  it("render TextInput with error", () => {
    render(<TextInput error="Error" />);
    screen.getByText("Error");
  });

  it("render TextInput disabled", () => {
    render(<TextInput disabled value="Disabled" />);
    screen.getByDisplayValue("Disabled");
  });

  it("render TextInput with multiline", () => {
    render(<TextInput value="Multiline" multiline />);
    screen.getByDisplayValue("Multiline");
  });

  it("render TextInput with format number", () => {
    render(<TextInput value="1 000 000" format="number" />);
    screen.getByDisplayValue("1 000 000");
  });

  it("render TextInput with format phone", () => {
    render(<TextInput value="06 00 00 00 00" format="phone" />);
    screen.getByDisplayValue("06 00 00 00 00");
  });

  it("render TextInput with delete button and press", () => {
    render(<TextInput value="delete" onDelete={onPressMock} />);
    fireEvent.press(screen.getByTestId("delete-button"));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("render TextInput with eye button and press", () => {
    render(<TextInput value="delete" showHidePasswordButton />);
    fireEvent.press(screen.getByTestId("eye-button"));
  });

  it("render TextInput with type thin", () => {
    render(<TextInput value="TextInput" type="thin" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type extra-light", () => {
    render(<TextInput value="TextInput" type="extra-light" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type light", () => {
    render(<TextInput value="TextInput" type="light" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type regular", () => {
    render(<TextInput value="TextInput" type="regular" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type medium", () => {
    render(<TextInput value="TextInput" type="medium" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type semi-bold", () => {
    render(<TextInput value="TextInput" type="semi-bold" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type bold", () => {
    render(<TextInput value="TextInput" type="bold" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type extra-bold", () => {
    render(<TextInput value="TextInput" type="extra-bold" />);
    screen.getByDisplayValue("TextInput");
  });

  it("render TextInput with type black", () => {
    render(<TextInput value="TextInput" type="black" />);
    screen.getByDisplayValue("TextInput");
  });
});
