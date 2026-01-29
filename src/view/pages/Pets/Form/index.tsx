import { useNavigate, useParams } from "react-router-dom";
import { usePetForm } from "./usePetForm";
import { FormProvider } from "react-hook-form";
import { Input } from "@/view/components/ui/input";
import { Button } from "@/view/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function PetForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { form, handleSubmit, isPending, owners } = usePetForm();

  return (
    <div className="flex flex-col gap-6 md:max-w-xl mx-auto">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/pets')}>
        <ArrowLeftIcon onClick={() => navigate('/pets')} />
        <h1 className="text-md fmb-4">Voltar para a lista</h1>
      </div>
      <FormProvider {...form}>

        <div className=" border border-border p-6 rounded-xl">
          <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Pet' : 'Cadastrar Pet'}</h1>

          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>

            <Input {...form.register('nome')} label="Nome*" error={form.formState.errors.nome?.message} />
            <Input {...form.register('raca')} label="Raça*" error={form.formState.errors.raca?.message} />
            <Input {...form.register('idade')} label="Idade*" error={form.formState.errors.idade?.message} />

            {owners?.map((owner) => (
              <div key={owner.id}>{owner.nome} - {owner.telefone}</div>
            ))}
            <Button type="submit" isLoading={isPending}>{isEdit ? 'Salvar' : 'Cadastrar'}</Button>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
