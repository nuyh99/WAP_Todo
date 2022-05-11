import React from "react";
import { useState, useEffect } from "react";
import SignupForm from "./SignUpForm";
import SignupFormSuccess from "./SignUpFormSuccess";

const Form = (prop) => {
  // 회원가입 클릭여부
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const submitForm = () => {
    console.log("gi");
    setFormIsSubmitted(true);
  };
  return (
    <div>
      {!formIsSubmitted ? (
        <SignupForm submitForm={submitForm} />
      ) : (
        <SignupFormSuccess />
      )}
    </div>
  );
};

export default Form;
