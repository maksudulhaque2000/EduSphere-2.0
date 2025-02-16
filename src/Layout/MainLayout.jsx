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
      <Outlet></Outlet>
      {noNavFoot || <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
