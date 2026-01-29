import { queryClient } from '../lib/queryClient';
import type { DeleteImageParams } from '@/shared/types/imageType';
import { ownerService } from '../services/ownerService';
import type { CreateOwnerParams, UpdateOwnerParams } from '@/domain/entities/Owner';
import type { listOwnersParams } from '@/domain/entities/Owner';

export const ownerFacade = {
  async getOwnerById(id: number) {
    const owner = await ownerService.getOwnerById(id);
    return owner;
  },

  async createOwner(params: CreateOwnerParams) {
    const owner = await ownerService.createOwner(params);
    queryClient.invalidateQueries({ queryKey: ['owners'] });
    return owner;
  },

  async listOwners(params: listOwnersParams) {
    const owners = await ownerService.listOwners(params);
    return owners;
  },

  async updateOwner(id: number, params: UpdateOwnerParams) {
    const owner = await ownerService.updateOwner(id, params);
    queryClient.invalidateQueries({ queryKey: ['owners'] });
    queryClient.invalidateQueries({ queryKey: ['owner', id] });
    return owner;
  },

  async deleteOwner(id: number) {
    await ownerService.deleteOwner(id);
    queryClient.invalidateQueries({ queryKey: ['owners'] });
  },

  async uploadPetPhoto(id: number, file: File) {
    const photo = await ownerService.uploadOwnerPhoto(id, file);
    queryClient.invalidateQueries({ queryKey: ['owner', id] });
    return photo;
  },

  async deleteOwnerPhoto(params: DeleteImageParams) {
    await ownerService.deleteOwnerPhoto(params);
    queryClient.invalidateQueries({ queryKey: ['owner', params.id] });
  },
};
