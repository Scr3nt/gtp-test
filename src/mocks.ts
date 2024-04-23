jest.mock("expo-font");
jest.mock("expo-asset");
jest.mock("react-native-reanimated", () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Reanimated;
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("@gorhom/bottom-sheet", () => ({
  __esModule: true,
  ...require("@gorhom/bottom-sheet/mock"),
}));
