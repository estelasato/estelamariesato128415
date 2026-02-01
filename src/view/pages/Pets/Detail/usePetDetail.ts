import { petFacade } from "@/app/facades/petFacade";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function usePetDetail() {
  const { id } = useParams();
  const petId = id ? Number(id) : 0;

  const { data: pet, isLoading } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => petFacade.getPet(petId),
    enabled: !!id,
  });

  return { pet, isLoading };
}
