import { render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import LayoutManager from "../LayoutManager";

describe("LayoutManager", () => {
  test("renders phone layout when width is less than or equal to PHONE_WIDTH_BREAKPOINT", () => {
    render(
      <LayoutManager
        phoneLayout={<Text>Phone Layout</Text>}
        tabletLayout={<Text>Tablet Layout</Text>}
        desktopLayout={<Text>Desktop Layout</Text>}
        unitTest={{ phone: true }}
      />,
    );

    expect(screen.getByText("Phone Layout")).toBeTruthy();
  });

  test("renders tablet layout when width is between PHONE_WIDTH_BREAKPOINT and TABLET_WIDTH_BREAKPOINT", () => {
    render(
      <LayoutManager
        phoneLayout={<Text>Phone Layout</Text>}
        tabletLayout={<Text>Tablet Layout</Text>}
        desktopLayout={<Text>Desktop Layout</Text>}
        unitTest={{ tablet: true }}
      />,
    );
    expect(screen.getByText("Tablet Layout")).toBeTruthy();
  });

  test("renders desktop layout when width is greater than TABLET_WIDTH_BREAKPOINT", () => {
    render(
      <LayoutManager
        phoneLayout={<Text>Phone Layout</Text>}
        tabletLayout={<Text>Tablet Layout</Text>}
        desktopLayout={<Text>Desktop Layout</Text>}
        unitTest={{ desktop: true }}
      />,
    );

    expect(screen.getByText("Desktop Layout")).toBeTruthy();
  });
});
