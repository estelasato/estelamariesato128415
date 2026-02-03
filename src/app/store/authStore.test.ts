import { describe, it, expect, beforeEach, vi } from "vitest"
import { useAuthStore } from "./authStore"

describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.getState().logout()
  })

  describe("setAuth", () => {
    it("deve armazenar access_token, refresh_token e metadados", () => {
      const tokens = {
        access_token: "access-123",
        refresh_token: "refresh-456",
        expires_in: 3600,
        refresh_expires_in: 86400,
      }

      useAuthStore.getState().setAuth(tokens)

      const state = useAuthStore.getState()
      expect(state.access_token).toBe("access-123")
      expect(state.refresh_token).toBe("refresh-456")
      expect(state.expires_in).toBe(3600)
      expect(state.refresh_expires_in).toBe(86400)
      expect(state.authenticated_at).toBeDefined()
    })

    it("deve definir refresh_token como null quando não informado", () => {
      useAuthStore.getState().setAuth({
        access_token: "token",
        expires_in: 3600,
        refresh_expires_in: 86400,
      })

      expect(useAuthStore.getState().refresh_token).toBeNull()
    })
  })

  describe("logout", () => {
    it("deve limpar todo o estado", () => {
      useAuthStore.getState().setAuth({
        access_token: "token",
        refresh_token: "ref",
        expires_in: 3600,
        refresh_expires_in: 86400,
      })

      useAuthStore.getState().logout()

      const state = useAuthStore.getState()
      expect(state.access_token).toBeNull()
      expect(state.refresh_token).toBeNull()
      expect(state.authenticated_at).toBeNull()
    })
  })

  describe("isAuthenticated", () => {
    it("deve retornar false quando não há access_token", () => {
      expect(useAuthStore.getState().isAuthenticated()).toBe(false)
    })

    it("deve retornar true quando há token e não expirado", () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date("2025-01-01T12:00:00Z"))

      useAuthStore.getState().setAuth({
        access_token: "token",
        expires_in: 3600, // 1h
        refresh_expires_in: 86400,
      })

      expect(useAuthStore.getState().isAuthenticated()).toBe(true)

      vi.useRealTimers()
    })
  })

  describe("isTokenExpired", () => {
    it("deve retornar true quando authenticated_at ou expires_in são null", () => {
      expect(useAuthStore.getState().isTokenExpired()).toBe(true)
    })

    it("deve retornar true quando o token já expirou", () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date("2025-01-01T12:00:00Z"))

      useAuthStore.getState().setAuth({
        access_token: "token",
        expires_in: 60, // 60s
        refresh_expires_in: 86400,
      })

      vi.advanceTimersByTime(100 * 1000)

      expect(useAuthStore.getState().isTokenExpired()).toBe(true)

      vi.useRealTimers()
    })
  })

  describe("isRefreshTokenExpired", () => {
    it("deve retornar true quando authenticated_at ou refresh_expires_in são null", () => {
      expect(useAuthStore.getState().isRefreshTokenExpired()).toBe(true)
    })
  })
})
