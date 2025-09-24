import { useState, useTransition } from "react";
import { Input } from "../components/input";
import { Select } from "../components/select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Upload } from "../components/upload";
import { Button } from "../components/button";
import { useNavigate } from "react-router";

export function Refund() {
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
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
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Upload
        filename={file?.name}
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
        disabled={isLoading}
      />

      <Button type="submit">Enviar</Button>
    </form>
  );
}
