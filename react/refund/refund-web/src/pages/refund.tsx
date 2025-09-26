import { useState, useTransition } from "react";
import { Input } from "../components/input";
import { Select } from "../components/select";

import fileSvg from "../assets/file.svg";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import { Upload } from "../components/upload";
import { Button } from "../components/button";
import { useNavigate, useParams } from "react-router";

export function Refund() {
  const navigation = useNavigate();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState("Refund");
  const [category, setCategory] = useState("123");
  const [amount, setAmount] = useState("123");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigation(-1);
    }

    navigation("/confirm", { state: { fromSubmit: true } });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-1 mb-4">
          Dados daa despesa para solicitar reembolso.
        </p>
      </header>

      <Input
        required
        legend="Nome da solicitação"
        value={name}
        disabled={!!params.id}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          disabled={!!params.id}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>

        <Input
          required
          legend="Valor"
          value={amount}
          disabled={!!params.id}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {params.id ? (
        <a
          href="https://miro.medium.com/1*fs0ScMc45X9QEwno8G414A.png"
          target="_blank"
          className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 hover:opacity-70"
        >
          <img src={fileSvg} alt="Ícone de arquivo" />
          Abrir comprovantes
        </a>
      ) : (
        <Upload
          filename={file?.name}
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          disabled={isLoading}
        />
      )}

      <Button type="submit">{params.id ? "Voltar" : "Enviar"}</Button>
    </form>
  );
}
