import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./authGuard";
import { AuthLayout } from "../view/layouts/authLayout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<h1>Login</h1>} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path="/" element={<h1>dash</h1>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
