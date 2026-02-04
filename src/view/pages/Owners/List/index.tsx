import { ListHeader } from "@/view/components/listHeader";
import { useListOwners } from "./useOwnerList";
import { Pagination } from "@/view/components/ui/pagination";
import { Spinner } from "@/view/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { OwnerCard } from "../components/ownerCard";
import { DeleteModal } from "@/view/components/deleteModal";

export default function OwnerList() {
  const {
    owners,
    params,
    isLoading,
    handleSearch,
    handlePageChange,
    ownerToDelete,
    setOwnerToDelete,
    openDeleteModal,
    handleConfirmDelete,
    isDeleting,
  } = useListOwners();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <ListHeader
        title="Tutores"
        textButton="Novo Tutor"
        onRegister={() => navigate("/owners/create")}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner className="size-10" />
        </div>
      ) : owners.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Nenhum tutor encontrado
        </div>
      ) : (
        <>
          <div className="grid w-full grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {owners.map((owner) => (
              <OwnerCard
                key={owner.id}
                owner={owner}
                onClick={() => navigate(`/owners/${owner.id}`)}
                onEdit={(e) => {
                  e.stopPropagation();
                  navigate(`/owners/${owner.id}/edit`);
                }}
                onDelete={() => openDeleteModal(owner)}
              />
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
      <DeleteModal
        open={!!ownerToDelete}
        onOpenChange={(open) => !open && setOwnerToDelete(null)}
        title="Excluir tutor"
        description={`Excluir o tutor "${ownerToDelete?.nome ?? ""}"? Essa ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        onCancel={() => setOwnerToDelete(null)}
      />
    </div>
  );
}
