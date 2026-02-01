import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOwnerForm } from "./useOwnerForm";
import { Controller, FormProvider } from "react-hook-form";
import { Input } from "@/view/components/ui/input";
import { Button } from "@/view/components/ui/button";
import { Select } from "@/view/components/ui/select";
import { ArrowLeftIcon, Trash2 } from "lucide-react";

export default function OwnerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [selectedPetId, setSelectedPetId] = useState("");

  const {
    form,
    handleSubmit,
    isPending,
    owner,
    availablePets,
    addPetToOwner,
    removePetFromOwner,
    isAddingPet,
    isRemovingPet,
  } = useOwnerForm();

  const { errors } = form.formState;

  const handleAddPet = (value: string) => {
    if (!value) return;
    addPetToOwner(Number(value));
    setSelectedPetId("");
  };
  return (
    <div className="flex flex-col gap-6 md:max-w-xl mx-auto">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/owners")}
      >
        <ArrowLeftIcon className="size-5" />
        <span className="text-md">Voltar para a lista</span>
      </div>

      <FormProvider {...form}>
        <div className="border border-border p-6 rounded-xl">
          <h1 className="text-2xl font-bold mb-4">
            {isEdit ? "Editar Tutor" : "Cadastrar Tutor"}
          </h1>

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
            <Input
              {...form.register("telefone")}
              label="Telefone*"
              mask="cell"
              error={errors.telefone?.message}
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

        {isEdit && (
          <div className="border border-border p-6 rounded-xl">
            <h2 className="font-semibold text-lg mb-4">Pets vinculados</h2>
            {owner?.pets && owner.pets.length > 0 ? (
              <ul className="flex flex-col gap-2 mb-4">
                {owner.pets.map((pet) => (
                  <li
                    key={pet.id}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 bg-muted/50"
                  >
                    <span className="font-medium">{pet.nome}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePetFromOwner(pet.id)}
                      disabled={isRemovingPet}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">Nenhum pet vinculado.</p>
            )}
            <div className="flex flex-col gap-2">
              <Select
                label="Vincular pet"
                placeholder="Selecione um pet"
                value={selectedPetId}
                onValueChange={handleAddPet}
                options={availablePets.map((p) => ({
                  label: p.nome,
                  value: String(p.id),
                }))}
                disabled={isAddingPet || availablePets.length === 0}
              />
              {availablePets.length === 0 && owner?.pets && owner.pets.length > 0 && (
                <p className="text-xs text-muted-foreground">Todos os pets já estão vinculados.</p>
              )}
            </div>
          </div>
        )}
      </FormProvider>
    </div>
  );
}
