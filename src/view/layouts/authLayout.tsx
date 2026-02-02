import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-orange-300/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute -top-20 right-0 w-80 h-80 bg-gradient-to-bl from-secondary/25 to-emerald-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-tr from-rose-200/30 to-amber-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '2s' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-primary/20 to-amber-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '0.5s' }}
        />
        <div
          className="absolute bottom-20 -left-20 w-72 h-72 bg-gradient-to-r from-secondary/20 to-teal-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '9s', animationDelay: '3s' }}
        />

        <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="hsl(25, 90%, 50%)"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
