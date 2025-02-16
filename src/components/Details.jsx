import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUsers, FaTasks } from "react-icons/fa";
import Loading from "./Loading";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDeadline, setAssignmentDeadline] = useState(new Date());
  const [assignmentDescription, setAssignmentDescription] = useState("");

  const {
    data: classData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myclass/${id}`);
      return res.data;
    },
  });


  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const handleAddAssignment = async () => {
    const assignmentData = {
      title: assignmentTitle,
      deadline: assignmentDeadline,
      description: assignmentDescription,
      id: classData?._id,
      classTitle: classData?.title,
      classDescription: classData?.image,
    };

    try {
      const res = await axiosSecure.post("/assignments", assignmentData);
      if (res.status === 200) {
        toast.success("Assignment added successfully!");
        setIsModalOpen(false);
        setAssignmentTitle("");
        setAssignmentDeadline(new Date());
        setAssignmentDescription("");
        refetch();
      }
    } catch (error) {
      toast.error(`Failed to add assignment. Please try again. ${error}`);
    }
  };

  return (
    <div className="min-h-screen lg:p-10 flex flex-col items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <h3 className="text-4xl font-bold text-center text-blue-600">
          Class Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center bg-blue-50 p-6 rounded-lg shadow-md">
            <FaUsers className="text-yellow-800 text-3xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-blue-500">
                Total Enrollments
              </h4>
              <p className="text-lg">
                {classData?.enrollCount || "No Enrollments"}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-green-50 p-6 rounded-lg shadow-md">
            <FaTasks className="text-green-600 text-3xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-green-500">
                Total Assignments
              </h4>
              <p className="text-lg">
                {classData?.assignmentCount || "No Assignments"}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-purple-50 p-6 rounded-lg shadow-md">
            <FaTasks className="text-purple-600 text-3xl mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-purple-500">
                Assignment Submissions
              </h4>
              <p className="text-lg">
                {classData?.submissionCount || "No Submissions"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transform hover:scale-105 transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Create Assignment + 🚀
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-r flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-95 hover:scale-100">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-6">
              <h3 className="text-3xl font-bold text-center">
                🎯 Create Assignment
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  📘 Assignment Title
                </label>
                <input
                  type="text"
                  placeholder="Enter assignment title"
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-800">
                  ⏰ Assignment Deadline
                </label>
                <DatePicker
                  selected={assignmentDeadline}
                  onChange={(date) => setAssignmentDeadline(date)}
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-800">
                  📝 Assignment Description
                </label>
                <textarea
                  placeholder="Enter assignment description"
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
                  rows="4"
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-4 flex justify-end space-x-4">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transform transition duration-300"
                onClick={handleAddAssignment}
              >
                Add Assignment ✅
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
