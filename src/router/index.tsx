import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./authGuard";
import { AuthLayout } from "../view/layouts/authLayout";
import { lazy, Suspense } from "react";
import { Spinner } from "@/view/components/ui/spinner";
import { PrivateLayout } from "@/view/layouts/privateLayout";

const Login = lazy(() => import('../view/pages/Login'));
const PetList = lazy(() => import('../view/pages/Pets/List'));
const PetForm = lazy(() => import('../view/pages/Pets/Form'));

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner className="size-10 text-primary" />
        </div>
      }>
        <Routes>
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>

          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<h1>dash</h1>} />
              <Route path="/pets" element={<PetList />} />
              <Route path="/pets/create" element={<PetForm />} />
              <Route path="/pets/:id" element={<PetForm />} />
            </Route>
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
