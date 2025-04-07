import CategorySidebar from "@/app/components/Pos/ManageDishes/CategorySidebar";
import styles from "./page.module.css";
import DishesCards from "@/app/components/Pos/ManageDishes/DishesCards";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <CategorySidebar />
        <DishesCards />
      </div>
    </>
  );
};

export default page;
