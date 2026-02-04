import { Mail, Phone, Trash2, User } from "lucide-react";
import { Button } from "@/view/components/ui/button";

interface IOwnerInfoCard {
  nome: string;
  telefone?: string;
  email?: string;
  onDelete: () => void;
  onClick: () => void;
  disabled: boolean;
}

export function OwnerInfoCard({ nome, telefone, email, onDelete, onClick, disabled }: IOwnerInfoCard) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3 hover:bg-orange-50 hover:border-orange-400"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2 font-medium">
          <User className="size-4 text-muted-foreground shrink-0" />
          {nome}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="size-3.5 shrink-0" />
          {telefone || "—"}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="size-3.5 shrink-0" />
          {email || "—"}
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        disabled={disabled}
        className="text-destructive hover:text-destructive shrink-0"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
