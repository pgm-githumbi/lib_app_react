/* eslint-disable jsx-a11y/aria-role */
const SignupHeader = () => {
  const appIcon = `${process.env.PUBLIC_URL}/icon.jpg`;

  return (
    <>
      <hr className="my-1"></hr>
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
        <small className="text-center">
          <em>Create an account</em>
        </small>
      </div>
    </>
  );
};

export default SignupHeader;
