import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import ForgotPassword from "./Forgetpassword";
import { BsEye } from "react-icons/bs";
import { toast } from "react-toastify";
import { EMPTY_EMAIL, EMPTY_PASSWORD, INVALID_EMAIL } from "../constant/error";
import { EMAIL_REGEX } from "../constant/regex";
import { REACT_APP_BACKEND_URL } from "../constant/environment";
import { TOKEN } from "../constant";
import axios from "axios";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

const Signin = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(DEFAULT_FORM);
  const [showPasswords, setShowPassword] = useState(true);
  const showPassword = () => {
    setShowPassword(!showPasswords);
  };
  const inputChangeHandler = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const loginHandler = async () => {
    const { email, password } = formState;
    if (!email) return toast.error(EMPTY_EMAIL, { toastId: EMPTY_EMAIL });
    if (!email.match(EMAIL_REGEX))
      return toast.error(INVALID_EMAIL, { toastId: INVALID_EMAIL });
    if (!password)
      return toast.error(EMPTY_PASSWORD, { toastId: EMPTY_PASSWORD });

    try {
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/login/signIn/admin`,
        formState
      );
      if (data?.message)
        return toast.error(data?.message, { toastId: data?.message });
      localStorage.setItem(TOKEN, data.token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      return toast.error(error?.message, { toastId: error?.message });
    }
  };

  return (
    <div className="Login-wrapper">
      <Container>
        <div className="login-form">
          <h2 className="title">LOGIN</h2>
          <div className="form-wrapper">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={inputChangeHandler}
                />
                <span className="error"></span>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <div className="pas-word">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputChangeHandler}
                  />

                  <span className="error"></span>
                  <Button
                    className={
                      showPasswords ? "password-btn notshow " : "password-btn"
                    }
                    onClick={showPassword}
                  >
                    <BsEye />
                  </Button>
                </div>
                <div className="password-label">
                  <span className="forgetpas">
                    {" "}
                    <ForgotPassword />
                  </span>
                </div>
              </Form.Group>

              <Button className="sb-btn" onClick={loginHandler}>
                Login
              </Button>
            </Form>
          </div>
          <div className="newaccount">
            Don't have an account yet? <Link to="/Signup"> SignUp</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Signin;
