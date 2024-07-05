import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { apiUpdateUser } from "../../services/apiUpdateUser";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./authSlice" 
import { RootState } from "../../store"


export function useUpdateUser() {

  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  let updatedUser;

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: apiUpdateUser,
    onSuccess: ({ user: userRes }) => {
      toast.success("User account successfully updated");
      updatedUser = {...user, ...userRes}
      dispatch(loginSuccess(updatedUser));
    },
    onError: (err) => toast.error(err.message),
 });

  return { updateUser, isUpdating };
}
