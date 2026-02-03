import type { Pet } from "@/domain/entities/Pet";
import { Card } from "@/view/components/ui/card";
import { PawPrint } from "lucide-react";

interface PetCardProps {
  pet: Pet;
  onClick?: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function PetCard({ pet, onClick, onEdit, onDelete }: PetCardProps) {
  return (
    <Card
      onClick={onClick}
      onEdit={onEdit}
      onDelete={onDelete}
      editAriaLabel="Editar pet"
      deleteAriaLabel="Excluir pet"
      avatar={pet.foto?.url ? { url: pet.foto.url, alt: pet.nome } : undefined}
      emptyAvatarIcon={PawPrint}
      title={pet.nome}
      className="w-full max-w-[300px] min-w-0"
      contentClassName="gap-1"
    >
      <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
        {pet.raca}
      </p>
      <p className="text-sm text-muted-foreground">
        {pet.idade} {pet.idade === 1 ? "ano" : "anos"}
      </p>
    </Card>
  );
}
