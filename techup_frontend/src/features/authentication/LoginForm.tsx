import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { loginStart, loginSuccess, loginFailure } from "./authSlice" 
import { login } from "../../services/apiLogin";

import Button from "../../ui/Button";
import ButtonLink from "../../ui/ButtonLink";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { RootState } from "../../store"
import Checkbox from "../../ui/Checkbox";
import FlexChildren from "../../ui/FlexChildren";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); //to be changed. 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading: isLoading, error: userError } = useSelector((store: RootState) => store.auth);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginStart());
    try {
      const response = await login(email, password); 
      const { user } = response.data;
      dispatch(loginSuccess(user));
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      const err = error as AxiosError<any, any>;
      dispatch(loginFailure(err?.response?.data.error) || "Login Failed"); 
      toast.error(userError || "Login Failed");
    }

  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FlexChildren>
        <Checkbox checked={isChecked} id="persistlogin" onChange={() => setIsChecked(!isChecked)}>Persist Login</Checkbox>
        <ButtonLink to="/signup">Sign Up Instead</ButtonLink>
      </FlexChildren>
    </Form>
  );
}

export default LoginForm;
