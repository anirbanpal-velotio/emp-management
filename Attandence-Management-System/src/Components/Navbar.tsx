import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLoggedOut } from "../redux/actions/auth";
import styles from "./Navbar.module.css";
export default function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await axios.post(`${process.env.REACT_APP_BASEURL}/auth/logout`);
    dispatch(setLoggedOut())
    localStorage.removeItem("userDeatils");
  };
  return (
    <>
      <div className={styles.topnav}>
        <Link to="/employeerecords">Employeer Rcords</Link>
        <Link to="/userdashboard">User Dashboard</Link>
        <button
          onClick={handleLogout}
          className={`${styles.logout} btn border-dark bg-transparent text-light`}
        >
          Logout
        </button>
      </div>
    </>
  );
}
