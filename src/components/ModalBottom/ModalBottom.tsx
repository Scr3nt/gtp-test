import {
  ForwardRefRenderFunction,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { useTheme } from "@/src/context/theme";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import ModalBottomBackdrop from "./ModalBottomBackdrop";

type ModalBottomProps = BottomSheetModalProps & {
  children: ReactNode;
};

const ModalBottom: ForwardRefRenderFunction<
  BottomSheetModalMethods,
  ModalBottomProps
> = (props, ref) => {
  const theme = useTheme();
  const onPressBackdrop = () => {
    const modalRef = ref as MutableRefObject<BottomSheetModalMethods>;
    modalRef?.current?.close();
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      enableDismissOnClose
      // eslint-disable-next-line react/no-unstable-nested-components
      backdropComponent={(backdropComponentProps) => (
        <ModalBottomBackdrop
          {...backdropComponentProps}
          onPressBackdrop={onPressBackdrop}
          isKeyboardVisible={isKeyboardVisible}
        />
      )}
      {...props}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.gray09 }}
    >
      <TouchableWithoutFeedback
        onPress={
          isKeyboardVisible
            ? Keyboard.dismiss
            : () => {
                null;
              }
        }
        style={styles.content}
      >
        {props.children}
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default forwardRef(ModalBottom);
