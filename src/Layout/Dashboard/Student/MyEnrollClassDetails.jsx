import { useLocation } from "react-router-dom";
import { useState } from "react";
import Rating from "react-rating-stars-component";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Loading from "../../../components/Loading";

const MyEnrollClassDetails = () => {
  const location = useLocation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { classData } = location.state || {};

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [assignmentSubmission, setAssignmentSubmission] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackSubmit = () => {
    if (!description || !rating) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Input",
        text: "Please provide a description and a rating!",
      });
      return;
    }

    const feedbackData = {
      title: classData.title,
      description: description,
      rating: rating,
      FeedbackGiverName: user.displayName,
      FeedbackGiverImage: user.photoURL,
      mentorEmail: classData.email,
    };

    axiosSecure
      .post("/feedback", feedbackData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Request Successful",
            text: "Your feedback has been submitted successfully!",
          });
          setIsFeedbackModalOpen(false);
          setDescription("");
          setRating(0);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting your feedback. Please try again!",
        });
      });
  };

  const handleAssignmentSubmit = () => {
    if (!assignmentSubmission) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Input",
        text: "Please provide your assignment submission!",
      });
      return;
    }

    const submissionData = {
      id: classData.id,
      assignmentSubmission: assignmentSubmission,
      submittedBy: user.displayName,
      userEmail: user.email,
    };

    axiosSecure
      .post("/assignmentsubmission", submissionData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Submission Successful",
            text: "Your assignment has been submitted successfully!",
          });
          setIsSubmitModalOpen(false);
          setAssignmentSubmission("");
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting your assignment. Please try again!",
        });
      });
  };

  const {
    data: assignmentClasses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assignmentClasses", classData?.id],
    queryFn: async () => {
      if (!classData?.id) return [];
      const res = await axiosSecure.get(`/assignments/${classData.id}`);
      return res.data;
    },
    enabled: !!classData?.id,
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching Data.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | Enrolled Classes Details</title>
      </Helmet>
      <h3 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-md">
        My Enrolled Class Details
      </h3>
      {classData ? (
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-3xl mx-auto">
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold mb-10 py-2 px-4 rounded transition duration-300"
          >
            Teaching Evaluation Report (TER)
          </button>
          <img
            src={classData.image}
            alt={classData.title}
            className="w-full sm:w-2/4 mx-auto h-56 mb-4 rounded-xl shadow-2xl transition-transform transform hover:scale-105"
          />
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {classData.title}
          </h4>
          <p className="text-gray-600 mb-4">{classData.description}</p>
          <p className="text-gray-600 mb-4">
            Instructor: <span className="font-semibold">{classData.name}</span>{" "}
            ({classData.email})
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Class data not available.</p>
      )}

      {assignmentClasses.length > 0 ? (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 bg-indigo-100 rounded-md">
            <h4 className="text-lg font-bold text-gray-700">Assignments</h4>
            <p className="text-gray-600">
              Total Assignments: {assignmentClasses.length}
            </p>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Deadline</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignmentClasses.map((assignment) => (
                  <tr key={assignment._id} className="hover:bg-indigo-50">
                    <td className="py-2 px-4 border-b">{assignment.title}</td>
                    <td className="py-2 px-4 border-b">
                      {assignment.description}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => setIsSubmitModalOpen(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-300"
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h3 className="text-4xl text-center my-10 text-yellow-600">
          Currently, there are no assignments included in this course.
        </h3>
      )}

      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Submit Feedback
            </h4>
            <button
              onClick={() => setIsFeedbackModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="4"
                placeholder="Write your feedback here..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <Rating
                count={5}
                size={30}
                activeColor="#ffd700"
                value={rating}
                onChange={handleRatingChange}
              />
            </div>
            <button
              onClick={handleFeedbackSubmit}
              className="bg-indigo-600 text-white hover:bg-indigo-700 w-full mt-4 py-2 rounded-md"
            >
              Send Feedback
            </button>
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Submit Assignment
            </h4>
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Submission
              </label>
              <textarea
                value={assignmentSubmission}
                onChange={(e) => setAssignmentSubmission(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="4"
                placeholder="Paste your assignment link or details here..."
              ></textarea>
            </div>
            <button
              onClick={handleAssignmentSubmit}
              className="bg-green-600 text-white hover:bg-green-700 w-full mt-4 py-2 rounded-md"
            >
              Submit Assignment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
