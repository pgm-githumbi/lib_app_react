import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  console.log("Location: ", location);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{}</p>
    </div>
  );
}
