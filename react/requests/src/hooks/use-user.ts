import { useCallback, useState } from "react";
import { api, fetcher } from "../helpers/api";
import { type User } from "../models/user";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "loading" | "saving"
  >("idle");

  const getUser = useCallback(async (username: string) => {
    try {
      setRequestStatus("loading");

      const data = await fetcher(`users/${username}`);

      setUser(data);
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar usuário");
    } finally {
      setRequestStatus("idle");
    }
  }, []);

  async function createUser(payload: User) {
    try {
      setRequestStatus("saving");

      await api("users", { method: "POST", body: JSON.stringify(payload) });

      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar usuário");
    } finally {
      setRequestStatus("idle");
    }
  }

  return {
    user,
    userRequestStatus: requestStatus,
    getUser,
    createUser,
  };
}
