import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function PrivateLayout() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="w-full p-5 pt-20 md:p-10 md:pt-24  xl:pt-30 max-w-[1600px] mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
