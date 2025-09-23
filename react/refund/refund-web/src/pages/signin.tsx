import { useState, useTransition } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Enviado");
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
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
