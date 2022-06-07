const Validation = (values) => {
  let errors = {};

  if (!values.name) {
    errors.fullname = "이름은 필수 입력값입니다.";
  }
  if (!values.id) {
    errors.id = "아이디는 필수 입력값입니다.";
  }
  if (!values.email) {
    errors.email = "이메일은 필수 입력값입니다.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "이메일이 유효하지 않습니다.";
  }
  if (!values.pw) {
    errors.password = "비밀번호는 필수 입력값입니다.";
  } else if (values.pw.length < 5) {
    errors.password = "비밀번호는 5자 이상이어야 합니다.";
  }

  return errors;
};

export default Validation;
