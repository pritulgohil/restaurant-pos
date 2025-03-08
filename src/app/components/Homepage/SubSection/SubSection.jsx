import styles from "./SubSection.module.css";

const SubSection = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
          <div className={styles.headerContainer}>
            <h3>
              Transform Your Restaurant with Our Intuitive POS and Digital Menu
              System
            </h3>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              Our POS system is designed for seamless usability, ensuring your
              staff can operate it effortlessly. With robust integration with
              digital menus, you can streamline order management and enhance
              customer satisfaction.
            </p>
          </div>
          <div className={styles.listContainer}>
            <ul className={styles.list}>
              <li>
                <img
                  className={styles.listIcon}
                  src="/icons/list-icon.png"
                  alt="list-icon"
                />
                User-friendly interface for quick training and operation
              </li>
              <li>
                <img
                  className={styles.listIcon}
                  src="/icons/list-icon.png"
                  alt="list-icon"
                />
                Seamless integration with digital menus for efficiency
              </li>
              <li>
                <img
                  className={styles.listIcon}
                  src="/icons/list-icon.png"
                  alt="list-icon"
                />
                Comprehensive order management to enhance service speed
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.subSectionImageContainer}>
            <img
              className={styles.subSectionImage}
              src="/homepage/sub-section.jpg"
              alt="list-icon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubSection;
