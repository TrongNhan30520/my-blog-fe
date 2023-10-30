import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewUser } from "../usersSlice";

import { createNewUser } from "../usersSlice";

const INITIAL_USER_OBJ = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const INITIAL_USER_ERROR_OBJ = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

function AddUserModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(INITIAL_USER_ERROR_OBJ);
  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

  const saveNewLead = () => {
    if (userObj.first_name.trim() === "") {
      return setErrorMessage({
        ...errorMessage,
        first_name: "First Name is required!",
      });
    }
    if (userObj.last_name.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        last_name: "Last Name is required!",
      });
    if (userObj.email.trim() === "")
      return setErrorMessage({ ...errorMessage, email: "Email is required!" });
    else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        userObj.email
      );
      if (!valid)
        return setErrorMessage({
          ...errorMessage,
          email: "Email is not valid!",
        });
    }
    if (userObj.password.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        password: "Password is required!",
      });
    else {
      let newLeadObj = {
        email: userObj.email,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        password: userObj.password,
      };
      dispatch(createNewUser(newLeadObj));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={userObj.first_name}
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="pt-2 h-2 ">{errorMessage.first_name}</ErrorText>
      <InputText
        type="text"
        defaultValue={userObj.last_name}
        updateType="last_name"
        containerStyle="mt-4"
        labelTitle="Last Name"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="pt-2 h-2 ">{errorMessage.last_name}</ErrorText>
      <InputText
        type="email"
        defaultValue={userObj.email}
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="pt-2 h-2 ">{errorMessage.email}</ErrorText>
      <InputText
        type="password"
        defaultValue={userObj.password}
        updateType="password"
        containerStyle="mt-4"
        labelTitle="Password"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="pt-2 h-2 ">{errorMessage.password}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddUserModalBody;
