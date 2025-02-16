import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialGoogle = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
        role: "student",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        navigate("/");
      });
    });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="bg-gray-500 w-full font-bold rounded-lg flex items-center justify-center"
      >
        <img
          className="w-10"
          src="https://img.icons8.com/clouds/100/google-logo.png"
          alt="google-logo"
        />
      </button>
    </div>
  );
};

export default SocialGoogle;
