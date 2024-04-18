import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth.refresh);
  console.log(auth.access);

  const refresh = async () => {
    const response = await axios.get("/token/refresh", {
      withCredentials: true,

      headers: {
        Authorization: `Bearer ${auth.refresh}`,
      },
    });

    setAuth((prev) => {
      return {
        ...prev,
        roles: [2001],
        access: response?.data?.user?.access,
      };
    });
    return response.data.user.access;
  };
  return refresh;
};

export default useRefreshToken;
