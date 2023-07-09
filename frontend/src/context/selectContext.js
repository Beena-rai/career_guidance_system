import { useState, useContext, createContext, useEffect } from "react";

const SelectContext = createContext();
const SelectProvider = ({ children }) => {
  const [select, setSelect] = useState([]);

  useEffect(() => {
    let existingSelectItem = localStorage.getItem("select");
    if (existingSelectItem) setSelect(JSON.parse(existingSelectItem));
  }, []);

  return (
    <SelectContext.Provider value={[select, setSelect]}>
      {children}
    </SelectContext.Provider>
  );
};

// custom hook
const useSelect = () => useContext(SelectContext);

export { useSelect, SelectProvider };