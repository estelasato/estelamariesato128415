import { useNavigate, useParams } from "react-router-dom";
import { useOwnerDetail } from "./useOwnerDetail";
import { Button } from "@/view/components/ui/button";
import { Spinner } from "@/view/components/ui/spinner";
import { Combobox } from "@/view/components/ui/combobox";
import { ArrowLeftIcon, Pencil, User } from "lucide-react";
import { PetInfoCard } from "../components/petInfoCard";

export default function OwnerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    owner,
    isLoading,
    availablePets,
    selectedPetId,
    handleSelectPet,
    removePetFromOwner,
    isAddingPet,
    isRemovingPet,
  } = useOwnerDetail();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="flex flex-col gap-4 md:max-w-xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/owners")}>
          <ArrowLeftIcon className="size-5" />
          <span className="text-md">Voltar para a lista</span>
        </div>
        <p className="text-muted-foreground">Tutor não encontrado.</p>
      </div>
    );
  }

  const pets = owner?.pets ?? [];

  return (
    <div className="flex flex-col gap-6 md:max-w-xl mx-auto">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/owners")}
      >
        <ArrowLeftIcon className="size-5" />
        <span className="text-md">Voltar para a lista</span>
      </div>

      <div className="rounded-xl shadow-sm bg-card p-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg bg-orange-50 flex items-center justify-center overflow-hidden">
            {owner.foto?.url ? (
              <img
                src={owner.foto.url}
                alt={owner.foto.nome ?? owner.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="size-12 text-orange-300" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              {owner.nome ?? "—"}
            </h1>
            <p className="text-sm text-muted-foreground">E-mail: {owner.email ?? "—"}</p>
            <p className="text-sm text-muted-foreground">Telefone: {owner.telefone ?? "—"}</p>
            <p className="text-sm text-muted-foreground">Endereço: {owner.endereco ?? "—"}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(`/owners/${id}/edit`)}>
          <Pencil className="size-4 mr-2" />
          Editar
        </Button>
      </div>

      <div className="flex flex-col gap-5 rounded-xl shadow-sm bg-white p-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Vincular pet</h2>
          <Combobox
            placeholder="Selecione um pet"
            searchPlaceholder="Procurar pet..."
            emptyText="Nenhum pet encontrado."
            value={selectedPetId}
            onValueChange={handleSelectPet}
            options={availablePets?.map((p) => ({
              label: p.nome,
              value: String(p.id),
            })) ?? []}
            disabled={isAddingPet || availablePets.length === 0}
          />
        </div>
        {pets.length > 0 ? (
          <div className="flex flex-col gap-2 mb-4">
            {pets.map((pet) => (
              <PetInfoCard
                key={pet.id}
                nome={pet.nome}
                raca={pet.raca}
                idade={pet.idade}
                onClick={() => navigate(`/pets/${pet.id}`)}
                onRemove={() => removePetFromOwner(pet.id)}
                disabled={isRemovingPet}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">Nenhum pet vinculado a este tutor.</p>
        )}
      </div>
    </div>
  );
}
