export const ServerAsleepWarn = () => {
  return (
    <div
      className="jumbotron m-3 alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <p className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          role="img"
          aria-label="Warning:"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <em>
          If submit doesn't work the first time, retry. Its because the server
          is sleeping.
        </em>
      </p>
      <hr className="my-1"></hr>
      <p className="text-muted">
        <small>
          Same goes for general use of this app. If you're coming back after a
          while make sure to reattempt actions that make api calls to the
          server.
        </small>
      </p>
    </div>
  );
};
