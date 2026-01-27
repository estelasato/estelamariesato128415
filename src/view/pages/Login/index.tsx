import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { FormProvider } from "react-hook-form";
import { useLogin } from "./useLogin";

export default function Login() {
  const { form, handleSubmit, isLoading } = useLogin();

  return (
    <div className="border border-border rounded-lg p-6 sm:p-8 md:p-10 w-lg sm:w-sm md:w-md lg:w-lg mx-6 mt-10 sm:mt-16 md:mt-20">
      <h1 className="text-2xl font-bold mb-6">Bem vindo!</h1>
      <FormProvider {...form}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input {...form.register('username')}
              error={form.formState.errors.username?.message}
              id="email" type="email" placeholder="Digite seu e-mail" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input {...form.register('password')} id="password" type="password" placeholder="Digite sua senha" />
          </div>

          <Button isLoading={isLoading} className="w-full" onClick={handleSubmit}>Entrar</Button>
        </div>
      </FormProvider>
    </div>
  )
}
