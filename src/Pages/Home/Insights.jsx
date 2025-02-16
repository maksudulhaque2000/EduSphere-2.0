import React, { useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import Loading from "../../components/Loading";
import sidpicture from "../../assets/images/home/side2.jpg";

const Insights = () => {
  const axiosPublic = useAxiosPublic();

  const { data: users = [] } = useQuery({
    queryKey: ["usersPublic"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/public");
      return res.data;
    },
  });

  const {
    data: classes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["publicClassesCount"],
    queryFn: async () => {
      const response = await axiosPublic.get("/publicclasses");
      return response.data;
    },
  });

  refetch();
  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching Data.
      </div>
    );
  }

  const totalEnrollCount = classes
    .filter(
      (cls) =>
        typeof cls.enrollCount === "number" && !Number.isNaN(cls.enrollCount)
    )
    .reduce((total, cls) => total + cls.enrollCount, 0);

  return (
    <div className="px-6 py-8">
      <SectionTitle
        subTitle={"Discover EduSphere in Numbers"}
        heading={
          "Take a glance at the impact of EduSphere! See the total users, classes created, and student enrollments all in one place. These numbers reflect the growing community of passionate learners and dedicated educators who make EduSphere thrive every day."
        }
      />
      <div className="flex flex-col lg:flex-row items-center gap-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 flex-1">
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl" />
              <div>
                <p className="text-xl font-bold">Total Users</p>
                <p className="text-2xl">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-pink-400 to-yellow-500 text-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <FaChalkboardTeacher className="text-4xl" />
              <div>
                <p className="text-xl font-bold">Total Classes</p>
                <p className="text-2xl">{classes.length}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-400 to-indigo-600 text-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <FaUserGraduate className="text-4xl" />
              <div>
                <p className="text-xl font-bold">Total Enrollments</p>
                <p className="text-2xl">{totalEnrollCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <img
            src={sidpicture}
            alt="Company Illustration"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Insights;
