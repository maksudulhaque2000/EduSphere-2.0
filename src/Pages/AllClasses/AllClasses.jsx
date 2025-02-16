import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
  FaUserTie,
  FaEnvelope,
  FaDollarSign,
  FaUsers,
  FaSort,
  FaSearch,
} from "react-icons/fa";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();

  const [searchTerm, setSearchTerm] = useState("");

  const [isAscending, setIsAscending] = useState(true);

  const {
    data: classes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["publicClasseslist"],
    queryFn: async () => {
      const response = await axiosPublic.get("/publicclasses");
      return response.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  if (error)
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching classes
      </div>
    );

  const filteredClasses = classes.filter((classItem) =>
    classItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClasses = [...filteredClasses].sort((a, b) => {
    return isAscending ? a.price - b.price : b.price - a.price;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | All Classes</title>
      </Helmet>
      <h3 className="text-center text-gray-800 text-3xl mb-8">All Classes</h3>

      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center w-3/4 ">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          </div>
        </div>

        <button
          onClick={() => setIsAscending(!isAscending)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaSort />
          Sort by Price ({isAscending ? "Ascending" : "Descending"})
        </button>
      </div>

      <div className="flex flex-wrap gap-8 justify-center">
        {sortedClasses.length > 0 ? (
          sortedClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="w-80 bg-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h4 className="text-blue-600 text-2xl font-semibold mb-3">
                  {classItem.title || "N/A"}
                </h4>
                <p className="text-gray-600 text-lg mb-4">
                  {classItem.description || "N/A"}
                </p>
                <p className="text-blue-500 font-bold text-xl mb-3">
                  <FaDollarSign className="inline-block mr-2" />
                  {classItem.price || "N/A"}
                </p>
                <p className="text-gray-600 text-lg mb-3">
                  <FaUserTie className="inline-block mr-2 text-blue-500" />
                  {classItem.name || "N/A"}
                </p>
                <p className="text-gray-600 text-lg mb-5">
                  <FaEnvelope className="inline-block mr-2 text-blue-500" />
                  {classItem.email || "N/A"}
                </p>
                <p className="text-gray-600 text-lg mb-5">
                  <FaUsers className="inline-block mr-2 text-blue-500" />
                  {classItem.enrollCount || 0}
                </p>
                <Link to={`/allclasses/${classItem._id}`}>
                  <button className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    Enroll
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No classes found</p>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
