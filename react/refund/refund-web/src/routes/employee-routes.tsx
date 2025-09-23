import { Route, Routes } from "react-router";
import NotFound from "../pages/not-found";
import { Refund } from "../pages/refund";
import { AppLayout } from "../components/app-layout";

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Refund />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
