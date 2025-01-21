import { Route, Routes } from "react-router-dom";

import { PageNotFound } from "../../pages/PageNotFound.jsx";
import { SignIn } from "../../pages/SignIn/index.js";
import { SignUp } from "../../pages/SignUp/index.js";
import { Home } from "../../pages/Home.jsx";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);
