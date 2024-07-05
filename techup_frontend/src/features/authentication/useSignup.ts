import { useMutation} from "@tanstack/react-query";
import { signup as signupApi, SignupRequest, SignupError} from "../../services/apiSignUp";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, status} = useMutation<any, SignupError, SignupRequest>({
    mutationFn: signupApi, 
    onError: (error) => {
      toast.error(`Signup failed: ${error.message}`);
    },
  });

  return { signup, status };
}
