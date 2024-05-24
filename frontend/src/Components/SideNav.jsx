import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="bg-gray-700 text-white w-64 min-h-screen p-4">
      <ul>
        <li className="mb-4">
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/items"
            className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
          >
            Items
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
