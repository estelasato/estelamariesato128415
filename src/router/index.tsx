import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./authGuard";
import { AuthLayout } from "../view/layouts/authLayout";
import { lazy, Suspense } from "react";
import { Spinner } from "@/view/components/ui/spinner";
import { PrivateLayout } from "@/view/layouts/privateLayout";
import Health from "@/view/pages/Health";

const Login = lazy(() => import('../view/pages/Login'));
const PetList = lazy(() => import('../view/pages/Pets/List'));
const PetDetail = lazy(() => import('../view/pages/Pets/Detail'));
const PetForm = lazy(() => import('../view/pages/Pets/Form'));
const OwnerList = lazy(() => import('../view/pages/Owners/List'));
const OwnerForm = lazy(() => import('../view/pages/Owners/Form'));
const OwnerDetail = lazy(() => import('../view/pages/Owners/Detail'));

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner className="size-10 text-primary-500" />
        </div>
      }>
        <Routes>
          <Route path="/health" element={<Health />} />

          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Route>

          <Route element={<AuthGuard isPrivate={true} />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<PetList />} />
              <Route path="/pets" element={<PetList />} />
              <Route path="/pets/create" element={<PetForm />} />
              <Route path="/pets/:id" element={<PetDetail />} />
              <Route path="/pets/:id/edit" element={<PetForm />} />
              <Route path="/owners" element={<OwnerList />} />
              <Route path="/owners/create" element={<OwnerForm />} />
              <Route path="/owners/:id" element={<OwnerDetail />} />
              <Route path="/owners/:id/edit" element={<OwnerForm />} />
            </Route>
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
