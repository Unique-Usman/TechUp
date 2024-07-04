import styled from "styled-components";

import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";



const StyledSignUp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-zinc-0);
  width:
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
`;


function NewUsers() {
  return (
      <StyledSignUp>
        <Heading as="h4">Create a new user</Heading>
        <SignupForm />
      </StyledSignUp>
  );
}

export default NewUsers;
