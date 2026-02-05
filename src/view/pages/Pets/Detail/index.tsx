import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePetDetail } from "./usePetDetail";
import { Spinner } from "@/view/components/ui/spinner";
import { Combobox } from "@/view/components/ui/combobox";
import { DeleteModal } from "@/view/components/deleteModal";
import { ArrowLeftIcon, PawPrint, Pencil, Trash2 } from "lucide-react";
import { OwnerInfoCard } from "../components/ownerInfoCard";

export default function PetDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const {
    pet,
    isLoading,
    availableOwners,
    selectedOwnerId,
    handleSelectOwner,
    removeOwnerFromPet,
    handleConfirmDelete,
    isDeleting,
    isAddingOwner,
    isRemovingOwner,
  } = usePetDetail();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex flex-col gap-4 md:max-w-xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="size-5" />
          <span className="text-md">Voltar</span>
        </div>
        <p className="text-muted-foreground">Pet não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:max-w-xl mx-auto">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/pets")}
      >
        <ArrowLeftIcon className="size-5" />
        <span className="text-md">Voltar</span>
      </div>


      <div className="rounded-xl shadow-sm bg-card p-5 flex items-center sm:items-start flex-col sm:flex-row justify-between gap-4 ">
        <div className="flex items-center flex-col sm:flex-row gap-4">
          {pet.foto?.url ? (
            <img
              src={pet.foto?.url ?? ""}
              alt={pet.foto?.nome}
              className="w-24 h-24 object-cover rounded-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-orange-50 flex items-center justify-center rounded-lg">
              <PawPrint className="size-12 text-orange-300" />
            </div>
          )}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              {pet.nome ?? "—"}
            </h1>

            <p className="text-sm text-muted-foreground">
              Espécie: {pet.raca ?? "—"}
            </p>
            <p className="text-sm text-muted-foreground">
              Idade: {pet.idade != null ? `${pet.idade} ${Number(pet.idade) === 1 ? "ano" : "anos"}` : "—"}
            </p>
          </div>
        </div>
        <div className=" flex gap-1">
          <button
            onClick={() => navigate(`/pets/${id}/edit`)}
            className="p-1.5 cursor-pointer rounded-md bg-white border border-border shadow-sm"
            aria-label="Editar pet"
          >
            <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="p-1.5 cursor-pointer rounded-md bg-white border border-border shadow-sm text-destructive hover:text-destructive"
            aria-label="Excluir pet"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

      </div>

      <div className="flex flex-col gap-5 rounded-xl shadow-sm bg-white p-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Vincular tutor</h2>
          <Combobox
            placeholder="Selecione um tutor"
            searchPlaceholder="Procurar tutor..."
            emptyText="Nenhum tutor encontrado."
            value={selectedOwnerId}
            onValueChange={handleSelectOwner}
            options={availableOwners?.map((o) => ({
              label: o.nome,
              value: String(o.id),
            })) ?? []}
            disabled={isAddingOwner || availableOwners.length === 0}
          />
        </div>
        {pet?.tutores?.length > 0 ? (
          <div className="flex flex-col gap-2 mb-4">
            {pet.tutores.map((tutor) => (
              <OwnerInfoCard
                nome={tutor.nome}
                telefone={tutor.telefone}
                email={tutor.email}
                onDelete={() => removeOwnerFromPet(tutor.id)}
                onClick={() => navigate(`/owners/${tutor.id}`)}
                disabled={isRemovingOwner}
                key={tutor.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">Nenhum tutor vinculado a este pet.</p>
        )}

      </div>

      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={(open) => !open && setDeleteModalOpen(false)}
        title="Excluir pet"
        description={`Excluir o pet "${pet?.nome ?? ""}"? Essa ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}
