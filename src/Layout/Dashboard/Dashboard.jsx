import { FaChalkboardTeacher, FaHome, FaUsers } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";
import { SiGoogleclassroom } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import NavBarD from "../../Pages/Shared/NavBar/NavBarD";

const Dashboard = () => {
  // const [isAdmin, isAdminLoading] = useAdmin();
  // const [isTeacher, isTeacherLoading] = useTeacher();

  const { user } = useAuth();

  const isAdmin = false;
  const isTeacher = false;

  // if (isAdminLoading || isTeacherLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="flex px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>EduSphere | Dashboard</title>
      </Helmet>
      <div className="w-3/12 lg:w-2/12 min-h-screen bg-teal-50 p-5">
        <ul className="flex flex-col gap-5 text-gray-700 font-bold">
          <li>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md ${
                  isActive ? "bg-gray-700 text-white" : ""
                }`
              }
              to={"/"}
            >
              <FaHome /> HOME
            </NavLink>
          </li>
          <li className="flex flex-col gap-5 text-gray-700 font-bold">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md ${
                  isActive ? "bg-gray-700 text-white" : ""
                }`
              }
              to="/allclasses"
            >
              <MdOutlineClass />
              All Classes
            </NavLink>
          </li>
          <li className="flex flex-col gap-5 text-gray-700 font-bold">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md ${
                  isActive ? "bg-gray-700 text-white" : ""
                }`
              }
              to="/teachon"
            >
              <FaChalkboardTeacher />
              Teach on EduSphere
            </NavLink>
          </li>

          {isAdmin ? (
            <div className="flex flex-col gap-4 text-sm lg:text-xl">
              <div className="divider"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/studentprofile"}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={user.photoURL} alt="User" className="w-12" />
                    <div>
                      <p className="truncate text-sm">{user.displayName}</p>
                      <p className="truncate text-sm">{user.email}</p>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/teacherrequest"}
                >
                  <FaChalkboardTeacher /> Teacher Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/allusers"}
                >
                  <FaUsers /> Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/allclasseslist"}
                >
                  <MdOutlineClass /> All classes
                </NavLink>
              </li>
            </div>
          ) : isTeacher ? (
            <div className="flex flex-col gap-4 text-sm lg:text-xl">
              <div className="divider"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/studentprofile"}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={user.photoURL} alt="User" className="w-12" />
                    <div>
                      <p className="truncate text-sm">{user.displayName}</p>
                      <p className="truncate text-sm">{user.email}</p>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/addclass"}
                >
                  <SiGoogleclassroom /> Add Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/myclass"}
                >
                  <CgProfile /> My Class
                </NavLink>
              </li>
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-sm lg:text-xl">
              <div className="divider"></div>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/studentprofile"}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img src={user.photoURL} alt="User" className="w-12" />
                    <div>
                      <p className="truncate text-sm">{user.displayName}</p>
                      <p className="truncate text-sm">{user.email}</p>
                    </div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-700 text-white" : ""
                    }`
                  }
                  to={"/dashboard/myenrollclass"}
                >
                  <SiGoogleclassroom /> My enroll class
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
      <div className="w-3/4 lg:w-10/12">
      <NavBarD></NavBarD>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
