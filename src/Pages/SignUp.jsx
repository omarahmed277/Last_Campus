import React, { useState } from "react";
import SignUpStepOne from "../components/auth/SignUpStepOne";
import SignUpStepTwo from "../components/auth/SignUpStepTwo";
import EmailVerification from "../components/auth/EmailVerification";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);

  const handleStepOneComplete = (data) => {
    setUserData(data);
    setStep(2);
  };

  const handleStepTwoComplete = async (data) => {
    try {
      setUserData((prev) => ({ ...prev, ...data }));
      setStep(3);
    } catch (error) {
      setRegistrationError(error.message);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setRegistrationError(null);
  };

  return (
    <div className="module">
      {registrationError && (
        <div className="error-message">{registrationError}</div>
      )}

      {step === 1 && <SignUpStepOne onNext={handleStepOneComplete} />}

      {step === 2 && (
        <SignUpStepTwo
          onBack={handleBack}
          onSubmit={handleStepTwoComplete}
          initialData={userData}
        />
      )}

      {step === 3 && <EmailVerification email={userData?.email} />}
    </div>
  );
};

export default SignUp;
