import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaUserTie, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { Helmet } from "react-helmet";

const MyEnrollClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: myenrollclasses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myenrollclasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myenrollclasses?email=${user?.email}`
      );
      return res.data;
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | My Enroll Class</title>
      </Helmet>
      <h3 className="text-2xl font-bold text-center text-blue-600 mb-6">
        My Enrolled Classes ({myenrollclasses.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myenrollclasses.map((classData, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={classData.image}
              alt={classData.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {classData.title}
              </h4>
              <p className="text-gray-600 mb-4">{classData.description}</p>
              <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                <span className="flex items-center">
                  <FaUserTie className="text-blue-500 mr-2" />
                  {classData.instructorName} ({classData.instructorEmail})
                </span>
                <span className="flex items-center">
                  <FaDollarSign className="text-green-500 mr-1" />
                  {classData.price}
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <FaCalendarAlt className="mr-2 text-red-500" />
                <span>{new Date(classData.date).toLocaleDateString()}</span>
              </div>
              <Link
                state={{ classData }}
                to={`/dashboard/myenrollclass/${classData._id}`}
              >
                <button className="w-full btn btn-outline border-1 border-b-4 font-semibold">
                  Continue
                </button>
              </Link>
            </div>
            <div className="bg-gray-100 p-2 text-center">
              <span className="text-xs text-gray-500">Transaction ID:</span>
              <p className="text-sm text-gray-700 font-medium">
                {classData.tranSaction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClasses;
