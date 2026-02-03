import { ownerFacade } from "@/app/facades/ownerFacade";
import { petFacade } from "@/app/facades/petFacade";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function usePetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const petId = id ? Number(id) : 0;
  const [selectedOwnerId, setSelectedOwnerId] = useState("");

  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => petFacade.getPet(petId),
    enabled: !!id,
  });

  const { data: ownersData } = useQuery({
    queryKey: ["owners", "all-for-pet"],
    queryFn: () => ownerFacade.listOwners({ page: 0, size: 100 }),
    enabled: !!pet,
  });

  const linkedOwnerIds = useMemo(
    () => new Set((pet?.tutores ?? []).map((t) => t.id)),
    [pet?.tutores]
  );

  const availableOwners = useMemo(
    () => (ownersData?.content ?? []).filter((o) => !linkedOwnerIds.has(o.id)),
    [ownersData?.content, linkedOwnerIds]
  );

  const addOwnerMutation = useMutation({
    mutationFn: (ownerId: number) => ownerFacade.addPet(ownerId, petId),
    onSuccess: () => {
      toast.success("Tutor vinculado com sucesso");
      setSelectedOwnerId("");
    },
    onError: () => toast.error("Erro ao vincular tutor"),
  });

  const removeOwnerMutation = useMutation({
    mutationFn: (ownerId: number) => ownerFacade.removePet(ownerId, petId),
    onSuccess: () => toast.success("Tutor desvinculado"),
    onError: () => toast.error("Erro ao desvincular tutor"),
  });

  const deletePetMutation = useMutation({
    mutationFn: () => petFacade.deletePet(petId),
    onSuccess: () => {
      toast.success("Pet excluído com sucesso");
      navigate("/pets");
    },
    onError: () => toast.error("Erro ao excluir pet"),
  });

  function addOwnerToPet(ownerId: number) {
    addOwnerMutation.mutate(ownerId);
  }

  function removeOwnerFromPet(ownerId: number) {
    removeOwnerMutation.mutate(ownerId);
  }

  function handleSelectOwner(value: string) {
    if (!value) return;
    addOwnerToPet(Number(value));
    setSelectedOwnerId("");
  }

  function handleConfirmDelete() {
    deletePetMutation.mutate();
  }

  return {
    pet,
    isLoading,
    availableOwners,
    selectedOwnerId,
    handleSelectOwner,
    removeOwnerFromPet,
    handleConfirmDelete,
    isDeleting: deletePetMutation.isPending,
    isAddingOwner: addOwnerMutation.isPending,
    isRemovingOwner: removeOwnerMutation.isPending,
  };
}
