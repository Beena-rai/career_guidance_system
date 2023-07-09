import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const StudentMenu = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <NavLink
            to="/student/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/student/testanalysis"
            className="list-group-item list-group-item-action"
          >
            Test Analysis
          </NavLink>
          <NavLink
            to="/student/selectedcollege"
            className="list-group-item list-group-item-action"
          >
            Selected Colleges
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default StudentMenu