import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Input } from "../ui/input"

describe("Input", () => {
  it("deve renderizar com label", () => {
    render(<Input label="Nome" />)
    expect(screen.getByText("Nome")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("deve exibir mensagem de erro quando error é passado", () => {
    render(<Input label="Email" error="E-mail inválido" />)
    expect(screen.getByText("E-mail inválido")).toBeInTheDocument()
  })

  it("deve estar disabled quando disabled é true", () => {
    render(<Input label="Campo" disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  it("deve chamar onChange quando o valor muda", () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "teste" },
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: "teste" }) })
    )
  })

  it("deve aceitar placeholder", () => {
    render(<Input placeholder="Digite aqui" />)
    expect(screen.getByPlaceholderText("Digite aqui")).toBeInTheDocument()
  })
})
