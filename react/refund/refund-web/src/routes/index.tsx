import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { EmployeeRoutes } from "./employee-routes";
import { ManagerRoutes } from "./manager-routes";

export function Routes() {
  return (
    <BrowserRouter>
      <ManagerRoutes />
    </BrowserRouter>
  );
}
