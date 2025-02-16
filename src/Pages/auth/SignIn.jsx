import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import animationData from "../../assets/lottie/Animation1.json";
import bg from "../../assets/images/home/wood-grain-pattern-gray1x.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialGoogle from "../../components/socialLogin/SocialGoogle";

const SignIn = () => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
      captchaValid: false,
      isCaptchaChecked: false,
    },
  });

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleCaptchaChange = () => {
    const captchaValue = document.getElementById("captchaInput").value;
    const isValid = validateCaptcha(captchaValue);
    setValue("captchaValid", isValid);
  };

  const handleCaptchaCheck = () => {
    const captchaValid = watch("captchaValid");
    if (captchaValid) {
      setValue("isCaptchaChecked", true);
    } else {
      loadCaptchaEnginge(6);
      setValue("isCaptchaChecked", false);
    }
  };

  const onSubmit = (data) => {
    if (!validatePassword(data.password)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Password!",
        text: "Password must be at least 6 characters long and include at least one uppercase letter, one number, and one special character.",
      });
      return;
    }

    if (data.captchaValid) {
      signIn(data.email, data.password)
        .then((result) => {
          const user = result.user;
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome back!",
          }).then(() => {
            navigate(from, { replace: true });
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Login Failed!",
            text: error.message,
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Captcha Incorrect!",
        text: "Please enter the correct captcha.",
      });
    }
  };

  const captchaValid = watch("captchaValid");
  const isCaptchaChecked = watch("isCaptchaChecked");

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-1/2 p-6 flex items-center justify-center">
          <Lottie animationData={animationData} loop={true} />
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <div className="flex flex-col">
              <label htmlFor="captcha" className="text-sm font-semibold">
                Captcha:
              </label>
              <LoadCanvasTemplate />
              <input
                type="text"
                id="captchaInput"
                className="p-3 border border-gray-300 rounded-md mt-2"
                placeholder="Enter captcha"
                onBlur={handleCaptchaChange}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleCaptchaCheck}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                disabled={isCaptchaChecked}
              >
                {isCaptchaChecked ? "Captcha Validated" : "Check Captcha"}
              </button>
            </div>

            <div>
              <input
                type="submit"
                value="Login"
                className={`w-full py-3 mt-4 font-semibold rounded-md transition-colors duration-300 
                                ${
                                  captchaValid
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                }`}
                disabled={!captchaValid}
              />
            </div>
          </form>
          <div>
            <div className="divider">OR</div>
            <SocialGoogle></SocialGoogle>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              New here?{" "}
              <Link
                to={"/auth/signup"}
                className="text-blue-500 hover:underline"
              >
                Create a New Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
