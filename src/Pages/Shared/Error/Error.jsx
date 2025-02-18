import { Link } from "react-router-dom";
import { FaRegFrown } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400 text-gray-800 p-5">
      <div className="text-center">
        <FaRegFrown className="text-8xl text-gray-600 mb-5" />
        <h1 className="text-9xl font-extrabold text-gray-700 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          Oops! It seems the page you're looking for doesn't exist or might have been removed.
        </p>
        <Link
          to="/"
          className="p-4 m-4 mx-auto text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-teal-600 rounded-md hover:bg-teal-800 focus:outline-none focus:bg-gray-500 text-center w-full"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;
