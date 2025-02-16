import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaCheck,
  FaTimes,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaEye,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const AllClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: allclasses,
    isLoading,
    error = [],
  } = useQuery({
    queryKey: ["allclassesadmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allclasses/admin");
      setClasses(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  if (isLoading) return <Loading></Loading>;

  if (error)
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching classes
      </div>
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClasses = classes.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(classes.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleAccept = async (id) => {
    try {
      const response = await axiosSecure.patch(`/allclasses/accept/${id}`);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Accepted!",
          text: "The class has been accepted.",
          confirmButtonColor: "#4CAF50",
        });
        setClasses(
          classes.map((cls) =>
            cls._id === id ? { ...cls, status: "accepted" } : cls
          )
        );
      }
    } catch (error) {
      console.error("Error accepting class:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to accept the class.",
        confirmButtonColor: "#F44336",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axiosSecure.patch(`/allclasses/reject/${id}`);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "The class has been rejected.",
          confirmButtonColor: "#2196F3",
        });
        setClasses(
          classes.map((cls) =>
            cls._id === id ? { ...cls, status: "rejected" } : cls
          )
        );
      }
    } catch (error) {
      console.error("Error rejecting class:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to reject the class.",
        confirmButtonColor: "#F44336",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | All Classes List</title>
      </Helmet>
      <h3
        className="text-2xl font-bold text-center mb-6 text-blue-600"
        data-aos="fade-up"
      >
        All Classes List
      </h3>
      <div className="flex justify-end mb-4" data-aos="fade-up">
        <label className="mr-2">Items per page:</label>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr
              className="bg-gray-100 text-gray-700 text-lg"
              data-aos="fade-up"
            >
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Accepted</th>
              <th className="border border-gray-300 px-4 py-2">Rejected</th>
              <th className="border border-gray-300 px-4 py-2">Pogress</th>
            </tr>
          </thead>
          <tbody>
            {currentClasses.map((cls) => (
              <tr
                key={cls._id}
                className="text-center hover:bg-gray-50"
                data-aos="fade-up"
              >
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-20 h-20 object-cover mx-auto rounded-lg"
                    data-aos="zoom-in"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {cls.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${cls.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {cls.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">{cls.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {cls.email}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    cls.status === "accepted"
                      ? "text-green-600"
                      : cls.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {cls.status}
                </td>
                <td className="border border-gray-300">
                  <button
                    onClick={() => handleAccept(cls._id)}
                    className={`hover:scale-110 transition-transform ${
                      cls.status === "accepted"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {cls.status === "accepted" ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaRegCheckCircle size={20} />
                    )}
                  </button>
                </td>
                <td className="border border-gray-300">
                  <button
                    onClick={() => handleReject(cls._id)}
                    className={`hover:scale-110 transition-transform ${
                      cls.status === "rejected"
                        ? "text-red-600"
                        : "text-gray-400"
                    }`}
                  >
                    {cls.status === "rejected" ? (
                      <FaTimes size={20} />
                    ) : (
                      <FaRegTimesCircle size={20} />
                    )}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {cls.status === "accepted" ? (
                    <Link to={`/dashboard/myclassdetails/${cls._id}`}>
                      <button className="btn btn-outline border-1 border-b-4">
                        Details
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn btn-outline border-1 border-b-4"
                    >
                      <FaEye />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4" data-aos="fade-up">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {Math.ceil(classes.length / itemsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(classes.length / itemsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClassesList;
