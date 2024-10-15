import { type User } from "@/types.d";

const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

type Props = {
  pageParam?: number;
};

export const fetchUsers = async ({ pageParam }: Props) => {
  await delay(300);

  return await fetch(
    `https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la petición");
      return await res.json();
    })

    .then((res) => {
      const currentPage = Number(res.info.page);
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1;

      return {
        users: res.results as User[],
        nextCursor,
      };
    });
};
