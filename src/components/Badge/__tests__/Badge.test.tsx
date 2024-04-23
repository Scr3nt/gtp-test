import { render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Badge from "../Badge";

describe("Badge", () => {
  it("should render children when provided", () => {
    render(<Badge>Badge</Badge>);

    expect(screen.getByText("Badge")).toBeTruthy();
  });

  it("should render children when provided as ReactNode", () => {
    render(
      <Badge>
        <Text>Badge</Text>
      </Badge>,
    );

    expect(screen.getByText("Badge")).toBeTruthy();
  });
});
