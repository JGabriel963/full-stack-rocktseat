import { Outlet } from "react-router";
import { Header } from "./header";

export function AppLayout() {
  return (
    <div className="w-screen h-screen bg-gray-400 flex flex-col items-center text-gray-100">
      <main className="p-3">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
