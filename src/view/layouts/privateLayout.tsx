import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function PrivateLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Header />
      <main className=" bg-[#fbfbf8] w-full flex-1 min-h-0 p-5 pt-26 md:p-10 md:pt-28 xl:pt-30 ">
        <div className="max-w-[1600px] mx-auto">

        <Outlet />
        </div>
      </main>
    </div>
  )
}
