import { getTokenFromCookie } from "@/services/auth";
import { useClerk } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useToken = () => {
  const getToken = useClerk().session?.getToken;
  const { data: token } = useQuery([`token`], () => getToken?.());

  return token || getTokenFromCookie();
};
