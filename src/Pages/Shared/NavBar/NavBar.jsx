import { Link, NavLink } from "react-router-dom";
import { FaHome, FaUserCircle, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineClass, MdMenu } from "react-icons/md";
import ThemeToggleButton from "../../../components/ThemeToggleButton";
import { useContext, useState } from "react";
import { SiSemanticscholar } from "react-icons/si";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              "Logged Out!",
              "You have been logged out successfully.",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "Something went wrong. Please try again.",
              "error"
            );
          });
      }
    });
  };

  const dropdownLinks = (
    <>
      {user && user.email ? (
        <p className="text-center">{user.displayName}</p>
      ) : (
        <p className="text-center">Guest</p>
      )}
      <li className="text-gray-700 font-bold">
        <NavLink to="/dashboard">
          <FaChalkboardTeacher />
          Dashboard
        </NavLink>
      </li>
      <li className="text-gray-700 font-bold">
        <button onClick={handleLogout} className="w-full text-left">
          Logout
        </button>
      </li>
      <li>
        <ThemeToggleButton />
      </li>
    </>
  );

  const mainLinks = (
    <>
      <li className="text-gray-700 font-bold">
        <NavLink to="/">
          <FaHome />
          Home
        </NavLink>
      </li>
      <li className="text-gray-700 font-bold">
        <NavLink to="/allclasses">
          <MdOutlineClass />
          All Classes
        </NavLink>
      </li>
      <li className="text-gray-700 font-bold">
        <NavLink to="/teachon">
          <FaChalkboardTeacher />
          Teach on EduSphere
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 lg:px-10 justify-between">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-xl lg:text-2xl font-bold flex gap-2 justify-center items-center"
        >
          <SiSemanticscholar /> EduSphere
        </Link>
        <div className="lg:hidden ml-4">
          <button className="text-2xl m-2 z-50" onClick={handleDropdownToggle}>
            <MdMenu />
          </button>
          {isDropdownOpen && (
            <ul className="menu menu-vertical p-2 shadow bg-base-100 rounded-box mt-2 w-52">
              {mainLinks}
            </ul>
          )}
        </div>
      </div>

      <div
        className={`lg:flex ${
          isMenuOpen ? "block" : "hidden"
        } lg:items-center lg:space-x-4`}
      >
        <ul className="menu menu-horizontal px-1 lg:flex lg:space-x-4">
          {mainLinks}
        </ul>
      </div>

      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} w-full`}>
        <ul className="menu menu-vertical bg-base-100 p-2 space-y-2">
          {mainLinks}
        </ul>
      </div>

      <div className="gap-5 pr-4 flex items-center">
        {user && user.email ? (
          <div className="dropdown dropdown-end z-50">
            <label
              tabIndex={0}
              className="tooltip tooltip-bottom cursor-pointer"
              data-tip={user?.displayName || "Guest"}
            >
              {user && user.email ? (
                <img
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 bg-slate-500 rounded-full"
                  src={user?.photoURL}
                  alt="User Photo"
                />
              ) : (
                <FaUserCircle className="w-10 h-10" />
              )}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {dropdownLinks}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-2">
            <Link
              className="bg-gray-700 text-white p-1 lg:p-2 text-center rounded"
              to="/auth/signin"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
