import type { ImageType } from "@/shared/types/imageType";
import type { ListResponse } from "@/shared/types/list";
import type { PaginationParams } from "@/shared/types/pagination";
import type { Pet } from "./Pet";

export interface CreateOwnerParams {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
}

export interface UpdateOwnerParams extends CreateOwnerParams {}

export interface Owner {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
  foto: ImageType
}

export interface listOwnersParams extends PaginationParams {
  nome?: string;
}

export interface listOwnersResponse extends ListResponse<Owner> {}

export interface getOwnerResponse extends Owner {
  pets: Pet[]
}
