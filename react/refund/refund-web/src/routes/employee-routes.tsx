import { Route, Routes } from "react-router";
import NotFound from "../pages/not-found";
import { Refund } from "../pages/refund";
import { AppLayout } from "../components/app-layout";
import { Confirm } from "../pages/confirm";

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Refund />} />
        <Route path="/confirm" element={<Confirm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
