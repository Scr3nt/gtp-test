import { render, screen } from "@testing-library/react-native";

import Switch from "../Switch";

describe("Switch", () => {
  it("render base switch", () => {
    render(<Switch />);
    screen.getByTestId("switch");
  });

  it("render switch disabled", () => {
    render(<Switch disabled />);
    screen.getByTestId("switch");
  });
});
