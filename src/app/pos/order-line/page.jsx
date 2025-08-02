"use client";

import OrderLineMenu from "@/app/components/Pos/OrderLine/OrderLineMenu/OrderLineMenu";
import styles from "./page.module.css";
import OrderLineSlider from "@/app/components/Pos/OrderLine/OrderLineSlider/OrderLineSlider";
import OrderLineSummary from "@/app/components/Pos/OrderLine/OrderLineSummary/OrderLineSummary";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
          <OrderLineSlider />
          <OrderLineMenu />
        </div>
        <div className={styles.rightSide}>
          <OrderLineSummary />
        </div>
      </div>
    </>
  );
};

export default page;
