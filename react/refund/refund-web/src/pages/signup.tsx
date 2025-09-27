import { useState, useTransition } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { z, ZodError } from "zod";
import { toast } from "sonner";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, { error: "Campo obrigatório" }),
    email: z.email(),
    password: z
      .string()
      .min(6, { error: "Senha deve ter no mínimo 6 dígitos" }),
    passwordConfirm: z
      .string({ error: "Confirme sua senha" })
      .min(6, { error: "Senha deve ter no mínimo 6 dígitos" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "As senhas não são iguais",
    path: ["passwordConfirm"],
  });

export function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useTransition();

  async function haandleSignUp() {
    try {
      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      await api.post("/users", data);

      navigate("/");
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }

      toast.error("Não foi possíveel realizar esta ação");
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(async () => {
      await haandleSignUp();
    });
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="Nome"
        type="text"
        placeholder="Seu nome"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        required
        legend="Senha"
        type="password"
        placeholder="******"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Input
        required
        legend="Confirmar senha"
        type="password"
        placeholder="******"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <Button type="submit" disabled={isLoading}>
        Cadastrar
      </Button>

      <a
        href="/"
        className="teext-sm font-semibold text-gray-100 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  );
}
