import { ownerFacade } from "@/app/facades/ownerFacade";
import type { CreateOwnerParams } from "@/domain/entities/Owner";
import { formOwnerSchema, type FormOwnerSchema } from "@/domain/validators/ownerValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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

  const uploadPhotoMutation = useMutation({
    mutationFn: (file: File) => ownerFacade.uploadOwnerPhoto(ownerId, file),
    onSuccess: () => toast.success("Foto enviada com sucesso"),
    onError: () => toast.error("Erro ao enviar foto"),
  });

  const deletePhotoMutation = useMutation({
    mutationFn: () =>
      ownerFacade.deleteOwnerPhoto({
        id: ownerId,
        fotoId: owner!.foto.id,
      }),
    onSuccess: () => toast.success("Foto removida"),
    onError: () => toast.error("Erro ao remover foto"),
  });

  function uploadPhoto(file: File) {
    uploadPhotoMutation.mutate(file);
  }

  function deletePhoto() {
    if (owner?.foto) deletePhotoMutation.mutate();
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
    uploadPhoto,
    deletePhoto,
    isUploadingPhoto: uploadPhotoMutation.isPending,
    isDeletingPhoto: deletePhotoMutation.isPending,
  };
}
