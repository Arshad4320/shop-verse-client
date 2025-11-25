import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={location} />;
  }
  return children;
};
export default PrivetRoute;
