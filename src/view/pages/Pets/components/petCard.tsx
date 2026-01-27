import type { Pet } from "@/domain/entities/Pet";
import { PawPrint } from "lucide-react";

interface PetCardProps {
  pet: Pet;
  onClick?: () => void;
}

export function PetCard({ pet, onClick }: PetCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {pet.foto?.url ? (
          <img
            src={pet.foto.url}
            alt={pet.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <PawPrint className="size-12 text-muted-foreground" />
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-lg truncate">{pet.nome}</h3>
        <p className="text-sm text-muted-foreground">{pet.raca}</p>
        <p className="text-sm text-muted-foreground">
          {pet.idade} {pet.idade === 1 ? "ano" : "anos"}
        </p>
      </div>
    </div>
  );
}
