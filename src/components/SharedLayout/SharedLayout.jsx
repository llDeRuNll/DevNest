import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";

const SharedLayout = () => {
  return (
    <div className="container">
      <Header />
      <BgImageWrapper />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
