import React, { useState } from "react";

export const AuthContext = React.createContext();
export default function LoginFlow({ children }) {
  const [isSignedUp, setIsSignedUp] = useState(false);
  return (
    <AuthContext.Provider value={{ isSignedUp, setIsSignedUp }}>
      {children}
    </AuthContext.Provider>
  );
}
