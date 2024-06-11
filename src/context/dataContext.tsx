import { User } from "../utils/common/person";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";

type DataContextType = {
  loading: boolean;
  result: User | null;
  error: string | null;
  fetchData: (person: string) => void;
};

const initialContext = {
  loading: false,
  result: null,
  error: null,
  fetchData: () => {},
};

const DataContext = createContext<DataContextType>(initialContext);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

interface MyContextProviderProps {
  children: ReactNode;
  // Add any additional props if needed
}

const fetchData = async (person: string) => {
  try {
    const response = await fetch(`/api/person?person=${person}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching user data: ${error.message}`);
    throw error.message || "something went wrong";
  }
};

export const DataContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const memoizedFetchData = useCallback(
    (person: string) => {
      setLoading(true);
      setResult(null);
      setError(null);
      fetchData(person)
        .then((data) => setResult(data))
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setLoading, setResult, setError],
  );

  const value = {
    loading,
    result,
    error,
    fetchData: memoizedFetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
