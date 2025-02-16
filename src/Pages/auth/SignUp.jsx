import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import bg from "../../assets/images/home/wood-grain-pattern-gray1x.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialGoogle from "../../components/socialLogin/SocialGoogle";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { signUp, updateUserProfile } = useContext(AuthContext);


  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      photoURL: "",
      email: "",
      password: "",
      phoneNumber: "",
      captchaValid: false,
      termsAccepted: false,
    },
  });

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleCaptchaChange = () => {
    const captchaValue = document.getElementById("captchaInput").value;
    const isValid = validateCaptcha(captchaValue);
    setValue("captchaValid", isValid);
  };

  const handleReloadCaptcha = () => {
    loadCaptchaEnginge(6);
    setValue("captchaValid", false);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    return regex.test(password);
  };

  const onSubmit = (data) => {
    if (!data.termsAccepted) {
      Swal.fire({
        icon: "error",
        title: "Terms Not Accepted",
        text: "You must accept the terms and conditions to proceed.",
      });
      return;
    }

    if (!validatePassword(data.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters long, contain a special character, and include a number.",
      });
      return;
    }

    if (data.captchaValid) {
      signUp(data.email, data.password)
        .then((result) => {
          const user = result.user;

          updateUserProfile(data.name, data.photoURL).then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: data.photoURL,
              phone: data.phoneNumber,
              password: data.password,
              role: "student",
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "Registration Successful",
                  text: "Your account has been created successfully!",
                });
                navigate("/");
              }
            });
          });
        })
        .catch((error) => {
          console.error("Sign-up error:", error);
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: error.message,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Captcha",
        text: "Please enter the correct captcha!",
      });
    }
  };

  const captchaValid = watch("captchaValid");

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-[900px] flex overflow-hidden mt-20"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                {...register("name")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photoURL")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter your Phone number"
                {...register("phoneNumber")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Type here"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Captcha
              </label>
              <LoadCanvasTemplate />
              <input
                type="text"
                id="captchaInput"
                placeholder="Enter captcha"
                onBlur={handleCaptchaChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div className="mt-2">
              <button
                type="button"
                onClick={handleReloadCaptcha}
                className={`w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition ${
                  captchaValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={captchaValid}
              >
                {captchaValid ? "Captcha Valid" : "Check Captcha"}
              </button>
            </div>
            <div>
              <input
                type="checkbox"
                id="terms"
                {...register("termsAccepted")}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                Accept Our Terms and Conditions
              </label>
            </div>
            <button
              type="submit"
              className={`w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition ${
                captchaValid ? "" : "cursor-not-allowed opacity-50"
              }`}
              disabled={!captchaValid}
            >
              Sign Up
            </button>
          </form>
          <div>
            <div className="divider">OR</div>
            <SocialGoogle></SocialGoogle>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already registered?{" "}
            <Link
              to={"/auth/signin"}
              className="text-yellow-500 font-medium hover:underline"
            >
              Go to log in
            </Link>
          </p>
        </div>

        <div className="w-1/2 bg-yellow-50 flex items-center justify-center">
          <img
            src={watch("photoURL") || bg}
            alt="Sign Up Illustration"
            className="w-3/4"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
