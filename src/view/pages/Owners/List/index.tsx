import { ListHeader } from "@/view/components/listHeader";
import { useListOwners } from "./useOwnerList";
import { Pagination } from "@/view/components/ui/pagination";
import { Spinner } from "@/view/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { OwnerCard } from "../components/ownerCard";

export default function OwnerList() {
  const {
    owners,
    params,
    isLoading,
    handleSearch,
    handlePageChange
  } = useListOwners();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <ListHeader
        title="Tutores"
        textButton="Novo Tutor"
        onRegister={() => navigate('/owners/create')}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner className="size-10" />
        </div>
      ) : owners.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Nenhum pet encontrado
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {owners.map((owner) => (
              <OwnerCard key={owner.id} owner={owner} onClick={() => navigate(`/owners/${owner.id}`)} />
            ))}
          </div>

          {params?.pageCount && params?.pageCount > 1 && (
            <Pagination
              page={params.page}
              pageCount={params?.pageCount ?? 0}
              onPageChange={(page) => handlePageChange(page)}
            />
          )}
        </>
      )}
    </div>
  );
}
