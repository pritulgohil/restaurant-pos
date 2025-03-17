import Login from "../components/Login/Login";
import styles from "./page.module.css";

export const metadata = {
  title: "Login - Plates Up",
  description: "This is a description of my page",
};

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <Login />
      </div>
    </>
  );
};

export default page;
