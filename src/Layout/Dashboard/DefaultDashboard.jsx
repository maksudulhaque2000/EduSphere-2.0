import React from "react";
import { FaSmileBeam } from "react-icons/fa";
import { motion } from "framer-motion";

const DefaultDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.div
        className="text-center p-8 bg-white rounded-lg shadow-lg max-w-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          <FaSmileBeam size={64} className="text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-lg text-gray-700">
          Whether you are a{" "}
          <span className="font-semibold text-blue-600">Student</span>, a{" "}
          <span className="font-semibold text-purple-600">Teacher</span>, or an{" "}
          <span className="font-semibold text-green-600">Admin</span>, we are
          thrilled to have you here!
        </p>
        <p className="mt-4 text-gray-600">
          Explore the features tailored just for you, stay updated with the
          latest, and enjoy a seamless experience. Let's make great things
          happen together!
        </p>
      </motion.div>
    </div>
  );
};

export default DefaultDashboard;
