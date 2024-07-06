import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiLogout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutUser } from "./authSlice" 


export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: logout, isPending} = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      dispatch(logoutUser());
    },
  });

  return { logout, isLoading: isPending };
}
