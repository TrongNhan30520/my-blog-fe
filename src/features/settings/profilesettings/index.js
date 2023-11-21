import { useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import UploadImage from "../../../components/Input/UploadImage";
import useAuth from "../../../hooks/useAuth";
import apiInstance from "../../../apis/apiInstance";
import { shallowObjectEqual } from "../../../utils/commonFunction";

function ProfileSettings() {
  const { user, setUpdateProfile } = useAuth();
  const { first_name, last_name, status, avatar } = user;
  const initialUserData = { first_name, last_name, status };
  const dispatch = useDispatch();

  const [image, setImage] = useState();
  const [userObj, setUserObj] = useState({
    first_name: first_name,
    last_name: last_name,
    status: status,
  });

  // Call API to update profile settings changes
  const updateProfile = async () => {
    try {
      if (image || !shallowObjectEqual(initialUserData, userObj)) {
        if (image) {
          var avatarFormData = new FormData();
          avatarFormData.append("avatar", image);
          await apiInstance.post("users/upload-avatar", avatarFormData);
          setImage();
        }
        if (!shallowObjectEqual(initialUserData, userObj)) {
          await apiInstance.put("users/update-profile", userObj);
        }
        dispatch(
          showNotification({
            message: "Profile Updated",
            status: 1,
            time: 1000,
          })
        );
        setUpdateProfile(true);
      } else return;
    } catch (error) {
      dispatch(
        showNotification({
          message: error?.response?.data?.message || "Profile Update Failed!",
          status: 0,
          time: 2000,
        })
      );
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setUserObj({ ...userObj, [updateType]: value });
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadImage
            className={"w-10/12"}
            title={"Upload avatar"}
            initialImage={avatar}
            onChange={(image) => {
              setImage(image);
            }}
          />
          <div className="col-span-2">
            <InputText
              updateType="first_name"
              labelTitle="First Name"
              defaultValue={userObj.first_name}
              updateFormValue={updateFormValue}
            />
            <InputText
              updateType="last_name"
              labelTitle="Last_Name"
              defaultValue={userObj.last_name}
              updateFormValue={updateFormValue}
            />
            <InputText
              updateType="status"
              labelTitle="Status"
              defaultValue={userObj.status}
              updateFormValue={updateFormValue}
            />
          </div>
          {/* <TextAreaInput
            labelTitle="About"
            defaultValue="Doing what I love, part time traveller"
            updateFormValue={updateFormValue}
          /> */}
        </div>

        <div className="mt-16">
          <div className="divider"></div>
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
