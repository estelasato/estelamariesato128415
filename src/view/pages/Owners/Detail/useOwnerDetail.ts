import { ownerFacade } from "@/app/facades/ownerFacade";
import { petFacade } from "@/app/facades/petFacade";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useOwnerDetail() {
  const { id } = useParams();
  const ownerId = id ? Number(id) : 0;
  const [selectedPetId, setSelectedPetId] = useState("");
  const queryClient = useQueryClient();

  const { data: owner, isLoading } = useQuery({
    queryKey: ["owner", id],
    queryFn: () => ownerFacade.getOwnerById(ownerId),
    enabled: !!id,
  });

  const { data: petsData } = useQuery({
    queryKey: ["pets", "all-for-owner"],
    queryFn: () => petFacade.listPets({ page: 0, size: 100 }),
    enabled: !!owner,
  });

  const linkedPetIds = useMemo(
    () => new Set((owner?.pets ?? []).map((p) => p.id)),
    [owner?.pets]
  );

  const availablePets = useMemo(
    () => (petsData?.content ?? []).filter((p) => !linkedPetIds.has(p.id)),
    [petsData?.content, linkedPetIds]
  );

  const addPetMutation = useMutation({
    mutationFn: (petId: number) => ownerFacade.addPet(ownerId, petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner", id] });
      toast.success("Pet vinculado com sucesso");
      setSelectedPetId("");
    },
    onError: () => toast.error("Erro ao vincular pet"),
  });

  const removePetMutation = useMutation({
    mutationFn: (petId: number) => ownerFacade.removePet(ownerId, petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner", id] });
      toast.success("Pet desvinculado");
    },
    onError: () => toast.error("Erro ao desvincular pet"),
  });

  function addPetToOwner(petId: number) {
    addPetMutation.mutate(petId);
  }

  function removePetFromOwner(petId: number) {
    removePetMutation.mutate(petId);
  }

  function handleSelectPet(value: string) {
    if (!value) return;
    addPetToOwner(Number(value));
    setSelectedPetId("");
  }

  return {
    owner,
    isLoading,
    availablePets,
    selectedPetId,
    handleSelectPet,
    removePetFromOwner,
    isAddingPet: addPetMutation.isPending,
    isRemovingPet: removePetMutation.isPending,
  };
}
