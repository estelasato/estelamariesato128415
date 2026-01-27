import { Plus } from "lucide-react";
import { SearchBar } from "./searchbar";
import { Button } from "./ui/button";

interface ListHeaderProps {
  title: string;
  onRegister: () => void;
  onSearch: (value?: string) => void;
  textButton?: string;
}

export function ListHeader(props: ListHeaderProps) {
  const { title, onRegister, onSearch, textButton = 'Cadastrar' } = props;

  return (
    <div className="flex flex-col gap-4">

      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex w-full flex-1 flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <SearchBar onSearch={onSearch} className="w-full md:w-1/3 "/>
        <Button onClick={onRegister} className="bg-orange-400 w-full md:w-auto hover:bg-orange-300">
          <Plus className="size-4" />
          {textButton}
        </Button>
      </div>
    </div>
  )
}
