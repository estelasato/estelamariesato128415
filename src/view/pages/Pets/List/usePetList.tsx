import { petFacade } from "@/app/facades/petFacade";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useListPets() {
  const [params, setParams] = useState<any>({
    page: 0,
    size: 10,
    pageCount: 0,
    total: 0,
  });

  const [search, setSearch] = useState<string>('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['pets', params.page, search],
    queryFn: () => petFacade.listPets({
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
    handleSearch,
    handlePageChange,
  };
}
