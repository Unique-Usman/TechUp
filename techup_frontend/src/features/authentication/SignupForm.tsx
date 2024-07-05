import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import toast from "react-hot-toast"
import { useNavigate } from "react-router";

// Email regex: /\S+@\S+\.\S+/

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  github: string;
  username: string;
}


function SignupForm() {
  const { signup, status } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm<FormValues>();
  const isLoading = status === "pending";
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmit({firstName, lastName, email, password, github, username}: FormValues) {
    signup(
      { firstName, lastName, email, password, github, username},
      {
        onSettled: () => reset(),
        onSuccess: () => {
          toast.success(
            "Account successfully created! Please verify the new account from the user's email address."
          );
          navigate("/login");
        },
      }

    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="First Name" error={errors?.firstName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isLoading}
          {...register("firstName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Last Name" error={errors?.lastName?.message}>
        <Input
          type="text"
          id="lastName"
          disabled={isLoading}
          {...register("lastName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Username" error={errors?.username?.message}>
        <Input
          type="text"
          id="username"
          disabled={isLoading}
          {...register("username", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>


      <FormRow label="Github" error={errors?.github?.message}>
        <Input
          type="github"
          id="github"
          disabled={isLoading}
          {...register("github", {
            required: "This field is required",
            pattern: {
              value: /^https?:\/\/github.com\/([a-zA-Z0-9._-]+)(?:\/)?$/,
              message: "Please provide a valid Github Account",
            },
          })}
        />
      </FormRow>


      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
