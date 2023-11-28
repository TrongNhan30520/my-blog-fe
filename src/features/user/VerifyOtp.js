import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import useAuth from "../../hooks/useAuth";
import OtpInput from "react-otp-input";

function VerifyOtp() {
  const { error, loading } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

  const [otp, setOtp] = useState("");
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-3xl font-semibold mb-12 text-center">
              Verify Your Account
            </h2>
            <p className="text-center">
              We sent a verification code to {state.email} Please check your
              email and paste the code below.
            </p>
            <OtpInput
              shouldAutoFocus
              value={otp}
              containerStyle="pt-4 pb-6 justify-center"
              onChange={handleOtpChange}
              numInputs={6}
              inputStyle="w-12 h-12 text-center border rounded-md shadow-lg"
              separator={<span className="w-2"></span>}
              isInputNum={true}
              hasErrored={false}
              errorStyle=" border-red-700"
            />
            <div className="flex flex-col gap-4 items-center ">
              <button
                className={
                  "btn mt-2 w-1/4 btn-primary" + (loading ? " loading" : "")
                }
              >
                Verify
              </button>
              <p>
                Didn't receive the code?{" "}
                <button className="btn-link">Resend</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
