import { render, screen } from "@testing-library/react-native";

import Avatar from "../Avatar";

describe("Avatar", () => {
  it("should render initials when no source is provided", () => {
    render(<Avatar initials="RN" />);

    expect(screen.getByText("RN")).toBeTruthy();
  });

  it("should render default image when no source is provided", () => {
    render(<Avatar />);

    expect(screen.getByTestId("default")).toBeTruthy();
  });

  it("should render image when source is provided", () => {
    render(
      <Avatar
        testID="image"
        source={{ uri: "https://source.unsplash.com/random/?portrait" }}
      />,
    );

    expect(screen.getByTestId("image")).toBeTruthy();
  });

  it("should render avatar with size", () => {
    render(
      <Avatar
        testID="image"
        source={{ uri: "https://source.unsplash.com/random/?portrait" }}
        size={100}
      />,
    );

    expect(screen.getByTestId("image")).toBeTruthy();
  });
});
