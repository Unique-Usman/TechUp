import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { RootState } from "../../store"

import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useSelector((store: RootState) => store.auth);
  const {email, first_name, last_name, id, access } = user!;

  const { updateUser, isUpdating } = useUpdateUser();

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    if (avatar) {
      formData.append('file', avatar);
    }
    const userData = {firstName, lastName, access, id }; 
    if (!firstName || !lastName) return;
    updateUser({formData, userData});
  }

  function handleCancel() {
    setFirstName(firstName);
    setLastName(lastName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="First name">
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="firstName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Last name">
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="lastName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files && e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
