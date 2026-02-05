import { petFacade } from "@/app/facades/petFacade";
import type { CreatePetParams } from "@/domain/entities/Pet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form";
import { formPetSchema, type FormPetSchema, type FormPetSchemaInput } from "@/domain/validators/petValidator";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export function usePetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageProfile, setImageProfile] = useState<File | null>(null);

  const isEdit = !!id;

  const { data: pet, isLoading: isLoadingPet } = useQuery({
    queryKey: ['pet', id],
    queryFn: () => petFacade.getPet(Number(id)),
    enabled: !!id,
  })

  const form = useForm<FormPetSchemaInput, unknown, FormPetSchema>({
    resolver: zodResolver(formPetSchema),
    defaultValues: {
      nome: '',
      raca: '',
      idade: undefined,
    },
  })

  const { mutateAsync: createPet, isPending: isCreating } = useMutation({
    mutationFn: petFacade.createPet,
  })

  const { mutateAsync: updatePet, isPending: isUpdating } = useMutation({
    mutationFn: (data: CreatePetParams) => petFacade.updatePet(Number(id), data),
  })

  const { mutateAsync: uploadPhotoMutation, isPending: isUploadingPhoto } = useMutation({
    mutationFn: (params: { file: File, petId: number }) => petFacade.uploadPetPhoto(params.petId, params.file),
    onSuccess: () => isEdit && toast.success("Foto salva com sucesso"),
    onError: () => toast.error("Erro ao salvar foto"),
  })

  const { mutateAsync: deletePhotoMutation, isPending: isDeletingPhoto } = useMutation({
    mutationFn: () =>
      petFacade.deletePetPhoto({
        id: Number(id),
        fotoId: pet?.foto?.id ?? 0,
      }),
    onSuccess: () => toast.success("Foto removida"),
    onError: () => toast.error("Erro ao remover foto"),
  })

  async function uploadPhoto(file: File) {
    if (isEdit) {
      await uploadPhotoMutation({ file, petId: Number(id) });
    } else {
      setImageProfile(file);
    }
  }

  async function deletePhoto() {
    if (isEdit) {
      if (pet?.foto) await deletePhotoMutation();
    } else {
      setImageProfile(null);
    }
  }

  const handleSubmit: SubmitHandler<FormPetSchema> = async (data) => {
    try {
      let pet
      const petData: CreatePetParams = {
        ...data,
        idade: !!data.idade ? Number(data.idade) : undefined,
      };
      if (isEdit) {
        await updatePet(petData);
      } else {
        pet = await createPet(petData);
        if (imageProfile) {
          await uploadPhotoMutation({ file: imageProfile, petId: pet.id });
        }
      }
      navigate(!!pet?.id ? `/pets/${pet.id}` : "/pets");
      toast.success("Pet salvo com sucesso");
    } catch (error) {
      toast.error('Erro ao salvar pet');
    }
  };

  useEffect(() => {
    if (pet) {
      form.reset({
        nome: pet.nome,
        raca: pet.raca,
        idade: pet?.idade ? String(pet.idade) : undefined,
      });
    }
  }, [pet]);

  return {
    handleSubmit,
    isLoadingPet,
    isPending: isCreating || isUpdating,
    form,
    pet,
    owners: pet?.tutores || [],
    uploadPhoto,
    deletePhoto,
    isUploadingPhoto,
    isDeletingPhoto,
  }
}
