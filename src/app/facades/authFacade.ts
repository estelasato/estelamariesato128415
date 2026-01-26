import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials } from '../../domain/entities/Auth';

export const authFacade = {
  async signIn(credentials: LoginCredentials) {
    const authData = await authService.signIn(credentials);
    useAuthStore.getState().setAuth(authData);
    return authData;
  },

  logout() {
    useAuthStore.getState().logout();
  },
};
