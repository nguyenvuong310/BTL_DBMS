import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default App;