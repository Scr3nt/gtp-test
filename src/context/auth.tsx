import { router, useRootNavigationState, useSegments } from "expo-router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { storage } from "../const";
import { storageKeys } from "../storageKeys";

type Props = {
  children?: ReactNode;
};

type AuthContextType = {
  user: unknown;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: unknown) {
  const segments = useSegments();

  const rootNavigation = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigation?.key) {
      return;
    }
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments, rootNavigation?.key]);
}

export function AuthProvider(props: Props) {
  const [user, setUser] = useState<unknown>(
    storage.getString(storageKeys.ISLOGGED),
  );

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          storage.set(storageKeys.ISLOGGED, "true");
          setUser("true");
        },
        signOut: () => {
          storage.delete(storageKeys.ISLOGGED);
          setUser(null);
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
