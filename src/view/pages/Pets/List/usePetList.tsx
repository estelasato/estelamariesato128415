import { petService } from "@/app/services/petService";
import type { listPetsParams } from "@/domain/entities/Pet";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useListPets() {
  const [params, setParams] = useState<listPetsParams>({
    page: 0,
    size: 10,
    nome: '',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['pets', params.nome, params.page, params.size],
    queryFn: () => petService.listPets(params),
  });

  function handleSearch(value?: string) {
    setParams((prev) => ({ ...prev, nome: value ?? '', page: 0 }));
  }

  function handlePageChange(page: number) {
    setParams((prev) => ({ ...prev, page }));
  }

  return {
    pets: data?.content ?? [],
    page: data?.page ?? 0,
    pageCount: data?.pageCount ?? 0,
    total: data?.total ?? 0,
    isLoading,
    error,
    handleSearch,
    handlePageChange,
  };
}
