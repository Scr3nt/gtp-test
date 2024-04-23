import { ReactNode, useMemo } from "react";
import { useWindowDimensions } from "react-native";

import { PHONE_WIDTH_BREAKPOINT, TABLET_WIDTH_BREAKPOINT } from "@/src/const";

type Props = {
  phoneLayout: ReactNode;
  tabletLayout?: ReactNode;
  desktopLayout?: ReactNode;
  unitTest?: {
    phone?: boolean;
    tablet?: boolean;
    desktop?: boolean;
  };
};

export default function LayoutManager({
  phoneLayout,
  tabletLayout,
  desktopLayout,
  unitTest,
}: Props) {
  const { width } = useWindowDimensions();

  const isPhone = useMemo(() => width <= PHONE_WIDTH_BREAKPOINT, [width]);
  const isTablet = useMemo(
    () => width > PHONE_WIDTH_BREAKPOINT && width <= TABLET_WIDTH_BREAKPOINT,
    [width],
  );

  if (unitTest?.phone || unitTest?.tablet || unitTest?.desktop) {
    if (unitTest?.phone) {
      return <>{phoneLayout}</>;
    }
    if (unitTest?.tablet) {
      return <>{tabletLayout}</>;
    }
    if (unitTest?.desktop) {
      return <>{desktopLayout}</>;
    }
  }

  if (isPhone && phoneLayout) {
    return <>{phoneLayout}</>;
  }

  if (isTablet && tabletLayout) {
    return <>{tabletLayout}</>;
  }

  if (desktopLayout) {
    return <>{desktopLayout}</>;
  }

  return <></>;
}
