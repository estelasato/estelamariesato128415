import { httpClient } from './httpClient';
import type { AuthTokens, LoginCredentials } from '../../domain/entities/Auth';

async function signIn(params: LoginCredentials) {
  const { data } = await httpClient.post<AuthTokens>('/autenticacao/login', params);
  return data;
}

export const authService = {
  signIn,
};
