import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-5">
      <div className="text-center">
        <FaExclamationTriangle className="text-9xl text-yellow-300 animate-bounce mb-5" />
        <h3 className="text-8xl font-extrabold mb-4">404</h3>
        <h3 className="text-4xl font-extrabold mb-4">Page Not Found</h3>
        <p className="text-2xl font-medium mb-8">
          Oops! The page you are looking for doesn't exist.
        </p>
        <p className="text-lg mb-6">
          It looks like you've taken a wrong turn. Try going back to the
          homepage or check the URL for typos.
        </p>
        <Link
          to="/"
          className="text-xl font-semibold text-blue-400 hover:text-blue-600 border border-gray-400 p-4 rounded-2xl hover:bg-slate-600 transition-transform transform hover:scale-105"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;
