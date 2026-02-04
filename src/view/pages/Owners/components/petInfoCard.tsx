import { PawPrint, Trash2 } from "lucide-react";
import { Button } from "@/view/components/ui/button";

interface PetInfoCardProps {
  nome: string;
  raca?: string;
  idade?: string | number;
  onClick: () => void;
  onRemove: () => void;
  disabled: boolean;
}

export function PetInfoCard({ nome, raca, idade, onClick, onRemove, disabled }: PetInfoCardProps) {
  const idadeText =
    idade != null
      ? `${idade} ${Number(idade) === 1 ? "ano" : "anos"}`
      : "—";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center justify-between gap-2 rounded-md border border-border bg-muted/30 px-4 py-3 hover:bg-orange-50 hover:border-orange-400"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2 font-medium">
          <PawPrint className="size-4 text-muted-foreground shrink-0" />
          {nome}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Espécie: {raca || "—"}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Idade: {idadeText}
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        disabled={disabled}
        className="text-destructive hover:text-destructive shrink-0"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
