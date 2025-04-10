
import { Navigate } from "react-router-dom";

// Since we're creating a static site with no admin functionality,
// this page simply redirects to the home page
const Admin = () => {
  return <Navigate to="/" replace />;
};

export default Admin;
