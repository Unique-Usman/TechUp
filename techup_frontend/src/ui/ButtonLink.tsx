import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
  color: var(--color-zinc-700);
  font-weight: 600;
  transition: all 0.3s;

  &:hover,
  &:active {
    color: var(--color-zinc-500);
  }
`;

export default ButtonLink;
