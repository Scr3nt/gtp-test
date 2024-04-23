import { render, screen } from "@testing-library/react-native";

import Text from "../../Text/Text";
import { State } from "../StateManager";

describe("StateManager", () => {
  it("renders the loading child when isLoading is true", () => {
    render(
      <State.Manager isLoading={true} isError={false} isEmpty={false}>
        <State.Loading>
          <Text>Loading...</Text>
        </State.Loading>
      </State.Manager>,
    );

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("renders the error child when isError is true", () => {
    render(
      <State.Manager isLoading={false} isError={true} isEmpty={false}>
        <State.Error>
          <Text>Error occurred!</Text>
        </State.Error>
      </State.Manager>,
    );

    expect(screen.getByText("Error occurred!")).toBeTruthy();
  });

  it("renders the empty child when isEmpty is true", () => {
    render(
      <State.Manager isLoading={false} isError={false} isEmpty={true}>
        <State.Empty>
          <Text>No data available.</Text>
        </State.Empty>
      </State.Manager>,
    );

    expect(screen.getByText("No data available.")).toBeTruthy();
  });

  it("renders the success child when isSuccess is true", () => {
    render(
      <State.Manager
        isLoading={false}
        isError={false}
        isEmpty={false}
        isSuccess={true}
      >
        <State.Success>
          <Text>Success!</Text>
        </State.Success>
      </State.Manager>,
    );

    expect(screen.getByText("Success!")).toBeTruthy();
  });

  it("renders null when none of the conditions are met", () => {
    render(
      <State.Manager
        isLoading={false}
        isError={false}
        isEmpty={false}
        isSuccess={false}
      >
        <State.Loading>Loading...</State.Loading>
        <State.Empty>No data available.</State.Empty>
      </State.Manager>,
    );

    expect(screen.queryByText("Loading...")).toBeNull();
    expect(screen.queryByText("No data available.")).toBeNull();
  });
});
