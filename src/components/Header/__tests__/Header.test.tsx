import { SafeAreaProvider } from "react-native-safe-area-context";

import { render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Header from "../Header";

jest.mock("expo-router");

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe("Header", () => {
  it("render Header with children", () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Header>Header</Header>
      </SafeAreaProvider>,
    );
    screen.getByText("Header");
  });

  it("render Header with leftComponent", () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Header leftComponent={<Text testID="left-component">left</Text>} />
      </SafeAreaProvider>,
    );
    screen.getByTestId("left-component");
  });

  it("render Header with rightComponent", () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Header rightComponent={<Text testID="right-component">right</Text>} />
      </SafeAreaProvider>,
    );
    screen.getByTestId("right-component");
  });

  it("render Header with leftGoBack", () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Header leftGoBack />
      </SafeAreaProvider>,
    );
    screen.getByTestId("left-goback");
  });
});
