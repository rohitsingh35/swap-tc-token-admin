import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { TOKEN } from "../../constant";
import { toast } from "react-toastify";
import { JWT_DECODED_TOKEN_ERROR } from "../../constant/error";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(TOKEN);
  if (!token) return <Navigate to="/" />;
  try {
    jwtDecode(token, { header: true });
    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem(TOKEN);
    toast.error(JWT_DECODED_TOKEN_ERROR, { toastId: JWT_DECODED_TOKEN_ERROR });
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
