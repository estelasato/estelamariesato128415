import { petService } from '../services/petService';
import { queryClient } from '../lib/queryClient';
import type { CreatePetParams, listPetsParams, UpdatePetParams } from '@/domain/entities/Pet';
import type { DeleteImageParams } from '@/shared/types/imageType';

export const petFacade = {
  async createPet(params: CreatePetParams) {
    const pet = await petService.createPet(params);
    queryClient.invalidateQueries({ queryKey: ['pets'] });
    return pet;
  },

  async listPets(params: listPetsParams) {
    const pets = await petService.listPets(params);
    return pets;
  },

  async updatePet(id: number, params: UpdatePetParams) {
    const pet = await petService.updatePet(id, params);
    queryClient.invalidateQueries({ queryKey: ['pets'] });
    queryClient.invalidateQueries({ queryKey: ['pet', id] });
    return pet;
  },

  async deletePet(id: number) {
    await petService.deletePet(id);
    queryClient.invalidateQueries({ queryKey: ['pets'] });
  },

  async uploadPetPhoto(id: number, file: File) {
    const photo = await petService.uploadPetPhoto(id, file);
    queryClient.invalidateQueries({ queryKey: ['pet', id] });
    return photo;
  },

  async deletePetPhoto(params: DeleteImageParams) {
    await petService.deletePetPhoto(params);
    queryClient.invalidateQueries({ queryKey: ['pet', params.id] });
  },
};
