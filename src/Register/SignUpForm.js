import Validation from "./Validation";
import { Link } from "react-router-dom";
import UseForm from "./UseForm";
import "./css/Form.css";
import { Button } from "@mui/material";
const SignUpForm = (prop) => {
  const { handleChange, handleFormSubmit, values, errors } = UseForm(
    prop.submitForm
  );

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Create Account</h2>
        </div>
        <form className="form-wrapper" onSubmit={handleFormSubmit}>
          <div className="name">
            <label
              className="label"
              style={{ width: "70px", display: "inline-block" }}
            >
              이름
            </label>
            <input
              className="input"
              type="text"
              name="name"
              value={values.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <p className="error">{errors.fullname}</p>}
          </div>
          <div className="name">
            <label
              className="label"
              style={{ width: "70px", display: "inline-block" }}
            >
              아이디
            </label>
            <input
              className="input"
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
            />
            {errors.id && <p className="error">{errors.id}</p>}
          </div>
          <div className="email">
            <label
              className="label"
              style={{ width: "70px", display: "inline-block" }}
            >
              이메일
            </label>
            <input
              className="input"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="password">
            <label
              className="label"
              style={{ width: "70px", display: "inline-block" }}
            >
              비밀번호
            </label>
            <input
              className="input"
              type="password"
              name="pw"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <button type="submit" className="submit" onClick={handleFormSubmit}>
              Create!
            </button>
            <br />
            <button className="submit">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Back
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
