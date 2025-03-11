import styles from "./SignupImage.module.css";

const SignupImage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <img
          className="shadow-2xl"
          src="loginpage/login-background.jpg"
          alt="Login Background"
        />
      </div>
    </div>
  );
};

export default SignupImage;
