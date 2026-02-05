import { useRef, useState, useEffect } from "react";
import { PencilIcon, Trash2Icon, ImageIcon, Loader2Icon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ImageUploadProps {
  imageUrl?: string | null;
  imageAlt?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
  isLoading?: boolean;
  isDeleting?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-20",
  md: "size-28",
  lg: "size-36",
};

export function ImageUpload({
  imageUrl,
  imageAlt = "Foto",
  onUpload,
  onRemove,
  isLoading = false,
  isDeleting = false,
  className,
  size = "lg",
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(imageUrl ?? null);
  const dimension = sizeClasses[size];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    onUpload(file);
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        className={cn(
          "relative rounded-xl border border-border overflow-hidden bg-muted/30 shrink-0",
          dimension,
          "group cursor-pointer"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading || isDeleting}
        />

        {image ? (
          <>
            <img
              src={image}
              alt={imageAlt}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
              )}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={isLoading}
                className="cursor-pointer p-2 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors disabled:opacity-50"
                title="Trocar foto"
              >
                <PencilIcon className="size-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                  setImage(null);
                }}
                disabled={isDeleting}
                className="cursor-pointer p-2 rounded-full bg-red-400 text-white hover:bg-red-500 transition-colors disabled:opacity-50"
                title="Remover foto"
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
            {(isLoading || isDeleting) && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-sm text-white font-medium">
                  {isLoading ? "Enviando..." : "Removendo..."}
                </span>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || isDeleting}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            <ImageIcon className="size-10" />
            <span className="text-xs font-medium">
              {isLoading || isDeleting ?( isLoading ? "Enviando..." : "Removendo..." ): "Enviar foto"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
