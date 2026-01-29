import type { ImageType } from "@/shared/types/imageType";
import type { PaginationParams } from "@/shared/types/pagination";
import type { Owner } from "./Owner";
import type { ListResponse } from "@/shared/types/list";

export interface CreatePetParams {
  nome: string;
  raca: string;
  idade: number;
}

export type UpdatePetParams = CreatePetParams;

export interface Pet {
  id: number,
  nome: string,
  raca: string,
  idade: number,
  foto: ImageType
}

export interface listPetsParams extends PaginationParams {
  nome?: string;
  raca?: string;
}

export interface listPetsResponse extends ListResponse<Pet> {}

export interface getPetResponse extends Pet {
  tutores: Owner[]
}


