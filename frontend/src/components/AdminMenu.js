import React from 'react'
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <NavLink
            to="/adminPanel/testmenu"
            className="list-group-item list-group-item-action"
          >
            Test
          </NavLink>
          <NavLink
            to="/adminPanel/admincollege"
            className="list-group-item list-group-item-action"
          >
            Colleges
          </NavLink>

          <NavLink
            to="/adminPanel/addcareer"
            className="list-group-item list-group-item-action"
          >
            Add Career
          </NavLink>
          <NavLink
            to="/adminPanel/displaycareer"
            className="list-group-item list-group-item-action"
          >
            Careers
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminMenu