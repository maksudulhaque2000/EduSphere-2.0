import React from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const classData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
    };

    axiosSecure.post("/allclasses", classData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Successful",
          text: "Your Class has been Added successfully!",
        });
        navigate("/dashboard/myclass");
        reset({
          title: "",
          price: "",
          description: "",
          image: "",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | Add Class</title>
      </Helmet>
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-xl">
        <h3 className="text-4xl font-bold mb-6 text-center text-purple-600">
          Add Class
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-lg"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user?.email || ""}
              readOnly
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-lg"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-lg font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              {...register("price", { required: "Price is required", min: 1 })}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-lg"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-lg"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              id="image"
              type="url"
              {...register("image", { required: "Image URL is required" })}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-lg"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-lg font-medium text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <FiSend className="mr-2" /> Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
