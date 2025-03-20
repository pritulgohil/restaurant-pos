import styles from "./ManageDishes.module.css";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";

const ManageDishes = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <div className={styles.headerContainer}>
            <h3>Dishes Category</h3>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.cardContainer}>
              <div className={styles.leftSideContainer}>
                <div className={styles.vectorContainer}>
                  <img src="/food-icons/burger.png" alt="" />
                </div>
                <div className={styles.categoryHeader}>
                  <h4>All Dishes</h4>
                </div>
              </div>
              <div className={styles.rightSideContainer}>
                <div className={styles.itemCount}>48</div>
              </div>
            </div>
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className={styles.cardContainer}>
                <div className={styles.leftSideContainer}>
                  <div className={styles.vectorContainer}>
                    <img src="/food-icons/burger.png" alt="" />
                  </div>
                  <div className={styles.categoryHeader}>
                    <h4>All Dishes</h4>
                  </div>
                </div>
                <div className={styles.rightSideContainer}>
                  <div className={styles.itemCount}>48</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button>
            <SquarePlus />
            Add New Category
          </Button>
        </div>
      </div>
    </>
  );
};

export default ManageDishes;
