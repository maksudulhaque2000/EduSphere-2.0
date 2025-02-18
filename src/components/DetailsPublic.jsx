import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaBook,
  FaUser,
  FaEnvelope,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const DetailsPublic = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/publicclasses/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <motion.div
      className="my-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-full bg-teal-50 rounded-lg shadow-lg p-5"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-4xl font-bold text-center text-teal-600 my-5">
          Class Details
        </h3>
        <div className="flex items-center justify-center gap-10">
        {classData?.image && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <img
              src={classData.image}
              alt={classData.title}
              className="w-full h-96 rounded-lg shadow-md"
            />
          </motion.div>
        )}
        <div className="space-y-6">
          <motion.div
            className="flex items-center bg-teal-100 p-4 rounded-lg shadow-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaBook className="text-blue-600 text-2xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-teal-600">Title</h4>
              <p className="text-lg">{classData?.title || "No Title"}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center bg-teal-100 p-4 rounded-lg shadow-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaUser className="text-green-600 text-2xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-teal-600">
                Instructor Name
              </h4>
              <p className="text-lg">{classData?.name || "No Name"}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center bg-teal-100 p-4 rounded-lg shadow-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaEnvelope className="text-yellow-600 text-2xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-teal-600">
                Instructor Email
              </h4>
              <p className="text-lg">{classData?.email || "No Email"}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center bg-teal-100 p-4 rounded-lg shadow-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FaDollarSign className="text-purple-600 text-2xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-teal-600">Price</h4>
              <p className="text-lg">
                {classData?.price ? `$${classData.price}` : "No Price"}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center bg-teal-100 p-4 rounded-lg shadow-md"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <FaInfoCircle className="text-pink-600 text-2xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-teal-600">
                Description
              </h4>
              <p className="text-lg">
                {classData?.description || "No Description"}
              </p>
            </div>
          </motion.div>
        </div>
        </div>

        <Link
          state={{ classData }}
          className="my-5 flex justify-center"
          to={"/payment"}
        >
          <motion.button
            className="w-3/4 mx-auto py-3 bg-gradient-to-r from-teal-300 via-teal-500 to-teal-800 text-white text-lg font-bold rounded-lg hover:opacity-90 transform hover:scale-105 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.98 }}
          >
            Enroll Now
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default DetailsPublic;
