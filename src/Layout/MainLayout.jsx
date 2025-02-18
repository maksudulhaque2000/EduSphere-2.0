import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const MainLayout = () => {
  const location = useLocation();
  const noNavFoot =
    location.pathname.includes("signin") ||
    location.pathname.includes("signup");
  return (
    <div>
      {noNavFoot || <NavBar></NavBar>}
      <div className="px-4">
      <Outlet></Outlet>
      </div>
      {noNavFoot || <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
