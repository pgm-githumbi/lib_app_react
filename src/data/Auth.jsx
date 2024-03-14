import axios from "axios";
import connection, {
  authConnection,
  unAuthConnection,
} from "../data/common/server";
import {
  apiBook,
  apiLogin,
  apiRegister,
  apiRegisterError,
} from "./ServerResponses";

export const isLoggedIn = () => {
  const token = getToken();
  return token ? true : false;
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

const storeUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  console.log("User", JSON.parse(localStorage.getItem("user")));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getUsername = () => {
  return getUser()?.name;
};

export const logIn = async ({ email, password }) => {
  const { url } = authConnection();
  let loginRes;
  try {
    loginRes = apiLogin(await axios.post(`${url}/login`, { email, password }));
  } catch (ex) {
    console.log("Error Logging in: ", {
      success: false,
      message: ex?.response?.data?.message || ex?.message,
      serverMessage: ex?.response?.data?.message,
      axiosMsg: ex?.message,
      code: [ex?.response?.status, ex?.code],
    });
    return {
      success: false,
      axiosMsg: ex?.message,
      message: [ex?.response?.data?.message, ex?.message],
      serverMessage: ex?.response?.data?.message,
      code: [ex?.response?.status, ex?.code],
    };
  }
  console.log("Login success: ", {
    success: true,
    user: loginRes.user,
    token: loginRes.token,
  });
  storeUser(loginRes.user);
  storeToken(loginRes.token);
  return {
    success: true,
    user: loginRes.user,
    token: loginRes.token,
  };
};

export const logOut = async () => {
  const { url, config } = authConnection();
  if (isLoggedIn()) {
    try {
      await axios.post(`${url}/logout`, config);
    } catch (ex) {
      console.log("ex", ex, "config", config);
    }
  }
  storeToken("");
  storeUser(null);
};

export const signUp = async (credentials) => {
  const { url } = unAuthConnection();

  let res;
  try {
    res = await axios.post(`${url}/register`, credentials);
  } catch (ex) {
    console.log(ex);
    const { status, statusText, message, errors } = apiRegisterError(ex);
    console.log("Error", {
      success: false,
      status,
      statusText,
      message,
      errors,
    });
    return { success: false, status, statusText, message, errors };
  }
  console.log(apiRegister(res));
  const { token, user } = apiRegister(res);
  storeToken(token);
  storeUser(user);
  return { success: true, token, user };
};
