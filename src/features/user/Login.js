import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import useAuth from "../../hooks/useAuth";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    email: "",
  };

  const INITIAL_LOGIN_ERROR_OBJ = {
    password: "",
    email: "",
  };

  const { signIn, error, loading } = useAuth();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(INITIAL_LOGIN_ERROR_OBJ);
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    //setErrorMessage(INITIAL_LOGIN_ERROR_OBJ);

    if (loginObj.email.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        email: "Email Id is required! (use any value)",
      });
    else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        loginObj.email
      );
      if (!valid)
        return setErrorMessage({
          ...errorMessage,
          email: "Email Id is not valid!",
        });
    }
    if (loginObj.password.trim() === "")
      return setErrorMessage({
        ...errorMessage,
        password: "Password is required! (use any value)",
      });
    else {
      // Call API to check user credentials and save token in localstorage
      const data = await signIn(loginObj.email, loginObj.password);

      if (data) {
        NotificationManager.error(
          `${data?.response?.data?.message}`,
          "Error",
          2000
        );
        if (data?.response?.data?.statusCode === 400) {
          navigate("/verify-otp", {
            state: {
              email: loginObj.email,
            },
          });
        }
      } else {
        navigate("/app/dashboard");
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage(INITIAL_LOGIN_ERROR_OBJ);
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="email"
                  defaultValue={loginObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email Id"
                  placeholder="abcd@gmail.com"
                  updateFormValue={updateFormValue}
                />
                <ErrorText styleClass="pt-4 h-4 ">
                  {errorMessage.email}
                </ErrorText>

                <InputText
                  defaultValue={loginObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  placeholder="********"
                  updateFormValue={updateFormValue}
                />
                <ErrorText styleClass="py-4 h-4 ">
                  {errorMessage.password}
                </ErrorText>
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
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

export default Login;
