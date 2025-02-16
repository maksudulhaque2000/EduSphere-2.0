import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaPhone, FaUserTag } from "react-icons/fa";
import Loading from "../../../components/Loading";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AdminProfile = () => {
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/public");
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

  const currentUser = users.find((u) => u.email === user.email);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | Profile</title>
      </Helmet>
      <div className="w-full sm:w-3/4 md:max-w-2xl bg-white rounded-lg shadow-2xl p-8">
        {currentUser ? (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-purple-600 uppercase">
              {currentUser.role === "rejected"
                ? "Teacher Profile"
                : `${currentUser.role} Profile`}
            </h1>
            <div className="flex justify-center">
              <img
                src={currentUser.photo}
                alt="Profile Picture"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-purple-500 shadow-lg"
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 text-center">
                {currentUser.name || "N/A"}
              </h2>
            </div>
            <div className="flex justify-between px-10 flex-wrap">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-2xl text-blue-500" />
                <p className="text-lg text-gray-600">{currentUser.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-2xl text-green-500" />
                <p className="text-lg text-gray-600">
                  {currentUser.phone || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <FaUserTag className="text-2xl text-yellow-500" />
              <p className="text-lg text-gray-600 capitalize">
                Role: {currentUser.role || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xl text-center text-red-500">
            No user information found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
