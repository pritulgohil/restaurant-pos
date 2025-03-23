import styles from "./ManageDishes.module.css";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
            {Array.from({ length: 0 }).map((_, index) => (
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
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <SquarePlus />
                Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Enter the details for the new category and save it.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="categoryName"
                    className="col-span-3"
                    placeholder="Category Name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoryName" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    className={styles.textArea}
                    placeholder="Type your message here."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ManageDishes;
