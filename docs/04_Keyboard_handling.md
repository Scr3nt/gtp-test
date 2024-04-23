# Keyboard handling

The library used is: [react-native-avoid-softinput](https://mateusz1913.github.io/react-native-avoid-softinput/)

For usage, add this to each screen where keyboard usage is necessary:

```typescript
 import { AvoidSoftInput } from "react-native-avoid-softinput";

 ...

   const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);
```
