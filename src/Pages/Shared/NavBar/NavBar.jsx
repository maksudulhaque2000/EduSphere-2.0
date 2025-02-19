import { Link, NavLink } from "react-router-dom";
import { FaHome, FaUserCircle, FaChalkboardTeacher, FaBlog } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
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
      confirmButtonColor: "#00897B",
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
        <p className="text-center hidden">{user.displayName}</p>
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
        <NavLink to="/blog">
          <FaBlog />
          Blog
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
    <div className="navbar sticky top-0 z-50 px-5 lg:px-10 justify-between bg-gradient-to-r from-teal-100 to-teal-200 shadow-md">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-xl lg:text-2xl font-bold flex gap-2 justify-center items-center"
        >
          <SiSemanticscholar /> EduSphere
        </Link>
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
              <li className="text-gray-700 font-bold lg:hidden">
                <NavLink to="/">
                  <FaHome />
                  Home
                </NavLink>
              </li>
              <li className="text-gray-700 font-bold lg:hidden">
                <NavLink to="/allclasses">
                  <MdOutlineClass />
                  All Classes
                </NavLink>
              </li>
              <li className="text-gray-700 font-bold lg:hidden">
                <NavLink to="/teachon">
                  <FaChalkboardTeacher />
                  Teach on EduSphere
                </NavLink>
              </li>
              {dropdownLinks}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-2">
            <Link
              className="bg-teal-800 text-white p-1 lg:p-2 text-center rounded"
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
