import { useNavigate, useParams } from "react-router-dom";
import { usePetForm } from "./usePetForm";
import { Input } from "@/view/components/ui/input";
import { Button } from "@/view/components/ui/button";
import { ImageUpload } from "@/view/components/imageUpload";
import { ArrowLeftIcon } from "lucide-react";

export default function PetForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const {
    form,
    handleSubmit,
    isPending,
    pet,
    uploadPhoto,
    deletePhoto,
    isUploadingPhoto,
    isDeletingPhoto,
  } = usePetForm();

  const { errors } = form.formState;

  return (
    <div className="flex flex-col gap-6 md:max-w-xl mx-auto">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/pets")}
      >
        <ArrowLeftIcon className="size-5" />
        <span className="text-md">
          Voltar para a lista
        </span>
      </div>

      <div className="shadow-md p-6 rounded-xl bg-white">
        <h1 className="text-2xl text-center sm:text-left font-bold mb-4">
          {isEdit ? "Editar Pet" : "Cadastrar Pet"}
        </h1>
        <div className="justify-items-center sm:justify-items-start">
        {isEdit && (
          <ImageUpload
            imageUrl={pet?.foto?.url}
            imageAlt={pet?.foto?.nome}
            onUpload={uploadPhoto}
            onRemove={deletePhoto}
            isLoading={isUploadingPhoto}
            isDeleting={isDeletingPhoto}
            className="mb-6"
          />
        )}
        </div>

        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <Input
            {...form.register("nome")}
            label="Nome*"
            error={errors.nome?.message}
          />
          <Input
            {...form.register("raca")}
            label="Raça"
            error={errors.raca?.message}
          />
          <Input
            {...form.register("idade")}
            label="Idade"
            error={errors.idade?.message}
          />

          <Button type="submit" isLoading={isPending}>
            {isEdit ? "Salvar" : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
