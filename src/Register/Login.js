import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Login = () => {
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
    const res = await axios.post(`http://localhost:8080/user/login`, {
      id: 1,
      pw: 1,
    });
    if (res.status === 200) {
      console.log(res);
    }
  };

  return (
    <>
      <h1>ToDo-Together</h1>
      <div id="login">
        <form name="login" onSubmit={onSubmitFunc}>
          <p>
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

            <input type="button" value="회원가입" className="btn" />
          </div>
          아이디/비밀번호 찾기
        </form>
      </div>
    </>
  );
};

export default Login;
