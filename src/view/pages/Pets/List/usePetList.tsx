import { petFacade } from "@/app/facades/petFacade";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Pet } from "@/domain/entities/Pet";
import type { PaginationParams } from "@/shared/types/pagination";

export function useListPets() {
  const [params, setParams] = useState<PaginationParams>({
    page: 0,
    size: 10,
    pageCount: 0,
    total: 0,
  });
  const [search, setSearch] = useState<string>('');
  const [petToDelete, setPetToDelete] = useState<Pet | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => petFacade.deletePet(id),
    onSuccess: () => {
      setPetToDelete(null);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['pets', params.page, search],
    queryFn: () => petFacade.listPets({
      page: params.page,
      size: 10,
      nome: search,
    }),
  });

  function handleConfirmDelete() {
    if (petToDelete) {
      deleteMutation.mutate(petToDelete.id);
    }
  }

  useEffect(() => {
    if (data) {
      setParams((prev: any) => ({
        size: data.size ?? prev.size,
        page: data.page ?? prev.page,
        pageCount: data.pageCount ?? prev.pageCount,
        total: data.total ?? prev.total
      }));
    }
  }, [data]);

  return {
    pets: data?.content ?? [],
    params,
    total: data?.total ?? 0,
    isLoading,
    error,
    setSearch,
    setParams,
    petToDelete,
    setPetToDelete,
    handleConfirmDelete,
    isDeleting: deleteMutation.isPending,
  };
}
