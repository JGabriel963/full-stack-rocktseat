import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { EmployeeRoutes } from "./employee-routes";
import { ManagerRoutes } from "./manager-routes";

const session = {
  user: {
    role: "",
  },
};

export function Routes() {
  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <ManagerRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
