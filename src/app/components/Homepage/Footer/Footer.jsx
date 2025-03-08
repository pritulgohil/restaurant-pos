import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <div className={styles.leftSideContainer}>
            <div className={styles.footerLogoContainer}>
              <h2>Plates Up</h2>
            </div>
            <div className={styles.footerElement}>
              <div className={styles.sectionHeader}>
                <h4>Address:</h4>
              </div>
              <div className={styles.sectionDescription}>
                <p>710 - 1525 Dyer Dr, London, ON, N6H 0L2</p>
              </div>
            </div>
            <div className={styles.footerElement}>
              <div className={styles.sectionHeader}>
                <h4>Contact:</h4>
              </div>
              <div className={styles.sectionDescription}>
                <p>1-800-MY-PLATES</p>
              </div>
            </div>
            <div className={styles.socialMediaIcons}>
              <div className={styles.iconContainer}>
                <img src="/icons/facebook.png" alt="" />
              </div>
              <div className={styles.iconContainer}>
                <img src="/icons/instagram.png" alt="" />
              </div>
              <div className={styles.iconContainer}>
                <img src="/icons/twitter.png" alt="" />
              </div>
              <div className={styles.iconContainer}>
                <img src="/icons/linkedin.png" alt="" />
              </div>
              <div className={styles.youtubeContainer}>
                <img src="/icons/youtube.png" alt="" />
              </div>
            </div>
          </div>
          <div className={styles.rightSideContainer}>
            <div className={styles.column}>
              <ul>
                <li>Link One</li>
                <li>Link One</li>
                <li>Link One</li>
                <li>Link One</li>
                <li>Link One</li>
              </ul>
            </div>
            <div className={styles.column}>
              <ul>
                <li>Link One</li>
                <li>Link One</li>
                <li>Link One</li>
                <li>Link One</li>
                <li>Link One</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.divider}>
          <hr />
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © 2025 Plates Up. All Rights Reserved
          </div>
          <div className={styles.footerLinks}>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Settings</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
