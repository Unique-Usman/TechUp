import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store"

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-zinc-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useSelector((store: RootState) => store.auth);
  // const { fullName, avatar } = user.username;
  const username = user?.username;

  return (
    <StyledUserAvatar>
      <Avatar
        // src={avatar || "default-user.jpg"}
        src="default-user.jpg"
        alt={`Avatar of ${username}`}
      />
      <span>{username}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
