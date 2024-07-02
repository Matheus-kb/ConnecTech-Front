"use client";

// _context/userContext.tsx
import { createContext, useState, ReactNode, useContext } from "react";

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar o contexto do usuário
const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
