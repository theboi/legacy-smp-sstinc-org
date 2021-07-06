import axios, { AxiosResponse } from "axios";

export const get = async <T>(
  url: string,
  token: string,
  requiresIntAuth: boolean = true
): Promise<AxiosResponse<any>> => {
  const config =
    url.includes("/api/v1") && requiresIntAuth
      ? {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      : {};

  return await axios.get(url, config);
};

export const post = async <R, I>(
  url: string,
  token: string,
  body: I,
  requiresIntAuth: boolean = true
): Promise<AxiosResponse<R>> => {
  const config =
    url.includes("/api/v1") && requiresIntAuth
      ? {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      : {};

  return await axios.post(url, body, config);
};
