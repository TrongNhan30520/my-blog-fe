import { useState } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Register() {
  const INITIAL_REGISTER_OBJ = {
    name: "",
    password: "",
    emailId: "",
  };

  const INITIAL_REGISTER_ERROR_OBJ = {
    name: "",
    password: "",
    email: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(INITIAL_REGISTER_ERROR_OBJ);
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage(INITIAL_REGISTER_ERROR_OBJ);

    if (registerObj.name.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        name: "Name is required! (use any value)",
      });
    if (registerObj.emailId.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        email: "Email Id is required! (use any value)",
      });
    else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        registerObj.emailId
      );
      if (!valid)
        return setErrorMessage({
          ...errorMessage,
          email: "Email Id is not valid!",
        });
    }
    if (registerObj.password.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        password: "Password is required! (use any value)",
      });
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      localStorage.setItem("access_token", "DumyTokenHere");
      setLoading(false);
      window.location.href = "/app/dashboard";
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
                  defaultValue={registerObj.name}
                  updateType="name"
                  containerStyle="mt-4"
                  labelTitle="Name"
                  placeholder=""
                  updateFormValue={updateFormValue}
                />

                <ErrorText styleClass="pt-2 h-2 ">
                  {errorMessage.name}
                </ErrorText>

                <InputText
                  defaultValue={registerObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
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
