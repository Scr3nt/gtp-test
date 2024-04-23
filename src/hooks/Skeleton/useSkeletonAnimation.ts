import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const useSkeletonAnimation = () => {
  const infiniteValue = useSharedValue(0);

  const startAnimation = () => {
    infiniteValue.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
      true,
    );
  };

  return { infiniteValue, startAnimation };
};
