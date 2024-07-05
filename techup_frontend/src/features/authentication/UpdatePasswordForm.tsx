import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { RootState } from "../../store"
import { useUpdateUser } from "./useUpdateUser";

interface FormValues {
  password: string;
  passwordConfirm: string;
}

interface onSubmitProps {
  password: string;
}


function UpdatePasswordForm() {
  const { user } = useSelector((store: RootState) => store.auth);
  const {email, first_name, last_name, id, access } = user!;

  const { register, handleSubmit, formState, getValues, reset } = useForm<FormValues>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();
  const userData = {email, firstName: first_name, lastName: last_name, access, id }; 

  function onSubmit({ password }: onSubmitProps ) {
    const formData = new FormData();
    updateUser({ formData, password, userData }, { onSuccess: () => 
    {
        reset();
      }});
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
