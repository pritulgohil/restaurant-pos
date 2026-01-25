"use client";

import OrderLineMenu from "@/app/components/Pos/OrderLine/OrderLineMenu/OrderLineMenu";
import styles from "./page.module.css";
import OrderLineSlider from "@/app/components/Pos/OrderLine/OrderLineSlider/OrderLineSlider";
import OrderLineSummary from "@/app/components/Pos/OrderLine/OrderLineSummary/OrderLineSummary";
import { useRestaurantContext } from "@/context/RestaurantContext";

const page = () => {
  const { orderLineSummaryVisible } = useRestaurantContext();
  return (
    <>
      <div className={styles.mainContainer}>
        <div
          className={
            orderLineSummaryVisible ? styles.leftSideToggle : styles.leftSide
          }
        >
          <OrderLineSlider />
          <OrderLineMenu />
        </div>
        <div
          className={
            orderLineSummaryVisible ? styles.rightSideToggle : styles.rightSide
          }
        >
          <OrderLineSummary />
        </div>
      </div>
    </>
  );
};

export default page;
