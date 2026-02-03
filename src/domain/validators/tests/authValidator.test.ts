import { describe, it, expect } from "vitest"
import { loginSchema } from "../authValidator"

describe("loginSchema", () => {
  it("deve aceitar username e password válidos", () => {
    const result = loginSchema.safeParse({
      username: "usuario",
      password: "senha123",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.username).toBe("usuario")
      expect(result.data.password).toBe("senha123")
    }
  })

  it("deve rejeitar quando username está vazio", () => {
    const result = loginSchema.safeParse({
      username: "",
      password: "senha123",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Campo obrigatório")
    }
  })

  it("deve rejeitar quando password está vazio", () => {
    const result = loginSchema.safeParse({
      username: "usuario",
      password: "",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Campo obrigatório")
    }
  })

  it("deve rejeitar quando ambos estão vazios", () => {
    const result = loginSchema.safeParse({
      username: "",
      password: "",
    })

    expect(result.success).toBe(false)
  })
})
