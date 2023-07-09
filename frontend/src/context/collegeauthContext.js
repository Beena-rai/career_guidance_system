import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
const CollegeAuthContext = createContext();

const CollegeAuthProvider = ({ children }) => {
  const [collegeAuth, setCollegeAuth] = useState({
    college: null,
    token: "",
  });

   //default axios
  axios.defaults.headers.common["Authorization"] = collegeAuth?.token;
  // console.log(auth.token);

  useEffect(() => {
    const data = localStorage.getItem("collegeAuth");
    if (data) {
      const parseData = JSON.parse(data);
      // console.log(parseData);
      setCollegeAuth({
        ...collegeAuth,
        college: parseData.college,
        token: parseData.data,
      });
    }
     //eslint-disable-next-line
  }, []);
  
  return (
    <CollegeAuthContext.Provider value={[collegeAuth, setCollegeAuth]}>
      {children}
    </CollegeAuthContext.Provider>
  );
};

// custom hook
const useCollegeAuth = () => useContext(CollegeAuthContext);

export { useCollegeAuth, CollegeAuthProvider };