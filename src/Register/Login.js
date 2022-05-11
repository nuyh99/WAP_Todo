import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Login.css";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  axios.defaults.withCredentials = true;

  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    userPassword: "",
  });
  const { userId, userPassword } = loginInfo;

  const onChangeVal = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();
    console.log("h2");
    login();
  };

  const login = async () => {
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/user/login",
      data: {
        id: userId,
        pw: userPassword,
      },
    });
    console.log(res.status);
    if (res.status === 200) {
      if (res.data === "") {
        console.log("로그인 실패");
      } else {
        console.log("로그인 성공");
        console.log(res);
        sessionStorage.setItem("isAuth", true);
      }
    }
  };

  return (
    <>
      <div className="body">
        <h1 className="h1">ToDo-Together</h1>
        <div>
          <form className="login" onSubmit={onSubmitFunc}>
            <p className="p">
              <input
                type="text"
                className="userid"
                placeholder="ID : "
                name="userId"
                value={userId}
                onChange={onChangeVal}
                required
              />
            </p>
            <p>
              <input
                type="password"
                name="userPassword"
                placeholder="PASSWORD : "
                value={userPassword}
                onChange={onChangeVal}
                required
              />
            </p>
            <div>
              <input type="submit" value="Login" className="btn"></input>

              <Link to="/signup" className="btn">
                회원가입
              </Link>
            </div>
            아이디/비밀번호 찾기
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
