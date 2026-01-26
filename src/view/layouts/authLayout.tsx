import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className=" flex w-full h-full justify-center items-center">
      <Outlet />
    </div>
  )
}
