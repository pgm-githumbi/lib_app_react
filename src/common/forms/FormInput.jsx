const FormInput = ({
  errors,
  register,
  validation,
  fieldName,
  fieldLabel,
  inputType,
  placeholder,
  seePassword,
  setSeePassword,
}) => {
  const getInputType = () => {
    const itype = inputType || "text";
    if (itype !== "password") return itype;
    return seePassword ? "text" : "password";
  };
  const fa_eye = seePassword ? "fa-eye-slash" : "fa-eye";
  return (
    <div className="col-11 mb-3">
      <div className="row">
        <span htmlFor={fieldName} className="col-form-label visually-hidden">
          {fieldLabel}
        </span>
        <span className="col-11">
          <input
            id={fieldName}
            placeholder={placeholder || fieldLabel}
            className="form-control"
            type={getInputType()}
            {...register(fieldName, validation)}
          />
        </span>
        {(fieldName === "password" ||
          fieldName === "password_confirmation" ||
          inputType === "password") && (
          <span className="form-text col-1">
            <button
              type="button"
              className="btn btn-sm "
              onClick={(d) => setSeePassword(!seePassword)}
            >
              <i className={`fa-regular ${fa_eye}`}></i>
            </button>
          </span>
        )}
        {
          <p role="alert">
            {errors[fieldName] && (
              <span className="form-text form-text-warning">
                {errors[fieldName].message}
              </span>
            )}
          </p>
        }
      </div>
    </div>
  );
};

export default FormInput;
