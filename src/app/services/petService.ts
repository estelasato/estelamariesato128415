import type { CreatePetParams, getPetResponse, listPetsParams, listPetsResponse, Pet, UpdatePetParams } from "@/domain/entities/Pet";
import { httpClient } from "./httpClient";
import type { DeleteImageParams, ImageType } from "@/shared/types/imageType";

async function createPet(params: CreatePetParams) {
  const { data } = await httpClient.post<Pet>('/v1/pets', params);
  return data;
}

async function updatePet(id: number, params: UpdatePetParams) {
  const { data } = await httpClient.put<Pet>(`/v1/pets/${id}`, params);
  return data;
}

async function deletePet(id: number) {
  await httpClient.delete(`/v1/pets/${id}`);
}

async function listPets(params: listPetsParams) {
  const { data } = await httpClient.get<listPetsResponse>(`/v1/pets`, { params });
  return data;
}

async function getPetById(id: number) {
  const { data } = await httpClient.get<getPetResponse>(`/v1/pets/${id}`);
  return data;
}

async function uploadPetPhoto(id: number, file: File) {
  const formData = new FormData();
  formData.append('foto', file);

  const { data } = await httpClient.post<ImageType>(`/v1/pets/${id}/fotos`, formData);
  return data;
}

async function deletePetPhoto(params: DeleteImageParams) {
  await httpClient.delete(`/v1/pets/${params.id}/fotos/${params.fotoId}`);
}

export const petService = {
  createPet,
  updatePet,
  deletePet,
  listPets,
  getPetById,
  uploadPetPhoto,
  deletePetPhoto,
}
