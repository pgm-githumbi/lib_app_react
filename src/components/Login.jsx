/* eslint-disable jsx-a11y/aria-role */
import { forEach } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FormInput from "../common/forms/FormInput";
import {
  maxLength,
  requiredField,
} from "../common/forms/utils/ValidationUtils";
import { logIn } from "../data/Auth";
import { ServerAsleepWarn } from "./ServerAsleepWarn";

const Login = () => {
  const navigate = useNavigate();
  const { register, reset, formState, handleSubmit, setError } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const { errors, dirtyFields } = formState;
  const errorsPresent = errors && Object.keys(errors).length;
  const serverErrorsPresent = errors && errors.root;
  const [submitDisabled, setSubmitDisabled] = useState(
    (errorsPresent && "disabled") || ""
  );
  const [seePassword, setSeePassword] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setSubmitDisabled("disabled");
    const { success, message, code } = await logIn({ email, password });
    if (success) {
      reset();
      return navigate("/", { replace: true });
    }

    setSubmitDisabled("");

    forEach(message, (msg) => {
      setError("root", { type: code, message });
      msg && toast(`Error ${msg}`);
    });
  };
  const appIcon = `${process.env.PUBLIC_URL}/icon.jpg`;
  return (
    <>
      <hr className="my-2"></hr>
      <section className="">
        <div className="container-fluid col-10 col-sm-10 col-md-7 col-lg-5 border rounded">
          <div role="header" className="jumbotron text-center">
            <hr className="my-1"></hr>
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <img
                    src={appIcon}
                    alt="..."
                    height="100"
                    width="100"
                    className="img-thumbnail rounded float-left"
                  ></img>
                </div>
                <div className="col-7">
                  <h1 className="display-6 text-start">
                    <strong>Library app</strong>
                  </h1>
                </div>
              </div>
            </div>
            <p className="lead">Login</p>
            <small className="">Welcome back</small>
          </div>
          <hr className="my-3" />
          <div className="row ">
            <ToastContainer />
            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                {...{ errors, dirtyFields, register }}
                inputType="text"
                fieldName="email"
                fieldLabel="Email"
                validation={{
                  ...maxLength(100),
                  ...requiredField("email"),
                }}
              />
              <FormInput
                {...{ errors, dirtyFields, register }}
                inputType="password"
                fieldName="password"
                fieldLabel="Password"
                {...{ seePassword, setSeePassword }}
                validation={{
                  ...requiredField("Password"),
                  ...maxLength(100),
                }}
              />
              <p>
                {serverErrorsPresent
                  ? errors.root.message.map((message) => (
                      <div
                        key={Math.random().toString(36)}
                        className="form-text form-text-warning alert alert-danger"
                      >
                        {message}
                      </div>
                    ))
                  : ""}
              </p>
              <Link to="/signup">Create account</Link>
              <hr className="my-1" />
              <input
                type="submit"
                className={`btn btn-primary ${submitDisabled}`}
              />
              <ServerAsleepWarn />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
