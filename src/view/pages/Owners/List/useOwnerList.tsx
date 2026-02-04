import { ownerFacade } from "@/app/facades/ownerFacade";
import type { Owner } from "@/domain/entities/Owner";
import type { PaginationParams } from "@/shared/types/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useListOwners() {
  const [params, setParams] = useState<PaginationParams>({
    page: 0,
    size: 10,
    pageCount: 0,
    total: 0,
  });

  const [search, setSearch] = useState<string>("");
  const [ownerToDelete, setOwnerToDelete] = useState<Owner | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ownerFacade.deleteOwner(id),
    onSuccess: () => {
      setOwnerToDelete(null);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['owners', params.page, search],
    queryFn: () => ownerFacade.listOwners({
      page: params.page,
      size: 10,
      nome: search,
    }),
  });

  function handleSearch(value?: string) {
    setSearch(value ?? '');
  }

  function handlePageChange(page: number) {
    setParams((prev: any) => ({ ...prev, page }));
  }

  function openDeleteModal(owner: Owner) {
    setOwnerToDelete(owner);
  }

  function handleConfirmDelete() {
    if (ownerToDelete) {
      deleteMutation.mutate(ownerToDelete.id);
    }
  }

  useEffect(() => {
    if (data) {
      setParams((prev: PaginationParams) => ({
        size: data.size ?? prev.size,
        page: data.page ?? prev.page,
        pageCount: data.pageCount ?? prev.pageCount,
        total: data.total ?? prev.total
      }));
    }
  }, [data]);

  return {
    owners: data?.content ?? [],
    params,
    total: data?.total ?? 0,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
    ownerToDelete,
    setOwnerToDelete,
    openDeleteModal,
    handleConfirmDelete,
    isDeleting: deleteMutation.isPending,
  };
}
