import { ListHeader } from "@/view/components/listHeader";
import { useListPets } from "./usePetList";
import { PetCard } from "../components/petCard";
import { Pagination } from "@/view/components/ui/pagination";
import { Spinner } from "@/view/components/ui/spinner";

export default function PetList() {
  const {
    pets,
    page,
    pageCount,
    isLoading,
    handleSearch,
    handlePageChange
  } = useListPets();

  return (
    <div className="flex flex-col gap-6">
      <ListHeader
        title="Pets"
        textButton="Novo Pet"
        onRegister={() => {}}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner className="size-10" />
        </div>
      ) : pets.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Nenhum pet encontrado
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onClick={() => {}} />
            ))}
          </div>

          {pageCount > 1 && (
            <Pagination
              page={page}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
