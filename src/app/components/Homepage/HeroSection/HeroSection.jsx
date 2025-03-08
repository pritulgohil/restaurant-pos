import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSideContainer}>
          <div className={styles.mainHeader}>
            <h2>Transform Your Restaurant with Our Innovative Solutions</h2>
          </div>
          <div className={styles.description}>
            <p>
              Streamline your operations and enhance customer experience with
              our all-in-one Restaurant POS and Digital Menu System. Discover
              how our technology can elevate your dining service today!
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={`${styles.learnMore} shadow-sm`}>
              Learn More
            </button>
            <button className={`${styles.signUp} shadow-sm`}>Sign Up</button>
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.heroImage}
              src="/homepage/hero-section.png"
              alt="plates-up-pos"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
