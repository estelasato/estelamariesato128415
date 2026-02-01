import { useNavigate, useParams } from "react-router-dom";
import { usePetDetail } from "./usePetDetail";
import { Button } from "@/view/components/ui/button";
import { Spinner } from "@/view/components/ui/spinner";
import { ArrowLeftIcon, Mail, Phone, User, Pencil } from "lucide-react";

export default function PetDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pet, isLoading } = usePetDetail();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex flex-col gap-4 md:max-w-xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/pets")}>
          <ArrowLeftIcon className="size-5" />
          <span className="text-md">Voltar para a lista</span>
        </div>
        <p className="text-muted-foreground">Pet não encontrado.</p>
      </div>
    );
  }

  const tutores = pet.tutores ?? [];

  return (
    <div className="flex flex-col gap-6 md:max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/pets")}
        >
          <ArrowLeftIcon className="size-5" />
          <span className="text-md">Voltar para a lista</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(`/pets/${id}/edit`)}>
          <Pencil className="size-4 mr-2" />
          Editar
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          {pet.nome}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {pet.raca} · {pet.idade != null ? `${pet.idade} ${Number(pet.idade) === 1 ? "ano" : "anos"}` : "—"}
        </p>
      </div>

      {tutores.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg">Tutores</h2>
          <div className="flex flex-col gap-2">
            {tutores.map((tutor) => (
              <div
                key={tutor.id}
                className="flex flex-col gap-1 rounded-md border border-border bg-muted/30 px-4 py-3"
              >
                <div className="flex items-center gap-2 font-medium">
                  <User className="size-4 text-muted-foreground" />
                  {tutor.nome}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-3.5" />
                  {tutor.telefone || "—"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-3.5" />
                  {tutor.email || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhum tutor vinculado a este pet.</p>
      )}
    </div>
  );
}
