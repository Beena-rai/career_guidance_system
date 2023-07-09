import { useState, useContext, createContext, useEffect } from "react";

const AddContext = createContext();
const AddProvider = ({ children }) => {
  const [add, setAdd] = useState([]);

  useEffect(() => {
    let existingAddItem = localStorage.getItem("add");
    if (existingAddItem) setAdd(JSON.parse(existingAddItem));
  }, []);

  return (
    <AddContext.Provider value={[add, setAdd]}>
      {children}
    </AddContext.Provider>
  );
};

// custom hook
const useAdd = () => useContext(AddContext);

export { useAdd, AddProvider };