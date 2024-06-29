import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-zinc-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
      <Main>
        <Container>
          <Outlet />
          App Layout
        </Container>
      </Main>
  );
}

export default AppLayout;
