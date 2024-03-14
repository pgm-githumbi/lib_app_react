import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../data/Auth";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function doLogout() {
      await logOut();
      navigate("/login", { replace: true });
    }
    doLogout();
  }, []);
  return (
    <div className="container-fluid col-11 text-center">
      <h1 className="display-3">Goodbye 👋</h1>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
