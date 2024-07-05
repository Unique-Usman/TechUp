import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../store"
import Spinner from "./Spinner";
import { ReactElement } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-zinc-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: {children: ReactElement}) {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Load the authenticated user
  const { loading: isLoading, isAuthenticated } = useSelector((store: RootState) => store.auth);


  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login', { state: { from: location } });
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
