import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const Layout = () => {
  return (
<>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      </>
  );
};

export default Layout;
