import axios from "axios";
import jwtServices from "./jwt-token";
import { api } from "@/core/api-endpoints/api";
import router from "@/router";
import toast from "@/core/services/toast";

const baseURL: string = import.meta.env.VITE_API_BASE_URL;

// info: you cannot use this here cause it's not not a vue component
// const router = useRouter();

const client = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
client.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = jwtServices.getToken();
    // console.log("heyy");
    // console.log(token, "token");
    if (token) {
      // console.log(token, "hi");

      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // console.log('hiii')
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("response*******************************");
    // console.log(response, "response*****");
    return response;
  },
  async function (error) {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    // check if _retry key is in originalRequest
    // console.log('_retry' in originalRequest)

    // console.log('hehssehe', originalRequest._retry)
    // console.log('hehssehdasde', originalRequest)
    const refreshToken = jwtServices.getRefreshToken();

    if (status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      // console.log('hehehe', originalRequest)
      try {
        const response = await axios.post(
          baseURL + "/" + api.auth.refreshToken,
          {
            refresh: refreshToken,
          }
        );
        const token = response.data.access;
        jwtServices.setToken(token);
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return await axios(originalRequest);
      } catch (error_2) {
        // token refresh failed so remove all tokens from storage
        jwtServices.destroyAllTokens();
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Session Expired. Please Login Again.",
          life: 3000,
        });
        let currentPath = router.currentRoute.value.fullPath;
        console.log(router.currentRoute.value.fullPath, "fullpath");
        router.push({
          name: "login",
          query: { _redirectUrl: currentPath },
        });
        console.error("Token refresh failed", error_2);
      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default client;
