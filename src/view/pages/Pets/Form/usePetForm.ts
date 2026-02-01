import { petFacade } from "@/app/facades/petFacade";
import type { CreatePetParams } from "@/domain/entities/Pet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form";
import { formPetSchema, type FormPetSchema } from "@/domain/validators/petValidator";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect} from "react";

export function usePetForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { data: pet, isLoading: isLoadingPet } = useQuery({
    queryKey: ['pet', id],
    queryFn: () => petFacade.getPet(Number(id)),
    enabled: !!id,
  })


  const form = useForm<FormPetSchema>({
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

  function handleSubmit(data: FormPetSchema) {
    try {
      const petData: CreatePetParams = {
        ...data,
        idade: data.idade !== undefined ? (typeof data.idade === 'string' ? Number(data.idade) : data.idade) : undefined,
      };
      if (isEdit) {
        updatePet(petData);
      } else {
        createPet(petData);
      }
      navigate(isEdit ? `/pets/${id}` : "/pets");
      toast.success("Pet salvo com sucesso");
    } catch (error) {
      toast.error('Erro ao salvar pet');
    }
  }

  useEffect(() => {
    if (pet) {
      form.reset({
        nome: pet.nome,
        raca: pet.raca,
        idade: pet.idade ?? undefined,
      });
    }
  }, [pet]);

  return {
    handleSubmit,
    isPending: isCreating || isUpdating || isLoadingPet,
    form,
    pet,
    owners: pet?.tutores || [],
  }
}
