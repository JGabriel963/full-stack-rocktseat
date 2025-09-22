import { Route, Routes } from "react-router";
import { SignIn } from "../pages/signin";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}
