import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import useAuth from "../../hooks/useAuth";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  };

  const INITIAL_REGISTER_ERROR_OBJ = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  };

  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(INITIAL_REGISTER_ERROR_OBJ);
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage(INITIAL_REGISTER_ERROR_OBJ);

    if (registerObj.first_name.trim() === "") {
      return setErrorMessage({
        ...errorMessage,
        first_name: "First Name is required!",
      });
    }
    if (registerObj.last_name.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        last_name: "Last Name is required!",
      });
    if (registerObj.email.trim() === "")
      return setErrorMessage({ ...errorMessage, email: "Email is required!" });
    else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        registerObj.email
      );
      if (!valid)
        return setErrorMessage({
          ...errorMessage,
          email: "Email is not valid!",
        });
    }
    if (registerObj.password.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        password: "Password is required!",
      });
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      const data = register(
        registerObj.first_name,
        registerObj.last_name,
        registerObj.email,
        registerObj.password
      );
      setLoading(false);
      NotificationManager.success("Registered successfully", "Success", 1000);
      navigate("/login");
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage(INITIAL_REGISTER_ERROR_OBJ);
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  defaultValue={registerObj.first_name}
                  updateType="first_name"
                  containerStyle="mt-4"
                  labelTitle="First Name"
                  placeholder=""
                  updateFormValue={updateFormValue}
                />

                <ErrorText styleClass="pt-2 h-2 ">
                  {errorMessage.first_name}
                </ErrorText>

                <InputText
                  defaultValue={registerObj.last_name}
                  updateType="last_name"
                  containerStyle="mt-4"
                  labelTitle="Last Name"
                  placeholder=""
                  updateFormValue={updateFormValue}
                />

                <ErrorText styleClass="pt-2 h-2 ">
                  {errorMessage.last_name}
                </ErrorText>

                <InputText
                  defaultValue={registerObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  placeholder="abcd@gmail.com"
                  updateFormValue={updateFormValue}
                />
                <ErrorText styleClass="pt-2 h-2 ">
                  {errorMessage.email}
                </ErrorText>

                <InputText
                  defaultValue={registerObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  placeholder="********"
                  updateFormValue={updateFormValue}
                />
              </div>
              <ErrorText styleClass="my-4 h-2 ">
                {errorMessage.password}
              </ErrorText>

              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Register
              </button>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
