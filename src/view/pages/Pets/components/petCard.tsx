import type { Pet } from "@/domain/entities/Pet";
import { PawPrint, Pencil, Trash2 } from "lucide-react";

interface PetCardProps {
  pet: Pet;
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export function PetCard({ pet, onClick, onEdit, onDelete }: PetCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(e);
            }}
            className="p-1.5 rounded-md bg-background/80 hover:bg-background border border-border shadow-sm"
            aria-label="Editar pet"
          >
            <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
            className="p-1.5 rounded-md bg-background/80 hover:bg-background border border-border shadow-sm text-destructive hover:text-destructive"
            aria-label="Excluir pet"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>

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
