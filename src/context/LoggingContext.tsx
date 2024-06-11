import React, { createContext, useState, useContext, ReactNode } from "react";

type LogContextType = {
  enableLogs: boolean;
  toggleLogs: () => void;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export const useLogContext = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogContext must be used within a LogProvider");
  }
  return context;
};

interface LogProviderProps {
  children: ReactNode;
  // Add any additional props if needed
}

export const LogProvider: React.FC<LogProviderProps> = ({ children }) => {
  const [enableLogs, setEnableLogs] = useState(false);

  const toggleLogs = () => {
    setEnableLogs((prevState) => !prevState);
  };

  return (
    <LogContext.Provider value={{ enableLogs, toggleLogs }}>
      {children}
    </LogContext.Provider>
  );
};
