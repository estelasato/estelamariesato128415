import { useNavigate, useParams } from "react-router-dom";
import { useOwnerForm } from "./useOwnerForm";
import { Controller } from "react-hook-form";
import { Input } from "@/view/components/ui/input";
import { Button } from "@/view/components/ui/button";
import { ImageUpload } from "@/view/components/imageUpload";
import { ArrowLeftIcon } from "lucide-react";
import { Spinner } from "@/view/components/ui/spinner";

export default function OwnerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const {
    form,
    isLoadingOwner,
    handleSubmit,
    isPending,
    owner,
    uploadPhoto,
    deletePhoto,
    isUploadingPhoto,
    isDeletingPhoto,
  } = useOwnerForm();

  const { errors } = form.formState;

  if (isLoadingOwner) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:max-w-xl mx-auto">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="size-5" />
        <span className="text-md">
          Voltar
        </span>
      </div>

      <div className="shadow-md p-6 rounded-xl bg-white">
        <h1 className="text-2xl text-center sm:text-left font-bold mb-4">
          {isEdit ? "Editar Tutor" : "Cadastrar Tutor"}
        </h1>
        <div className="justify-items-center sm:justify-items-start">
          <ImageUpload
            imageUrl={owner?.foto?.url}
            imageAlt={owner?.foto?.nome}
            onUpload={uploadPhoto}
            onRemove={deletePhoto}
            isLoading={isUploadingPhoto}
            isDeleting={isDeletingPhoto}
            className="mb-6"
          />
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Input
            {...form.register("nome")}
            label="Nome*"
            error={errors.nome?.message}
          />
          <Input
            {...form.register("email")}
            label="E-mail*"
            type="email"
            error={errors.email?.message}
          />

          <Controller
            name="telefone"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                label="Telefone*"
                mask="cell"
                error={errors.telefone?.message}
              />
            )}
          />

          <Input
            {...form.register("endereco")}
            label="Endereço*"
            error={errors.endereco?.message}
          />
          <Controller
            name="cpf"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                label="CPF*"
                mask="cpf"
                value={field.value ?? ""}
                error={errors.cpf?.message}
              />
            )}
          />

          <Button type="submit" isLoading={isPending}>
            {isEdit ? "Salvar" : "Cadastrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
