import { useActionState } from "react";
import { z, ZodError } from "zod";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

const signInSchema = z.object({
  email: z.email({ error: "E-mail inválido" }),
  password: z.string().trim().min(1, { error: "Informe sua senha" }),
});

export function SignIn() {
  const auth = useAuth();
  const [state, formAction, isLoading] = useActionState(onSubmit, null);

  async function onSubmit(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const response = await api.post("/sessions", data);
      auth.save(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        return toast.error(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }

      return toast.error("Não foi possível realizar esta ação");
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        required
        name="email"
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        // defaultValue={state.email}
      />
      <Input
        required
        name="password"
        legend="Senha"
        type="password"
        placeholder="******"
      />
      <Button type="submit" disabled={isLoading}>
        Entrar
      </Button>

      <a
        href="/signup"
        className="teext-sm font-semibold text-gray-100 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
