import { axiosSimple } from "../services/axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store"
import { loginSuccess, User } from "../features/authentication/authSlice"; 

interface ResponseData {
  data: {
   user: User; 
  };
}
const useRefreshToken = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  const refresh = async () => {
    const response: ResponseData = await axiosSimple.get("/token/refresh", {
      withCredentials: true,
    });

    if (response.data) {
      const userData = response.data.user || undefined // Default to an empty array if roles is undefined
      dispatch(loginSuccess({...user, ...userData}));
      
    }
    return response.data.user.access;
  };
  return refresh;
};

export default useRefreshToken;
