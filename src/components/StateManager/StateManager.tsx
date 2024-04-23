import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  isValidElement,
  useCallback,
  useMemo,
} from "react";

type ChildrenProps = {
  children: ReactNode;
};

type ChildType<T extends ChildrenProps = ChildrenProps> = FC<T>;

type Props = {
  isError: boolean;
  isLoading: boolean;
  isEmpty: boolean;
  isSuccess?: boolean;
  children:
    | ReactElement<ChildType<ChildrenProps>>
    | ReactElement<ChildType<ChildrenProps>>[];
};

function StateManager({
  isError,
  isLoading,
  isEmpty,
  isSuccess = true,
  children,
}: Props) {
  const searchChildrenOfType = useCallback(
    (componentType: ChildType) => {
      return Children.toArray(children).find(
        (child) => isValidElement(child) && child.type === componentType,
      ) as ReactElement<ChildType> | undefined;
    },
    [children],
  );

  const loadingChild = useMemo(
    () => searchChildrenOfType(State.Loading),
    [searchChildrenOfType],
  );
  const successChild = useMemo(
    () => searchChildrenOfType(State.Success),
    [searchChildrenOfType],
  );
  const emptyChild = useMemo(
    () => searchChildrenOfType(State.Empty),
    [searchChildrenOfType],
  );
  const errorChild = useMemo(
    () => searchChildrenOfType(State.Error),
    [searchChildrenOfType],
  );

  if (isLoading && loadingChild) {
    return <>{loadingChild}</>;
  }

  if (isError && errorChild) {
    return <>{errorChild}</>;
  }

  if (isEmpty && emptyChild) {
    return <>{emptyChild}</>;
  }

  if (isSuccess && successChild) {
    return <>{successChild}</>;
  }

  return null;
}

export const State = {
  Manager: StateManager,
  Loading: ({ children }: ChildrenProps) => <>{children}</>,
  Empty: ({ children }: ChildrenProps) => <>{children}</>,
  Success: ({ children }: ChildrenProps) => <>{children}</>,
  Error: ({ children }: ChildrenProps) => <>{children}</>,
};
