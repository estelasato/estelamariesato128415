import type { CreateOwnerParams, getOwnerResponse, listOwnersParams, listOwnersResponse, Owner, UpdateOwnerParams } from "@/domain/entities/Owner";
import { httpClient } from "./httpClient";
import type { DeleteImageParams, ImageType } from "@/shared/types/imageType";

async function createOwner(params: CreateOwnerParams) {
  const { data } = await httpClient.post<Owner>('/v1/tutores', params);
  return data;
}

async function updateOwner(id: number, params: UpdateOwnerParams) {
  const { data } = await httpClient.put<Owner>(`/v1/tutores/${id}`, params);
  return data;
}

async function deleteOwner(id: number) {
  await httpClient.delete(`/v1/tutores/${id}`);
}

async function listOwners(params: listOwnersParams) {
  const { data } = await httpClient.get<listOwnersResponse>(`/v1/tutores`, { params });
  return data;
}

async function getOwnerById(id: number) {
  const { data } = await httpClient.get<getOwnerResponse>(`/v1/tutores/${id}`);
  return data;
}

async function uploadOwnerPhoto(id: number, file: File) {
  const formData = new FormData();
  formData.append('foto', file);
  const { data } = await httpClient.post<ImageType>(`/v1/tutores/${id}/fotos`, formData);
  return data;
}

async function deleteOwnerPhoto(params: DeleteImageParams) {
  await httpClient.delete(`/v1/tutores/${params.id}/fotos/${params.fotoId}`);
}

async function addPet(ownerId: number, petId: number) {
  await httpClient.post(`/v1/tutores/${ownerId}/pets/${petId}`);
}

async function removePet(ownerId: number, petId: number) {
  await httpClient.delete(`/v1/tutores/${ownerId}/pets/${petId}`);
}

export const ownerService = {
  createOwner,
  updateOwner,
  deleteOwner,
  listOwners,
  getOwnerById,
  uploadOwnerPhoto,
  deleteOwnerPhoto,
  addPet,
  removePet
}
