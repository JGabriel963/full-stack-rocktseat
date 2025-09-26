import { Route, Routes } from "react-router";
import NotFound from "../pages/not-found";
import { AppLayout } from "../components/app-layout";
import { Dashboard } from "../pages/dashboard";
import { Refund } from "../pages/refund";

export function ManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/refund/:id" element={<Refund />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
