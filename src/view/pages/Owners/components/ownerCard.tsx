import type { Owner } from "@/domain/entities/Owner";
import { User, Mail, Phone, MapPin, PawPrint } from "lucide-react";

interface OwnerCardProps {
  owner: Owner;
  totalPets?: number;
  onClick?: () => void;
}

export function OwnerCard({ owner, totalPets, onClick }: OwnerCardProps) {

  const data = [
    { icon: Mail,label: owner?.email || '-' },
    {icon: Phone, label: owner?.telefone || '-'},
    {icon: MapPin, label: owner?.endereco || '-'},
  ]

  return (
    <div
      onClick={onClick}
      className="flex flex-col bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
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
