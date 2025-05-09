import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";

const RestrictedRoute = ({ children, redirectTo = "/transactions/income" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) return null;

  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

export default RestrictedRoute;
