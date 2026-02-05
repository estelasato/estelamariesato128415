import { ownerFacade } from "@/app/facades/ownerFacade";
import type { CreateOwnerParams } from "@/domain/entities/Owner";
import { formOwnerSchema, type FormOwnerSchema } from "@/domain/validators/ownerValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function useOwnerForm() {
  const [imageProfile, setImageProfile] = useState<File | null>(null);
  const { id } = useParams();

  const ownerId = id ? Number(id) : 0;
  const isEdit = !!id;
  const navigate = useNavigate();


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

  const { data: owner, isLoading: isLoadingOwner } = useQuery({
    queryKey: ["owner", id],
    queryFn: () => ownerFacade.getOwnerById(ownerId),
    enabled: !!id,
  });

  const {mutateAsync: uploadPhotoMutation, isPending: isUploadingPhoto} = useMutation({
    mutationFn: (params: {file: File, ownerId: number}) => ownerFacade.uploadOwnerPhoto(params.ownerId, params.file),
    onSuccess: () => isEdit && toast.success("Foto salva com sucesso"),
    onError: () => toast.error("Erro ao salvar foto"),
  });

  const {mutateAsync: deletePhotoMutation, isPending: isDeletingPhoto} = useMutation({
    mutationFn: () =>
      ownerFacade.deleteOwnerPhoto({
        id: ownerId,
        fotoId: owner!.foto.id,
      }),
    onSuccess: () => toast.success("Foto removida"),
    onError: () => toast.error("Erro ao remover foto"),
  });

  const { mutateAsync: createOwner, isPending: isCreating } = useMutation({
    mutationFn: ownerFacade.createOwner,
  });

  const { mutateAsync: updateOwner, isPending: isUpdating } = useMutation({
    mutationFn: (data: CreateOwnerParams) =>
      ownerFacade.updateOwner(Number(id), data),
  });


  async function uploadPhoto(file: File) {
    if (isEdit) {
      await uploadPhotoMutation({file, ownerId});
    } else {
      setImageProfile(file);
    }
  }

  async function deletePhoto() {
    if (isEdit) {
      if (owner?.foto) deletePhotoMutation();
    } else {
      setImageProfile(null);
    }
  }

  async function handleSubmit(data: FormOwnerSchema) {
    try {
      let owner
      if (isEdit) {
        await updateOwner(data);
      } else {

        owner = await createOwner(data);
        if (imageProfile) {
          await uploadPhotoMutation({file: imageProfile, ownerId: owner.id});
        }
      }
      navigate(!!owner?.id ? `/owners/${owner.id}` : "/owners");
      toast.success("Tutor salvo com sucesso");
    } catch {
      toast.error("Erro ao salvar tutor");
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
    isLoadingOwner,
    handleSubmit,
    isPending: isCreating || isUpdating,
    owner,
    uploadPhoto,
    deletePhoto,
    isUploadingPhoto,
    isDeletingPhoto,
  };
}
