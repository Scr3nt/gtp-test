import { render, screen } from "@testing-library/react-native";

import Text from "../Text";

describe("Text", () => {
  it("render base text", () => {
    render(<Text> Text </Text>);
    screen.getByText("Text");
  });

  it("render text with type thin", () => {
    render(<Text type="thin"> TextThin </Text>);
    screen.getByText("TextThin");
  });

  it("render text with type extra-light", () => {
    render(<Text type="extra-light"> TextExtraLight </Text>);
    screen.getByText("TextExtraLight");
  });

  it("render text with type light", () => {
    render(<Text type="light"> TextLight </Text>);
    screen.getByText("TextLight");
  });

  it("render text with type regular", () => {
    render(<Text type="regular"> TextRegular </Text>);
    screen.getByText("TextRegular");
  });

  it("render text with type medium", () => {
    render(<Text type="medium"> TextMedium </Text>);
    screen.getByText("TextMedium");
  });

  it("render text with type semi-bold", () => {
    render(<Text type="semi-bold"> TextSemiBold </Text>);
    screen.getByText("TextSemiBold");
  });

  it("render text with type bold", () => {
    render(<Text type="bold"> TextBold </Text>);
    screen.getByText("TextBold");
  });

  it("render text with type extra-bold", () => {
    render(<Text type="extra-bold"> TextExtraBold </Text>);
    screen.getByText("TextExtraBold");
  });

  it("render text with type black", () => {
    render(<Text type="black"> TextBlack </Text>);
    screen.getByText("TextBlack");
  });

  it("render text with preset title01", () => {
    render(<Text preset="title01"> TextTitle01 </Text>);
    screen.getByText("TextTitle01");
  });

  it("render text with preset title02", () => {
    render(<Text preset="title02"> TextTitle02 </Text>);
    screen.getByText("TextTitle02");
  });

  it("render text with preset title03", () => {
    render(<Text preset="title03"> TextTitle03 </Text>);
    screen.getByText("TextTitle03");
  });

  it("render text with preset subtitle", () => {
    render(<Text preset="subtitle"> TextSubtitle </Text>);
    screen.getByText("TextSubtitle");
  });

  it("render text with preset body", () => {
    render(<Text preset="body"> TextBody </Text>);
    screen.getByText("TextBody");
  });

  it("render text with preset caption", () => {
    render(<Text preset="caption"> TextCaption </Text>);
    screen.getByText("TextCaption");
  });
});
