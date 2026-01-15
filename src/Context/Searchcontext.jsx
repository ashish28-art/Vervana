import { createContext, useState, useMemo, useCallback } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [text, setText] = useState("");

  const handleSetText = useCallback((value) => {
    setText(value);
  }, []);

  const value = useMemo(() => ({
    text,
    setText: handleSetText
  }), [text, handleSetText]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
