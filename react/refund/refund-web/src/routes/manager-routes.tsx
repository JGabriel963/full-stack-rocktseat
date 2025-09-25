import { Route, Routes } from "react-router";
import NotFound from "../pages/not-found";
import { AppLayout } from "../components/app-layout";
import { Dashboard } from "../pages/dashboard";

export function ManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
