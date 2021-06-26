import axios, { AxiosResponse } from "axios";

export const get = async (
  url: string,
  token: string,
  requiresIntAuth: boolean = true
): Promise<AxiosResponse<any>> => {
  const config =
    url.startsWith("/api/v1") && requiresIntAuth
      ? {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      : {};

  return await axios.get(url, config);
};

export const post = async (
  url: string,
  token: string,
  body: string,
  requiresIntAuth: boolean = true
): Promise<AxiosResponse<any>> => {
  const config =
    url.startsWith("/api/v1") && requiresIntAuth
      ? {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      : {};

  return await axios.post(url, body, config);
};
