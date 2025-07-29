"use client";

import OrderLineMenu from "@/app/components/Pos/OrderLine/OrderLineMenu/OrderLineMenu";
import styles from "./page.module.css";
import OrderLineSlider from "@/app/components/Pos/OrderLine/OrderLineSlider/OrderLineSlider";

const page = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
          <OrderLineSlider />
          <OrderLineMenu />
        </div>
      </div>
    </>
  );
};

export default page;
