import { describe, it, expect } from "vitest"
import { formOwnerSchema } from "../ownerValidator"

describe("formOwnerSchema", () => {
  it("deve aceitar dados válidos", () => {
    const result = formOwnerSchema.safeParse({
      nome: "João",
      email: "joao@email.com",
      telefone: "11999999999",
      endereco: "Rua A, 1",
      cpf: "123.456.789-00",
    })

    expect(result.success).toBe(true)
  })

  it("deve rejeitar quando nome está vazio", () => {
    const result = formOwnerSchema.safeParse({
      nome: "",
      email: "a@b.com",
      telefone: "11999999999",
      endereco: "Rua A",
      cpf: "12345678900",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Nome é obrigatório")
    }
  })

  it("deve rejeitar e-mail inválido", () => {
    const result = formOwnerSchema.safeParse({
      nome: "João",
      email: "invalido",
      telefone: "11999999999",
      endereco: "Rua A",
      cpf: "12345678900",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("E-mail inválido")
    }
  })

  it("deve transformar CPF removendo formatação", () => {
    const result = formOwnerSchema.safeParse({
      nome: "João",
      email: "joao@email.com",
      telefone: "11999999999",
      endereco: "Rua A",
      cpf: "123.456.789-00",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.cpf).toBe("12345678900")
    }
  })
})
