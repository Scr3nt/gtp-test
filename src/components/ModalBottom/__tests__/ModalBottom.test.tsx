import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { fireEvent, render, screen } from "@testing-library/react-native";

import ModalBottomTestPage from "../ModalBottomTestPage";

describe("ModalBottom", () => {
  it("renders correctly", () => {
    render(
      <BottomSheetModalProvider>
        <ModalBottomTestPage />
      </BottomSheetModalProvider>,
    );

    expect(screen.getByText("Open modal bottom")).toBeTruthy();
    fireEvent.press(screen.getByText("Open modal bottom"));

    expect(screen.getByText("Modal with input at bottom")).toBeTruthy();
  });
});
