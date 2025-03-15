import Login from "../components/Login/Login";
import styles from "./page.module.css";

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
