import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { FormProvider } from "react-hook-form";
import { useLogin } from "./useLogin";

export default function Login() {
  const { form, handleSubmit, isLoading } = useLogin();
  const error = form.formState.errors;

  return (
    <div className="border border-border rounded-lg p-6 sm:p-8 md:p-10 w-lg sm:w-sm md:w-md lg:w-lg mx-6 mt-10 sm:mt-16 md:mt-20">
      <h1 className="text-2xl font-bold mb-6">Bem vindo!</h1>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input {...form.register('username')}
            label="Username"
            error={error.username?.message}
            id="email" placeholder="Digite seu username"
          />

          <Input
            error={error.password?.message}
            label="Senha"
            isPassword
            {...form.register('password')}
            id="password"
            type="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit" isLoading={isLoading} className="w-full">Entrar</Button>
        </form>
      </FormProvider>
    </div>
  )
}
