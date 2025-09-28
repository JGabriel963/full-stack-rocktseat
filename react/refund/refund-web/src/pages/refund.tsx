import { useState, useTransition } from "react";
import { Input } from "../components/input";
import { Select } from "../components/select";

import fileSvg from "../assets/file.svg";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import { Upload } from "../components/upload";
import { Button } from "../components/button";
import { useNavigate, useParams } from "react-router";
import { z, ZodError } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

const refundSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Informe um nome claro para sua solicitação" }),
  category: z.string().min(1, { error: "Selecione uma categoria" }),
  amount: z.coerce.number().positive(),
});

export function Refund() {
  const auth = useAuth();
  const navigation = useNavigate();
  const params = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useTransition();

  async function createRefund() {
    try {
      if (!file) {
        return toast.error("Selecione um arquivo de comprovante");
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", file);

      const response = await api.post("/uploads", fileUploadForm);

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      });

      await api.post(
        "/refunds",
        { ...data, filename: response.data.filename },
        {
          headers: {
            Authorization: `Bearer ${auth.session?.token}`,
          },
        }
      );

      navigation("/confirm", { state: { fromSubmit: true } });
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigation(-1);
    }

    setIsLoading(async () => {
      await createRefund();
    });
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

      <Button type="submit" isLoading={isLoading}>
        {params.id ? "Voltar" : "Enviar"}
      </Button>
    </form>
  );
}
