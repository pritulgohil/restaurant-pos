"use client";
import styles from "./AddCategoryDialog.module.css";
import { useState } from "react";
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
import { LoaderCircle } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { useRestaurantContext } from "@/context/RestaurantContext";

const AddCategoryDialog = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //   setLoading(true);

  //   try {
  //     const response = await fetch("/api/pos/create-category/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ name: categoryName, description }),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.error || "Something went wrong");
  //     setTimeout(() => {
  //       onCategoryAdded(data);
  //       setCategoryName("");
  //       setDescription("");
  //       setIsOpen(false);
  //       setLoading(false);
  //     }, 2000);
  //   } catch (err) {
  //     console.error("Error adding category:", err);
  //     setError(true);
  //   } finally {
  //   }
  // };

  const { restaurant, setRestaurant } = useRestaurantContext();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setError(false);
      const response = await fetch("/api/pos/create-category/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: categoryName,
          description,
          restaurantId: restaurant,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setTimeout(() => {
        onCategoryAdded(data);
        setCategoryName("");
        setDescription("");
        setIsOpen(false);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("Error adding category:", err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
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
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoryDescription" className="text-right">
              Description
            </Label>
            <Input
              id="categoryDescription"
              className="col-span-3"
              placeholder="Type your description here."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {error && (
          <div className={styles.error}>
            <TriangleAlert className={styles.errorIcon} />
            Name and description are required!
          </div>
        )}
        <DialogFooter>
          {loading ? (
            <Button disabled={loading}>
              <LoaderCircle className="animate-spin" />
              Saving...
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Save Category</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
