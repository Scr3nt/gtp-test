import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user?.id) {
        setUser(data.user);
      }
    };

    getUser().catch((e) => console.error(e));
  }, []);

  return user;
}
