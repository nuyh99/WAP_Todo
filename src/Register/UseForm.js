import axios from "axios";
import React, { useState, useEffect } from "react";
import Validation from "./Validation";

const UseForm = (submitForm) => {
  const [values, setValues] = useState({
    id: "",
    pw: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    const res = await axios({
      method: "post",
      url: "http://localhost:8080/user/register",
      data: values,
    });

    console.log(res.data);
    if (res.status === 200) {
      if (res.data !== "") {
        console.log("회원가입 성공!");
        console.log(res);
        setDataIsCorrect(true);
        setInterval(() => {
          window.location.replace("/");
        }, 1000);
      } else {
        // 중복, 이름 글자 수 초과 등 구분하기
        window.alert("중복된 아이디입니다. 다시 입력해주세요.");
        console.log("중복된 아이디");
      }
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      console.log("good");
      submitForm(true);
    }
  }, [dataIsCorrect]);

  return { handleChange, handleFormSubmit, errors, values };
};
export default UseForm;
