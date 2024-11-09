import { useState } from "react";
import Navbar from "./Navbar";
import NewsBoard from "./NewsBoard";
import { Outlet } from "react-router-dom";

const AppLayout = ({ user, setUser }) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
    </>
  );
};

export default AppLayout;
