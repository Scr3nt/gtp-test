import { fireEvent, render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Error from "../Error";

describe("Error", () => {
  it("render base error", () => {
    render(<Error />);
    screen.getByTestId("error");
  });

  it("render error with children", () => {
    render(
      <Error>
        <Text>children</Text>
      </Error>,
    );
    screen.getByText("children");
  });

  it("render error with onRefresh", () => {
    const onRefresh = jest.fn();
    render(<Error onRefresh={onRefresh} />);
    fireEvent.press(screen.getByText("Try again"));
    expect(onRefresh).toBeCalled();
  });
});
