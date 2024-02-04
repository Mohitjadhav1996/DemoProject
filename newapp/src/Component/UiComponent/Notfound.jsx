import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>
        Page Not Found
        <NavLink to="/login">Click here</NavLink>
      </div>
    </>
  );
};
export default NotFound;
