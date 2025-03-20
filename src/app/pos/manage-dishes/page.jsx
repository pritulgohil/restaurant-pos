import ManageDishes from "@/app/components/Pos/ManageDishes/ManageDishes";
import styles from "./page.module.css";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <ManageDishes />
      </div>
    </>
  );
};

export default page;
