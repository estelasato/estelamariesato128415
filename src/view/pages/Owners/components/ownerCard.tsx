import type { Owner } from "@/domain/entities/Owner";
import { Card } from "@/view/components/ui/card";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface OwnerCardProps {
  owner: Owner;
  onClick?: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function OwnerCard({ owner, onClick, onEdit, onDelete }: OwnerCardProps) {
  const data = [
    { icon: Mail, label: owner?.email || "-" },
    { icon: Phone, label: owner?.telefone || "-" },
    { icon: MapPin, label: owner?.endereco || "-" },
  ];

  return (
    <Card
      onClick={onClick}
      onEdit={onEdit}
      onDelete={onDelete}
      editAriaLabel="Editar tutor"
      deleteAriaLabel="Excluir tutor"
      avatar={
        owner.foto?.url ? { url: owner.foto.url, alt: owner.nome } : undefined
      }
      emptyAvatarIcon={User}
      title={owner.nome}
      contentClassName="gap-2"
    >
      {data.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <item.icon className="size-4 shrink-0" />
          <span className="truncate">{item.label}</span>
        </div>
      ))}
    </Card>
  );
}
