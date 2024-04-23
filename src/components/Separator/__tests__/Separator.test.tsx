import { render, screen } from "@testing-library/react-native";

import Separator from "../Separator";

describe("Separator", () => {
  it("render base separator", () => {
    render(<Separator />);
    screen.getByTestId("separator");
  });
});
