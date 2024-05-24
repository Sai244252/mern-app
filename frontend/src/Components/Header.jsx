import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/users";
import { logout } from "../redux/features/auth/authSlice";
import logo from "../assets/logo.JPG";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch(logout);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-6 flex justify-between items-center">
      <div className="text-xl font-bold">
        <img src={logo} className="w-12 h-8 mx-auto rounded" alt="Logo" />
      </div>
      <div className="space-x-4">
        {userInfo ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p style={{ paddingRight: "10px" }}>Hi {userInfo?.username}</p>
            <p onClick={logoutHandler} className="cursor-pointer">
              Logout
            </p>
          </div>
        ) : (
          <NavLink
            to="/login/"
            className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
          >
            Login
          </NavLink>
        )}
        {!userInfo && (
          <NavLink
            to="/register/"
            className={({ isActive }) => (isActive ? "text-yellow-500" : "")}
          >
            Register
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
