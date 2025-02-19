import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { SiSemanticscholar } from 'react-icons/si';
import Swal from 'sweetalert2';


const NavBarD = () => {
  const { user, logOut } = useAuth();

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

  return (
    <div className="navbar sticky top-0 z-50 px-5 lg:px-10 justify-between bg-gradient-to-r from-teal-600 to-teal-300 shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl lg:text-2xl font-bold flex gap-2 justify-center items-center">
          <SiSemanticscholar /> EduSphere
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="hidden lg:flex items-center gap-2">
              <img src={user.photoURL} alt={user.displayName} className='w-10' />
              <div className='flex flex-col'>
              <span className="text-sm">{user.displayName}</span>
              <span className="text-sm">{user.metadata.creationTime}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-800 transition duration-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBarD;