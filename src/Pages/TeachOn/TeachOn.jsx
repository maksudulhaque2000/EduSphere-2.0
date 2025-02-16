import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet";

const TeachOn = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
      experience: "beginner",
      title: "",
      category: "web-development",
    },
  });

  const {
    refetch,
    data: teachOnRequest = [],
    isLoading,
  } = useQuery({
    queryKey: ["teachOnRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachonrequest");
      return res.data;
    },
  });

  const matchingTeachOnRequests = teachOnRequest.find(
    (request) => request.email === user?.email
  );

  useEffect(() => {
    if (matchingTeachOnRequests) {
      setValue("name", matchingTeachOnRequests.name);
      setValue("email", matchingTeachOnRequests.email);
      setValue("photoURL", matchingTeachOnRequests.photoURL);
      setValue("experience", matchingTeachOnRequests.experience);
      setValue("title", matchingTeachOnRequests.title);
      setValue("category", matchingTeachOnRequests.category);
    }
  }, [matchingTeachOnRequests, setValue]);

  const onSubmit = (data) => {
    const teachOnInfo = {
      ...data,
      role: "pending",
    };

    axiosSecure.post("/teachonrequest", teachOnInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Successful",
          text: "Your Request has been created successfully!",
        });
        refetch();
        navigate("/");
      }
    });
  };

  const handleUpdate = (id) => {
    axiosSecure.patch(`/teachonrequest/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Approved!", "The request has been approved.", "success");
        refetch();
        navigate("/");
      }
    });
  };

  const userHasRoleTeacher = teachOnRequest.some(
    (request) => request.email === user?.email && request.role === "teacher"
  );

  const userHasRoleRejected = teachOnRequest.some(
    (request) => request.email === user?.email && request.role === "rejected"
  );

  const userHasRolePending = teachOnRequest.some(
    (request) => request.email === user?.email && request.role === "pending"
  );

  if (userHasRoleTeacher) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <Helmet>
          <meta charSet="utf-8" />
          <title>EduSphere | Teach on EduSphere</title>
        </Helmet>
        <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded-lg shadow-2xl border border-blue-200">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
            You are already approved as a Teacher!
          </h2>
          <p className="text-lg text-gray-600 text-center">
            Thank you for applying to be a teacher. You have already been
            approved and can start teaching now. 🎉
          </p>
        </div>
      </div>
    );
  }

  if (userHasRolePending) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <div className="max-w-4xl w-full mx-auto p-8 bg-white rounded-lg shadow-2xl border border-blue-200">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
            Your application is pending approval!
          </h2>
          <p className="text-lg text-gray-600 text-center">
            You have already applied, and your application is currently pending.
            If the admin finds you eligible, your application will be accepted
            or rejected. Thank you for your patience and support.🎉
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        Apply for a Teaching Position
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="photoURL"
            className="block text-sm font-semibold text-gray-700"
          >
            Photo
          </label>
          <img
            src={user?.photoURL}
            alt="User"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <input type="hidden" {...register("photoURL")} />
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            readOnly
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="experience"
            className="block text-sm font-semibold text-gray-700"
          >
            Experience Level
          </label>
          <select
            id="experience"
            {...register("experience")}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            placeholder="Enter a title"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="web-development">Web Development</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="data-analysis">Data Analysis</option>
            <option value="content-writing">Content Writing</option>
          </select>
        </div>

        <div className="text-center">
          {userHasRoleRejected ? (
            ""
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit for Review
            </button>
          )}
        </div>
      </form>

      <div className="text-center">
        {userHasRoleRejected ? (
          <button
            type="button"
            onClick={() => handleUpdate(matchingTeachOnRequests._id)}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Request to Another
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TeachOn;
