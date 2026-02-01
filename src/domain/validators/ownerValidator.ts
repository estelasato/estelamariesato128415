import masks from "@/app/utils/masks";
import { z } from "zod";

export const formOwnerSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  cpf: z.string().min(1, "CPF é obrigatório").transform((value) => masks.number(value)),
});

export type FormOwnerSchema = z.infer<typeof formOwnerSchema>;
