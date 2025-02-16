// MyClass.js (Client Side)
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { Helmet } from "react-helmet";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: allclasses = [], isLoading, error } = useQuery({
    queryKey: ["allclasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allclasses?email=${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl">
        Error fetching Data.
      </div>
    );
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/allclasses/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
        } catch (error) {
          console.error("Error removing item:", error);
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | My Class</title>
      </Helmet>
      <h3 className="text-3xl font-bold text-center text-purple-700 mb-8">
        My Classes ({allclasses.length})
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allclasses.map((classItem) => (
          <div
            key={classItem._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl border border-purple-300 transition-all overflow-hidden"
          >
            <img
              src={classItem.image}
              alt={classItem.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h4 className="text-2xl font-semibold text-purple-600 mb-3">
                {classItem.title}
              </h4>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Name:</span> {classItem.name}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Email:</span> {classItem.email}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Price:</span> ${classItem.price}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-bold">Description:</span>{" "}
                {classItem.description}
              </p>
              <p
                className={`font-bold mb-4 ${
                  classItem.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {classItem.status}
              </p>
              <div className="flex justify-between items-center">
                <Link to={`/dashboard/myclass/${classItem._id}`}>
                  <button className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:opacity-90 transition-all">
                    <FaEdit />
                  </button>
                </Link>
                {classItem.status === "accepted" ? <Link to={`/dashboard/myclassdetails/${classItem._id}`}>
                  <button className="p-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full hover:opacity-90 transition-all">
                    <FaEye />
                  </button>
                </Link> : <button disabled className="btn btn-outline border-1 border-b-4">
                    <FaEye />
                  </button>}
                <button
                  onClick={() => handleDelete(classItem._id)}
                  className="p-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full hover:opacity-90 transition-all"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
