import { ownerFacade } from "@/app/facades/ownerFacade";
import { petFacade } from "@/app/facades/petFacade";
import type { CreateOwnerParams } from "@/domain/entities/Owner";
import { formOwnerSchema, type FormOwnerSchema } from "@/domain/validators/ownerValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useOwnerForm() {
  const { id } = useParams();
  const ownerId = id ? Number(id) : 0;
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: owner, isLoading: isLoadingOwner } = useQuery({
    queryKey: ["owner", id],
    queryFn: () => ownerFacade.getOwnerById(ownerId),
    enabled: !!id,
  });

  const { data: petsData } = useQuery({
    queryKey: ["pets", "all-for-owner"],
    queryFn: () => petFacade.listPets({ page: 0, size: 100 }),
    enabled: isEdit,
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
      toast.success("Pet vinculado com sucesso");
    },
    onError: () => toast.error("Erro ao vincular pet"),
  });

  const removePetMutation = useMutation({
    mutationFn: (petId: number) => ownerFacade.removePet(ownerId, petId),
    onSuccess: () => {
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

  const form = useForm<FormOwnerSchema>({
    resolver: zodResolver(formOwnerSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      endereco: "",
      cpf: "",
    },
  });

  const { mutateAsync: createOwner, isPending: isCreating } = useMutation({
    mutationFn: ownerFacade.createOwner,
  });

  const { mutateAsync: updateOwner, isPending: isUpdating } = useMutation({
    mutationFn: (data: CreateOwnerParams) =>
      ownerFacade.updateOwner(Number(id), data),
  });

  async function handleSubmit(data: FormOwnerSchema) {
    try {
      const ownerData: CreateOwnerParams = { ...data };
      if (isEdit) {
        await updateOwner(ownerData);
      } else {
        await createOwner(ownerData);
      }
      navigate("/owners");
      toast.success(isEdit ? "Tutor atualizado com sucesso" : "Tutor cadastrado com sucesso");
    } catch {
      toast.error(isEdit ? "Erro ao atualizar tutor" : "Erro ao cadastrar tutor");
    }
  }

  useEffect(() => {
    if (owner) {
      form.reset({
        nome: owner.nome,
        email: owner.email,
        telefone: owner.telefone,
        endereco: owner.endereco,
        cpf: owner.cpf,
      });
    }
  }, [owner, form]);

  return {
    form,
    handleSubmit,
    isPending: isCreating || isUpdating || isLoadingOwner,
    owner,
    availablePets,
    addPetToOwner,
    removePetFromOwner,
    isAddingPet: addPetMutation.isPending,
    isRemovingPet: removePetMutation.isPending,
  };
}
