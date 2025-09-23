import { useState, useTransition } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Enviado");
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
