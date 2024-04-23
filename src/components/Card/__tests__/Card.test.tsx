import { render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Card from "../Card";

describe("Card", () => {
  it("render card with text", () => {
    render(
      <Card>
        <Text>Card</Text>
      </Card>,
    );
    screen.getByText("Card");
  });
});
