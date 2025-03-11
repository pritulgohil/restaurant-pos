import styles from "./page.module.css";
import LoginComponent from "../components/Signup/Signup";
import SignupImage from "../components/Signup/SignupImage";

export const metadata = {
  title: "Sign Up - Plates Up",
  description: "Sign up to create an account",
};

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
          <SignupImage />
        </div>
        <div className={styles.rightSide}>
          <LoginComponent />
        </div>
      </div>
    </>
  );
};

export default page;
