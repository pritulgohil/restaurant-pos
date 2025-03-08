import styles from "./DemoSection.module.css";

const DemoSection = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.backgroundImageContainer}>
          <img
            className={styles.backgroundImage}
            src="homepage/demo-background.jpg"
            alt=""
          />
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.sectionHeader}>
            <h3>Transform Your Restaurant Experience</h3>
          </div>
          <div className={styles.sectionDescription}>
            <p>
              Discover how our solutions can elevate your service and streamline
              operations. Request a demo today!
            </p>
          </div>
          <div className={styles.sectionButtons}>
            <button className={styles.demoButton}>Demo</button>
            <button className={styles.contactButton}>Contact</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoSection;
