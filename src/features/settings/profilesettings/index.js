import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import useAuth from "../../../hooks/useAuth";

function ProfileSettings() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { email, first_name, last_name, status, create_at, avatar } = user;

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType, value);
  };

  console.log(user);
  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            updateType="first_name"
            labelTitle="First Name"
            defaultValue={first_name}
            updateFormValue={updateFormValue}
          />
          <InputText
            updateType="last_name"
            labelTitle="Last_Name"
            defaultValue={last_name}
            updateFormValue={updateFormValue}
          />
          <InputText
            updateType="email"
            labelTitle="Email"
            defaultValue={email}
            updateFormValue={updateFormValue}
          />

          <InputText
            updateType="status"
            labelTitle="Status"
            defaultValue={status}
            updateFormValue={updateFormValue}
          />
          {/* <TextAreaInput
            labelTitle="About"
            defaultValue="Doing what I love, part time traveller"
            updateFormValue={updateFormValue}
          /> */}
        </div>
        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Language"
            defaultValue="English"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Timezone"
            defaultValue="IST"
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Sync Data"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
        </div>

        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
