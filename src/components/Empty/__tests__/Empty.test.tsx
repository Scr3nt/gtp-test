import { fireEvent, render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Empty from "../Empty";

describe("Empty", () => {
  it("render base empty", () => {
    render(<Empty />);
    screen.getByTestId("empty");
  });

  it("render empty with children", () => {
    render(
      <Empty>
        <Text>children</Text>
      </Empty>,
    );
    screen.getByText("children");
  });

  it("render empty with onRefresh", () => {
    const onRefresh = jest.fn();
    render(<Empty onRefresh={onRefresh} />);
    fireEvent.press(screen.getByText("Try again"));
    expect(onRefresh).toBeCalled();
  });
});
