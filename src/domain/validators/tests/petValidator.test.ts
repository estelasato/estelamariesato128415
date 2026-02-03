import { describe, it, expect } from "vitest"
import { formPetSchema } from "../petValidator"

describe("formPetSchema", () => {
  it("deve aceitar dados válidos com idade", () => {
    const result = formPetSchema.safeParse({
      nome: "Rex",
      raca: "Vira-lata",
      idade: "3",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nome).toBe("Rex")
      expect(result.data.raca).toBe("Vira-lata")
      expect(result.data.idade).toBe(3)
    }
  })

  it("deve aceitar dados válidos sem idade", () => {
    const result = formPetSchema.safeParse({
      nome: "Rex",
      raca: "Vira-lata",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.idade).toBeUndefined()
    }
  })

  it("deve rejeitar quando nome está vazio", () => {
    const result = formPetSchema.safeParse({
      nome: "",
      raca: "Vira-lata",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Nome é obrigatório")
    }
  })

  it("deve aceitar dados apenas com nome (raca e idade opcionais)", () => {
    const result = formPetSchema.safeParse({
      nome: "Rex",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nome).toBe("Rex")
      expect(result.data.raca).toBeUndefined()
      expect(result.data.idade).toBeUndefined()
    }
  })
})
