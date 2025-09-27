import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { AuthRoutes } from "./auth-routes";
import { EmployeeRoutes } from "./employee-routes";
import { ManagerRoutes } from "./manager-routes";
import { useAuth } from "../context/AuthContext";
import { Loading } from "../components/loading";

export function Routes() {
  const { session, isLoading } = useAuth();

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Toaster />
      <Route />
    </BrowserRouter>
  );
}
