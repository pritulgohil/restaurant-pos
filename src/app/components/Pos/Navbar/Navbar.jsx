import styles from "./Navbar.module.css";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className={`${styles.mainContainer} shadow-md`}>
        <div className={styles.logoContainer}>
          <h1>Plates Up</h1>
        </div>
        <div className={styles.adminContainer}>
          <div className={styles.bellIconContainer}>
            <Bell className={styles.bellIcon} />
          </div>
          <div className={styles.userContainer}>
            <div className={styles.avatarContainer}>
              <img src="user-avatar/chef.jpg" alt="" />
            </div>
            <div className={styles.userName}>
              <div className={styles.name}>John Doe</div>
              <div className={styles.role}>Admin</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
