import styles from "./FeaturesSection.module.css";

const FeaturesSection = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.sectionHeader}>
          <h3>
            Streamline Your Operations with Our
            <br />
            Advanced Inventory Tracking Feature
          </h3>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.flexCard}>
            <div className={styles.cardIcon}>
              <img src="icons/cube-side.png" alt="" />
            </div>
            <div className={styles.cardHeader}>
              <h4>
                Boost Customer Retention with Our Rewarding Loyalty Programs
              </h4>
            </div>
            <div className={styles.cardDescription}>
              <p>
                Our reporting tools provide actionable insights to enhance your
                business strategy.
              </p>
            </div>
            <div className={styles.cardButtonContainer}>
              <button className={styles.cardButton}>
                Learn More{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.flexCard}>
            <div className={styles.cardIcon}>
              <img src="icons/cube-side.png" alt="" />
            </div>
            <div className={styles.cardHeader}>
              <h4>
                Gain Insights with Comprehensive Reporting Tools For Your
                Restaurant
              </h4>
            </div>
            <div className={styles.cardDescription}>
              <p>
                Analyze sales trends and customer preferences to drive informed
                decisions.
              </p>
            </div>
            <div className={styles.cardButtonContainer}>
              <button className={styles.cardButton}>
                Sign Up
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.flexCard}>
            <div className={styles.cardIcon}>
              <img src="icons/cube-side.png" alt="" />
            </div>
            <div className={styles.cardHeader}>
              <h4>
                Enhance Customer Experience with Tailored Royalty Programs
              </h4>
            </div>
            <div className={styles.cardDescription}>
              <p>
                Encourage repeat visits and increase customer satisfaction with
                personalised rewards.
              </p>
            </div>
            <div className={styles.cardButtonContainer}>
              <button className={styles.cardButton}>
                Discover
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesSection;
