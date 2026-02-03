import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "../ui/button"

describe("Button", () => {
  it("deve renderizar o texto passado como children", () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument()
  })

  it("deve chamar onClick quando clicado", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Clique</Button>)

    fireEvent.click(screen.getByRole("button", { name: /clique/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("não deve chamar onClick quando disabled", () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Clique
      </Button>
    )

    fireEvent.click(screen.getByRole("button", { name: /clique/i }))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it("deve estar disabled quando isLoading", () => {
    render(<Button isLoading>Enviando</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("deve aplicar variant outline", () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole("button", { name: /outline/i })
    expect(button).toHaveClass("border")
  })
})
