import { useForm } from "react-hook-form";
import FormInput from "../common/forms/FormInput";
import {
  maxLength,
  minLength,
  requiredField,
} from "../common/forms/utils/ValidationUtils";
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import SignupHeader from "./SignupHeader";
import { signUp } from "../data/Auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ServerAsleepWarn } from "./ServerAsleepWarn";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState, getValues } = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });
  const { errors, dirtyFields } = formState;
  const [submitDisabled, setSubmitDisabled] = useState(
    (Object.keys(errors).length && "disabled") || ""
  );
  const [seePassword, setSeePassword] = useState(false);
  const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);
  useEffect(() => {
    if (Object.keys(errors).length || !formState.isValid)
      setSubmitDisabled("disabled");
    else setSubmitDisabled("");
  }, [errors, formState]);

  const onSubmit = (credentials) => {
    console.log("submitting");
    setSubmitDisabled("disabled");
    async function post() {
      const { success, status, message, errors } = await signUp({
        ...credentials,
      }); //
      if (success) {
        return navigate("/", { replace: true });
      }
      if (errors) {
        for (const [field, errMsgList] of Object.entries(errors)) {
          errMsgList?.forEach((msg) =>
            setError(field, { type: status, message: msg })
          );
        }
      }
      setSubmitDisabled("");
      message && toast(`Error ${message}`);
    }
    post();
  };
  return (
    <>
      <hr className="my-2"></hr>
      <section className="container-fluid col-10 col-sm-10 col-md-7 col-lg-5 border">
        <div className="row">
          <SignupHeader />
        </div>
        <div className="row">
          <ToastContainer />
        </div>
        <div className="row">
          <form onSubmit={handleSubmit((credentials) => onSubmit(credentials))}>
            <FormInput
              {...{ register, errors, dirtyFields }}
              inputType="text"
              fieldLabel="Username"
              fieldName="name"
              validation={{
                ...requiredField("Username"),
                ...minLength(2),
                ...maxLength(100),
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: "Use only letters, numbers, underscore or hyphens",
                },
              }}
            />
            <FormInput
              {...{ register, errors, dirtyFields }}
              inputType="email"
              fieldLabel="Email"
              fieldName="email"
              validation={{
                ...requiredField("Email"),
                ...minLength(4),
                ...maxLength(100),
              }}
            />
            <FormInput
              {...{ register, errors, dirtyFields }}
              inputType="password"
              fieldLabel="Password"
              fieldName="password"
              {...{ seePassword, setSeePassword }}
              validation={{
                ...requiredField("Password"),
                ...maxLength(100),
                ...minLength(4),
                validate: (password) => {
                  const {
                    score,
                    feedback: { warning },
                  } = zxcvbn(password);
                  return score >= 3 || warning || "too weak"; // TODO: change to 3
                },
              }}
            />
            <FormInput
              {...{ register, errors, dirtyFields }}
              inputType="password"
              fieldLabel="Password confirmation"
              fieldName="password_confirmation"
              {...{
                seePassword: seePasswordConfirm,
                setSeePassword: setSeePasswordConfirm,
              }}
              validation={{
                ...requiredField("Password confirmation"),
                ...maxLength(100),
                validate: {
                  matchesPassword: (passConfirm) => {
                    return (
                      getValues("password") === passConfirm ||
                      "Password confirmation doesn't match password"
                    );
                  },
                },
              }}
            />

            <Link to="/login">Already have an account?</Link>
            <hr className="my-1"></hr>
            <input
              type="submit"
              className={`btn btn-primary ${submitDisabled}`}
            />
            <ServerAsleepWarn />
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
