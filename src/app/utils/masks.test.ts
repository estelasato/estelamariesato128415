import { describe, it, expect } from "vitest"
import masks from "./masks"

describe("masks", () => {
  describe("unmask", () => {
    it("deve remover caracteres não alfanuméricos", () => {
      expect(masks.unmask("123.456-78")).toBe("12345678")
      expect(masks.unmask("abc-123")).toBe("abc123")
    })
  })

  describe("number", () => {
    it("deve manter apenas dígitos", () => {
      expect(masks.number("12a3.45")).toBe("12345")
      expect(masks.number("(11) 99999-9999")).toBe("11999999999")
    })
  })

  describe("cpf", () => {
    it("deve formatar como XXX.XXX.XXX-XX", () => {
      expect(masks.cpf("12345678900")).toBe("123.456.789-00")
    })

    it("deve limitar a 11 dígitos", () => {
      expect(masks.cpf("12345678901234")).toBe("123.456.789-01")
    })
  })

  describe("cell", () => {
    it("deve formatar celular 11 dígitos como (XX) XXXXX-XXXX", () => {
      expect(masks.cell("11999999999")).toBe("(11) 99999-9999")
    })

    it("deve formatar celular 10 dígitos como (XX) XXXX-XXXX", () => {
      expect(masks.cell("1199999999")).toBe("(11) 9999-9999")
    })
  })
})
