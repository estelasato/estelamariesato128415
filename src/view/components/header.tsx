import { LogOut, Menu, PawPrint, User, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/shared/utils/cn";
import { authFacade } from "@/app/facades/authFacade";
import { useState } from "react";
import logo from "@/assets/logo.png";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.includes(path);

  const logout = () => {
    authFacade.logout();
    navigate('/login');
  }

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  }

  const routes = [
    {
      label: 'Pets',
      redirect: '/pets',
      icon: <PawPrint className="size-4" />
    },
    {
      label: 'Tutores',
      redirect: '/owners',
      icon: <User className="size-4" />
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 md:px-8 py-3 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-lg font-extrabold text-center mb-3 mt-4">
            <span className="bg-gradient-to-r from-orange-700 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              PetRegistry
            </span>
          </h1>

          <div className="hidden sm:flex items-center gap-2 pl-16">
            {routes.map((route) => (
              <Button
                key={route.label}
                onClick={() => navigate(route.redirect)}
                variant="ghost"
                className={cn(
                  'bg-transparent !hover:bg-orange-50 rounded-lg h-9',
                  isActive(route.redirect) && 'bg-orange-50 text-orange-400 '
                )}
              >
                {route.icon}
                {route.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" className="h-9" onClick={() => logout()}>
            <LogOut className="size-4" /> Sair
          </Button>
        </div>

        <div
          className="sm:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 gap-1 max-w-[1600px] mx-auto">
            {routes.map((route) => (
              <Button
                key={route.label}
                onClick={() => handleNavigate(route.redirect)}
                variant="ghost"
                className={cn(
                  'justify-start bg-transparent text-gray-700',
                  isActive(route.redirect) && 'bg-orange-50 text-orange-500'
                )}
              >
                {route.icon}
                {route.label}
              </Button>
            ))}

            <div className="h-px bg-border my-2" />

            <Button
              variant="ghost"
              className="justify-start "
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
            >
              <LogOut className="size-4" /> Sair
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
