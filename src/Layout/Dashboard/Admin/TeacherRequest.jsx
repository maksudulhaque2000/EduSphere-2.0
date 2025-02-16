import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaCheck,
  FaCheckCircle,
  FaTimes,
  FaTimesCircle,
  FaArrowLeft,
  FaArrowRight,
  FaEye,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Loading from "../../../components/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    refetch,
    data: teachOnRequest = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teachOnRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachonrequest");
      return res.data;
    },
  });

  useEffect(() => {
    AOS.init();
  }, []);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching Data.
      </div>
    );
  }

  const totalPages = Math.ceil(teachOnRequest.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teachOnRequest.slice(indexOfFirstItem, indexOfLastItem);

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/teachonrequest/acceptteacher/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Approved!", "The request has been approved.", "success");
          }
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/teachonrequest/rejectteacher/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Rejected!", "The request has been rejected.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | Teachers Request</title>
      </Helmet>
      <h3 className="text-xl font-bold mb-4" data-aos="fade-up">
        Teacher Request: {teachOnRequest.length}
      </h3>

      {teachOnRequest.length === 0 ? (
        <p className="text-gray-500 text-center">No teacher requests found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Photo</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Experience
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Approved</th>
                  <th className="border border-gray-300 px-4 py-2">Reject</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((request) => (
                  <tr
                    key={request._id}
                    className="hover:bg-gray-50"
                    data-aos="fade-up"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <img
                        src={request.photoURL}
                        alt={request.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.experience}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 font-bold ${
                        request.role === "pending"
                          ? "text-yellow-500"
                          : request.role === "rejected"
                          ? "text-red-500"
                          : request.role === "teacher"
                          ? "text-green-500"
                          : "text-gray-800"
                      }`}
                    >
                      {request.role}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className={`text-green-500 hover:text-green-600 text-lg ${
                          request.role === "rejected" ||
                          request.role === "teacher"
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handleApprove(request._id)}
                        disabled={
                          request.role === "rejected" ||
                          request.role === "teacher"
                        }
                      >
                        {request.role === "teacher" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaCheck />
                        )}
                      </button>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className={`text-red-500 hover:text-red-600 text-lg ${
                          request.role === "rejected"
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handleReject(request._id)}
                        disabled={request.role === "rejected"}
                      >
                        {request.role === "rejected" ? (
                          <FaTimesCircle />
                        ) : (
                          <FaTimes />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              <FaArrowLeft /> Previous
            </button>
            <div className="flex items-center gap-3 my-2 md:my-0">
              <label htmlFor="itemsPerPage" className="mr-2 font-semibold">
                Teacher Request per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded ${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherRequest;
