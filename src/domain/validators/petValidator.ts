import { z } from 'zod';

export const formPetSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  raca: z.string().optional(),
  idade: z.string().optional().transform((value) => value ? Number(value) : undefined),
});

export type FormPetSchemaInput = z.input<typeof formPetSchema>;
export type FormPetSchema = z.output<typeof formPetSchema>;
