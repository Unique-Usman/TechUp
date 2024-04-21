import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/token/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        roles: response?.data?.roles,
        access: response?.data?.access,
      };
    });

    console.log("Refreshed token: ", response.data.access);
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;
