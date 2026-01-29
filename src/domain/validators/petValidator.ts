import { z } from 'zod';

export const formPetSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  raca: z.string().min(1, 'Raça é obrigatório'),
  idade: z.union([z.string(), z.number()]).optional(),
})

export type FormPetSchema = z.infer<typeof formPetSchema>;
