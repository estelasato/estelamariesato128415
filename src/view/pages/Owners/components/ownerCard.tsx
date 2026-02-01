import type { Owner } from "@/domain/entities/Owner";
import { User, Mail, Phone, MapPin, PawPrint, Pencil, Trash2 } from "lucide-react";

interface OwnerCardProps {
  owner: Owner;
  totalPets?: number;
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export function OwnerCard({ owner, totalPets, onClick, onEdit, onDelete }: OwnerCardProps) {
  const data = [
    { icon: Mail, label: owner?.email || "-" },
    { icon: Phone, label: owner?.telefone || "-" },
    { icon: MapPin, label: owner?.endereco || "-" },
  ];

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
            aria-label="Editar tutor"
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
            aria-label="Excluir tutor"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>

      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {owner.foto?.url ? (
          <img
            src={owner.foto.url}
            alt={owner.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="size-12 text-muted-foreground" />
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg truncate">{owner.nome}</h3>

        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <item.icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </div>
        ))}

        {totalPets !== undefined && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <PawPrint className="size-4 shrink-0" />
            <span>
              {totalPets} {totalPets === 1 ? "pet" : "pets"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
