import { createContext, use, useEffect, useState } from "react";

type AuthContext = {
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  remove: () => void;
  isLoading: boolean;
};

const LOCAL_STORAGE_KEY = "@refund";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserAPIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user)
    );
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:token`,
      JSON.stringify(data.token)
    );
    setSession(data);
  }

  function remove() {
    setSession(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

    window.location.assign("/");
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (user && token) {
      setSession({
        user: JSON.parse(user),
        token,
      });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        save,
        isLoading,
        remove,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => use(AuthContext);
