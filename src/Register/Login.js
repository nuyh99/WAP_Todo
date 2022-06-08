import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
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
    if (res.status === 200) {
      if (res.data === "") {
        console.log("로그인 실패");
      } else {
        sessionStorage.setItem("isAuth", true);
        sessionStorage.setItem("name", res.data.id);
        console.log(res.data);
        setInterval(() => {
          window.location.replace("/");
        }, 1000);
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
              <Input
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
              <Input
                type="password"
                name="userPassword"
                placeholder="PASSWORD : "
                value={userPassword}
                onChange={onChangeVal}
                required
              />
            </p>
            <div>
              <Button
                type="submit"
                value="Login"
                variant="outlined"
                style={{ margin: "25px 0 0 0", color: "gray" }}
              >
                로그인
              </Button>
              <Button variant="outlined" style={{ margin: "25px 0 0 0" }}>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "gray",
                  }}
                >
                  회원가입
                </Link>
              </Button>
            </div>
            <Button
              variant="outlined"
              style={{ margin: "10px 0 0 0", color: "gray" }}
            >
              아이디/비밀번호 찾기
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
