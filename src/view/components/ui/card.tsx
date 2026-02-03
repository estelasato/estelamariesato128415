import type { LucideIcon } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";

export interface CardProps {
  onClick?: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  editAriaLabel: string;
  deleteAriaLabel: string;
  avatar?: { url?: string; alt: string };
  emptyAvatarIcon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Card({
  onClick,
  onEdit,
  onDelete,
  editAriaLabel,
  deleteAriaLabel,
  avatar,
  emptyAvatarIcon: EmptyAvatarIcon,
  title,
  children,
  className = "",
  contentClassName = "gap-2",
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col bg-card rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow ${className}`.trim()}
    >
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(e);
          }}
          className="p-1.5 cursor-pointer rounded-md bg-white border border-border shadow-sm"
          aria-label={editAriaLabel}
        >
          <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          className="p-1.5 cursor-pointer rounded-md bg-white border border-border shadow-sm text-destructive hover:text-destructive"
          aria-label={deleteAriaLabel}
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <div className={`p-4 flex flex-col ${contentClassName}`}>
        <div className="aspect-square bg-orange-50 flex items-center justify-center rounded-lg overflow-hidden">
          {avatar?.url ? (
            <img
              src={avatar.url}
              alt={avatar.alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <EmptyAvatarIcon className="size-12 text-orange-300" />
          )}
        </div>
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        {children}
      </div>
    </div>
  );
}
