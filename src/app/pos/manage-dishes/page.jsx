import ManageDishes from "@/app/components/Pos/ManageDishes/ManageDishes";
import styles from "./page.module.css";
import Dishes from "@/app/components/Pos/ManageDishes/Dishes";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <ManageDishes />
        <Dishes />
      </div>
    </>
  );
};

export default page;
