import { ListHeader } from "@/view/components/listHeader";
import { useListPets } from "./usePetList";
import { PetCard } from "../components/petCard";
import { Pagination } from "@/view/components/ui/pagination";
import { Spinner } from "@/view/components/ui/spinner";

import { useNavigate } from "react-router-dom";
import { DeleteModal } from "@/view/components/deleteModal";

export default function PetList() {
  const {
    pets,
    params,
    isLoading,
    setSearch,
    setParams,
    petToDelete,
    setPetToDelete,
    handleConfirmDelete,
    isDeleting,
  } = useListPets();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <ListHeader
        title="Pets"
        textButton="Novo Pet"
        onRegister={() => navigate('/pets/create')}
        onSearch={(value) => setSearch(value ?? '')}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner className="size-10" />
        </div>
      ) : pets.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-gray-400">
          Nenhum pet encontrado
        </div>
      ) : (
        <>
          <div
            className="grid w-full grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onClick={() => navigate(`/pets/${pet.id}`)}
                onEdit={() => navigate(`/pets/${pet.id}/edit`)}
                onDelete={() => setPetToDelete(pet)}
              />
            ))}
          </div>

          {params?.pageCount && params?.pageCount > 1 && (
            <Pagination
              page={params.page}
              pageCount={params?.pageCount ?? 0}
              onPageChange={(page) => setParams((prev: any) => ({ ...prev, page }))}
            />
          )}
        </>
      )}

      <DeleteModal
        open={!!petToDelete}
        onOpenChange={(open) => !open && setPetToDelete(null)}
        title="Excluir pet"
        description={`Excluir o pet "${petToDelete?.nome ?? ""}"? Essa ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        onCancel={() => setPetToDelete(null)}
      />
    </div>
  );
}
