import React, { useState, useEffect } from "react";
import Validation from "./Validation";
import UseForm from "./UseForm";
import { Link } from "react-router-dom";

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
            <label className="label">이름</label>
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
            <label className="label">아이디</label>
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
            <label className="label">이메일</label>
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
            <label className="label">비밀번호</label>
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
            <Link to="/" className="submit">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
