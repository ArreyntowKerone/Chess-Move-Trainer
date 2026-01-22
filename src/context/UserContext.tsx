import { createContext, useContext, useState, type ReactNode } from 'react';

interface UserContextType {
  name: string;
  elo: number;
  selectedMaster: { name: string; title: string; src: string } | null;
  setUserData: (name: string, elo: number, master?: { name: string; title: string; src: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('');
  const [elo, setElo] = useState(100);
  const [selectedMaster, setSelectedMaster] = useState<{ name: string; title: string; src: string } | null>(null);

  const setUserData = (newName: string, newElo: number, master?: { name: string; title: string; src: string }) => {
    setName(newName);
    setElo(newElo);
    if (master) setSelectedMaster(master);
  };

  return (
    <UserContext.Provider value={{ name, elo, selectedMaster, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}