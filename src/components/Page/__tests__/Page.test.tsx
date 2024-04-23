import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { fireEvent, render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import Page from "../Page";

const onScrollMock = jest.fn();
const eventData = {
  nativeEvent: {
    contentOffset: {
      y: 200,
    },
  },
};

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe("Page", () => {
  it("render base page", () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Page>
          <Text>Page</Text>
        </Page>
      </SafeAreaProvider>,
    );
    screen.getByText("Page");
  });

  it("render page with scroll view", () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Page isScrollView>
          <View>
            <Text>PageScrollView</Text>
          </View>
        </Page>
      </SafeAreaProvider>,
    );
    screen.getByText("PageScrollView");
  });

  it("render page with scroll view and scroll", () => {
    render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <Page onScroll={onScrollMock}>
          <View>
            <Text>PageScrollView</Text>
          </View>
        </Page>
      </SafeAreaProvider>,
    );
    fireEvent.scroll(screen.getByText("PageScrollView"), eventData);
  });
});
