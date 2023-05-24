import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function BaseLayout() {
  return (
    <>
      <Header />
      <div className="container pt-5">
        <Outlet />
      </div>
    </>
  );
}

export default BaseLayout;
