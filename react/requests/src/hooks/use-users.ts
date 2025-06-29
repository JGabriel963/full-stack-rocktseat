import { useQuery } from "@tanstack/react-query";
import type { User } from "../models/user";
import { fetcher } from "../helpers/api";

export function useUsers() {
  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetcher("users"),
  });

  return {
    users: data || [],
    isLoadingUsers: isLoading,
  };
}
