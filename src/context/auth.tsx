import { router, useRootNavigationState, useSegments } from "expo-router";
import { ReactNode, createContext, useEffect } from "react";

import { supabase } from "../lib/supabase";

type Props = {
  children?: ReactNode;
};

const AuthContext = createContext(null);

// This hook will protect the route access based on user authentication.
function useProtectedRoute() {
  const segments = useSegments();

  const rootNavigation = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigation?.key) {
      return;
    }
    const inAuthGroup = segments[0] === "(auth)";
    const inLoadingGroup = segments.length === 0;

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session && (inAuthGroup || inLoadingGroup)) {
          router.replace("/home");
        }
        if (!session && (!inAuthGroup || inLoadingGroup)) {
          router.replace("/login");
        }
      })
      .catch((e) => console.error(e));

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session && (inAuthGroup || inLoadingGroup)) {
        router.replace("/home");
      }
      if (!session && (!inAuthGroup || inLoadingGroup)) {
        router.replace("/login");
      }
    });
  }, [segments, rootNavigation?.key]);
}

export function AuthProvider(props: Props) {
  useProtectedRoute();

  return (
    <AuthContext.Provider value={null}>{props.children}</AuthContext.Provider>
  );
}
