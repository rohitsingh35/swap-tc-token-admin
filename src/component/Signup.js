import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import {
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  INVALID_EMAIL,
  CONFIRM_PASSWORD_NOT_MATCHED,
} from "../constant/error";
import { EMAIL_REGEX } from "../constant/regex";
import { REACT_APP_BACKEND_URL } from "../constant/environment";

const DEFAULT_FORM = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(DEFAULT_FORM);

  const inputChangeHandler = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const signUpHandler = async () => {
    const { email, password, confirmPassword } = formState;
    if (!email) return toast.error(EMPTY_EMAIL, { toastId: EMPTY_EMAIL });
    if (!email.match(EMAIL_REGEX))
      return toast.error(INVALID_EMAIL, { toastId: INVALID_EMAIL });
    if (!password)
      return toast.error(EMPTY_PASSWORD, { toastId: EMPTY_PASSWORD });
    if (password !== confirmPassword)
      return toast.error(CONFIRM_PASSWORD_NOT_MATCHED, {
        toastId: CONFIRM_PASSWORD_NOT_MATCHED,
      });

    try {
      const { data } = await axios.post(
        `${REACT_APP_BACKEND_URL}/login/signup/admin`,
        formState
      );
      navigate("/", { replace: true });
      return toast.success(data?.message, { toastId: data?.message });
    } catch (error) {
      return toast.error(error?.message, { toastId: error?.message });
    }
  };

  return (
    <div className="Login-wrapper">
      <Container>
        <div className="Signup-form">
          <h2 className="title">SIGN UP!</h2>
          <div className="form-wrapper">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  onChange={inputChangeHandler}
                />
                <span className="error"></span>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={inputChangeHandler}
                />
                <span className="error"></span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  onChange={inputChangeHandler}
                />
                <span className="error"></span>
              </Form.Group>
              <Button className="sb-btn" onClick={signUpHandler}>
                SignUp
              </Button>
            </Form>
          </div>
          <div className="newaccount">
            Already have an account ?<Link to="/"> Login</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignUp;
