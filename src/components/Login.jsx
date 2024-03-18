import { useForm } from "react-hook-form";
import FormInput from "../common/forms/FormInput";
import {
  maxLength,
  minLength,
  requiredField,
} from "../common/forms/utils/ValidationUtils";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../data/Auth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { forEach } from "lodash";

const Login = () => {
  const navigate = useNavigate();
  const { register, reset, formState, handleSubmit, setError } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const { errors, dirtyFields, isSubmitted } = formState;
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
  return (
    <>
      <section className="container-fluid col-10 col-sm-10 col-md-7 col-lg-5">
        <div role="header" className="jumbotron text-center">
          <h1 className="display-3">Library App</h1>
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
            <p>
              <Link to="/signup">Create account</Link>
            </p>
            <input
              type="submit"
              className={`form-control btn btn-primary ${submitDisabled}`}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
