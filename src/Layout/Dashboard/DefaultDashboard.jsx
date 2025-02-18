import React from "react";
import { FaChalkboardTeacher, FaEnvelope, FaLocationArrow, FaPhone, FaSmileBeam, FaUserGraduate, FaUsers, FaUserTag } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import SectionTitle from "../../components/SectionTitle";

const DefaultDashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: users = [], isLoading: isUsersLoading, error: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/public");
      return res.data;
    },
  });

  const { data: classes = [], isLoading: isClassesLoading, error: classesError } = useQuery({
    queryKey: ["publicClassesCount"],
    queryFn: async () => {
      const response = await axiosPublic.get("/publicclasses");
      return response.data;
    },
  });

  if (isUsersLoading || isClassesLoading) return <Loading />;
  if (usersError || classesError) {
    return <div className="text-center text-red-500 text-2xl">Error fetching Data.</div>;
  }

  const currentUser = users.find((u) => u.email === user.email);
  const totalEnrollCount = classes.reduce((total, cls) => total + (cls.enrollCount || 0), 0);

  const data = [
    { name: "Users", count: users.length },
    { name: "Classes", count: classes.length },
    { name: "Total Enrollments", count: totalEnrollCount },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-teal-200 flex flex-col items-center py-10">
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Overview</h1>
      </motion.div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-center">
        {/* Bar Chart */}
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Statistics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">User & Class Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 flex-1 w-full">
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-200 to-teal-600 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl" />
              <div>
                <p className="text-xl font-bold">Total Users</p>
                <p className="text-2xl">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-600 to-teal-200 text-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <FaChalkboardTeacher className="text-4xl" />
              <div>
                <p className="text-xl font-bold">Total Classes</p>
                <p className="text-2xl">{classes.length}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-200 to-teal-600 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <FaUserGraduate className="text-4xl" />
              <div>
                <p className="text-xl font-bold">Total Enrollments</p>
                <p className="text-2xl">{totalEnrollCount}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default DefaultDashboard;
