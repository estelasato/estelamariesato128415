import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { useLogin } from "./useLogin";
import logo from "@/assets/logo.png";

export default function Login() {
  const { form, handleSubmit, isLoading } = useLogin();
  const error = form.formState.errors;

  return (
    <div className="backdrop-blur-xl shadow-2xl bg-background/80 rounded-lg p-6 sm:p-8 md:p-10 w-lg sm:w-sm md:w-md lg:w-lg mx-6 ">
      <img src={logo} alt="Logo" className=" w-18 h-18 object-contain mx-auto" />
      <h1 className="text-2xl font-extrabold text-center mb-3 mt-4">
        <span className="bg-gradient-to-r from-orange-700 via-orange-400 to-amber-200 bg-clip-text text-transparent">
          PetRegistry
        </span>
      </h1>
      <h1 className="text-xl font-bold mb-5 text-center text-gray-700">Bem vindo!</h1>
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

        <Button type="submit" isLoading={isLoading} className="w-full mt-3">Entrar</Button>
      </form>
    </div>
  )
}
