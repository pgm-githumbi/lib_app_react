import { useQuery } from "react-query";
import { authGetRequest } from "../data/common/server";

const getCurrUser = async () => {
  return await authGetRequest("current_user");
};

export const useCurrUser = () => {
  return useQuery({
    queryKey: ["currUser"],
    queryFn: getCurrUser,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const STAFF = "staff";
export const STUDENT = "student";
export const ADMIN = "admin";

export const useCurrUserRoles = () => {
  const query = useQuery({
    queryKey: ["userRoles"],
    queryFn: () => authGetRequest("current_user/roles"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export const useCurrUserIs = (ROLE) => {
  const { isSuccess, data: roles } = useCurrUserRoles();
  isSuccess && console.log("roles", roles.data);
  return {
    isSuccess,
    data: isSuccess ? roles.data.find((role) => role === ROLE) : roles,
  };
};
