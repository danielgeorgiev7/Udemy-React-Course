import React, { useState, useEffect, useRef } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  // const [fullName, setFullName] = useState(currentFullName);
  //  const [avatar, setAvatar] = useState(null);

  const fullName = useRef();
  const avatar = useRef();
  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    // updateUser({fullName, avatar})
    updateUser({
      fullName: fullName.current.value,
      avatar: avatar.current.files[0],
    });
  }

  function handleCancel(e) {
    // setFullName(currentFullName);
    // setAvatar(null);
    e.preventDefault();
    fullName.current.value = "";
    avatar.current.value = "";
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          ref={fullName}
          defaultValue={currentFullName}
          // value={fullName}
          // onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          ref={avatar}
          // onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" $variation="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
