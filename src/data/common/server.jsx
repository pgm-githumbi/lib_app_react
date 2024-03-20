import { getToken } from "../Auth";

const url = process.env.REACT_APP_API_URL;
export const authConnection = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return { url, config };
};

export const unAuthConnection = () => {
  return { url };
};
