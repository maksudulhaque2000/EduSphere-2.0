import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaDollarSign,
  FaEdit,
  FaImage,
} from "react-icons/fa";

const UpdateClass = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myclass/${id}`);
      return res.data;
    },
  });

  const [classInfo, setClassInfo] = useState({
    title: "",
    name: "",
    email: "",
    price: "",
    description: "",
    image: "",
    status: "inactive",
  });

  useEffect(() => {
    if (classData) {
      setClassInfo({
        title: classData.title || "",
        name: classData.name || "",
        email: classData.email || "",
        price: classData.price || "",
        description: classData.description || "",
        image: classData.image || "",
        status: classData.status || "",
      });
    }
  }, [classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/allclasses/${id}`, classInfo);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "The data has been updated successfully.",
          confirmButtonColor: "#4CAF50",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes!",
          text: "No changes were made to the data.",
          confirmButtonColor: "#2196F3",
        });
      }
    } catch (error) {
      console.error("Error updating class:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update the data. Please try again.",
        confirmButtonColor: "#F44336",
      });
    }
  };

  if (isLoading)
    return <div className="text-center mt-10 text-blue-500">Loading...</div>;

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h3 className="text-4xl font-bold text-center text-purple-700 mb-10">
          <FaEdit className="inline-block text-blue-500 mr-2" /> Update Class
        </h3>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 space-y-6"
        >
          <div className="relative">
            <FaChalkboardTeacher className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              name="title"
              value={classInfo.title}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Class Title"
            />
          </div>
          <div className="relative">
            <FaChalkboardTeacher className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              name="name"
              value={classInfo.name}
              readOnly
              className="w-full pl-10 p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              placeholder="Instructor Name"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"
              name="email"
              value={classInfo.email}
              readOnly
              className="w-full pl-10 p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              placeholder="Instructor Email"
            />
          </div>
          <div className="relative">
            <FaDollarSign className="absolute left-3 top-3 text-blue-500" />
            <input
              type="number"
              name="price"
              value={classInfo.price}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Price"
            />
          </div>
          <div className="relative">
            <textarea
              name="description"
              value={classInfo.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Class Description"
            />
          </div>
          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-blue-500" />
            <input
              type="text"
              name="image"
              value={classInfo.image}
              onChange={handleChange}
              className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Image URL"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:opacity-90 transition-all"
          >
            Update Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
