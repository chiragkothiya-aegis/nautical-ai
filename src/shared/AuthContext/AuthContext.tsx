import React, { useCallback, useState } from "react";

let AUTH_TOKEN: any = null;

interface AuthContextProps {
  apiCreds: any | undefined;
  isAuth: boolean;
  updateAPICreds: (authToken: any | null) => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  apiCreds: undefined,
  isAuth: false,
  updateAPICreds: () => {},
});

function AuthProvider({ children }: any) {
  const [apiCreds, setApiCreds] = useState(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : undefined;
  });

  const updateAPICreds = useCallback((pAuthToken: any) => {
    if (pAuthToken.payload) {
      localStorage.setItem("user", JSON.stringify(pAuthToken.payload));
    } else {
      localStorage.removeItem("user");
    }
    AUTH_TOKEN = pAuthToken.payload;
    setApiCreds(pAuthToken.payload);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        apiCreds,
        updateAPICreds,
        isAuth: !!apiCreds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
