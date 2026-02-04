import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function PrivateLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="relative w-full flex-1 min-h-0 p-5 pt-26 md:p-10 md:pt-28 xl:pt-30 overflow-hidden">
        <div className="absolute inset-0 bg-[#fbfbf8]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -bottom-32 right-1/4 w-80 h-80 bg-gradient-to-bl from-primary/25 to-orange-200/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '9s' }}
          />
          <div
            className="absolute -bottom-20 left-0 w-72 h-72 bg-gradient-to-r from-amber-200/25 to-rose-200/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '7s', animationDelay: '1.5s' }}
          />
          <div
            className="absolute -bottom-40 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/20 to-emerald-200/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '11s', animationDelay: '0.5s' }}
          />
          <div
            className="absolute -bottom-48 left-1/3 w-[420px] h-[420px] bg-gradient-to-tr from-primary/15 to-amber-100/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-amber-200/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '3s' }}
          />
          <div
            className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-gradient-to-r from-rose-100/20 to-orange-100/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '12s', animationDelay: '1s' }}
          />
        </div>
        <div className="relative max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
