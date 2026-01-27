import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const canGoPrevious = page > 0;
  const canGoNext = page < pageCount - 1;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(0)}
        disabled={!canGoPrevious}
      >
        <ChevronsLeft className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrevious}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <span className="text-sm text-muted-foreground px-2">
        Página {page + 1} de {pageCount || 1}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoNext}
      >
        <ChevronRight className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(pageCount - 1)}
        disabled={!canGoNext}
      >
        <ChevronsRight className="size-4" />
      </Button>
    </div>
  );
}
