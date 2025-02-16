import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const {
    refetch,
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching Data.
      </div>
    );
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/users/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
        } catch (error) {
          console.error("Error removing item:", error);
        }
      }
    });
  };

  const handleMakeAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.patch(`/users/admin/${id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire("Admin!", "Your user has been Admin.", "success");
            }
          });
        } catch (error) {
          console.error("Error make admin user:", error);
        }
      }
    });
  };

  return (
    <div className="p-5 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | All Users</title>
      </Helmet>
      <div className="flex justify-between items-center my-4">
        <h3 className="text-2xl font-bold text-purple-700">All Users</h3>
        <h3 className="text-xl font-bold text-blue-600">
          Total Users: {users.length}
        </h3>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <motion.table
          className="table-auto w-full border-collapse border border-gray-300 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <thead>
            <tr className="bg-gradient-to-r from-purple-400 to-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Photo</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="hover:bg-gray-100 transition-all duration-300 ease-in-out"
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mx-auto border border-gray-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  {user.role === "admin" ? (
                    <span className="text-green-600">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="text-blue-500 hover:underline transition-all duration-300 ease-in-out"
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleRemove(user._id)}
                    className="text-red-500 hover:underline transition-all duration-300 ease-in-out"
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <div className="flex justify-between items-center my-4">
        <motion.button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded shadow-md hover:bg-purple-600 transition-all duration-300 ease-in-out ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          <FaArrowLeft /> Previous
        </motion.button>
        <div className="flex items-center gap-2">
          <label htmlFor="usersPerPage" className="font-semibold text-blue-600">
            Users per page:
          </label>
          <select
            id="usersPerPage"
            value={usersPerPage}
            onChange={(e) => setUsersPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 shadow-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <span className="self-center text-blue-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <motion.button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded shadow-md hover:bg-purple-600 transition-all duration-300 ease-in-out ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next <FaArrowRight />
        </motion.button>
      </div>
    </div>
  );
};

export default AllUsers;
