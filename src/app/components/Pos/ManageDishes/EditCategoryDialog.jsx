"use client";
import { useEffect } from "react";
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

const EditCategoryDialog = ({ children, onCategoryAdded }) => {
  //State for saving the category name
  const [inputCategoryName, inputSetCategoryName] = useState("");

  //State for saving the category description
  const [description, setDescription] = useState("");

  //State for saving the category emoji
  const [emoji, setEmoji] = useState("");

  //State for handling loading state of button
  const [loading, setLoading] = useState(false);

  //State for handling error state when fields are empty
  const [error, setError] = useState(false);

  //State for handling the open/close state of the dialog
  const [isOpen, setIsOpen] = useState(false);

  //State context for restaurant ID
  const { restaurant } = useRestaurantContext();

  const {
    categoryId,
    setCategoryId,
    fetchCategories,
    categoryName,
    setCategoryName,
  } = useRestaurantContext();

  //State for categories for the restaurant
  const { categories, setCategories } = useRestaurantContext();

  console.log("Current Category:", categoryId);
  console.log("Categories:", categories);

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const categoryToEdit = categories.find((cat) => cat._id === categoryId);
      if (categoryToEdit) {
        inputSetCategoryName(categoryToEdit.name || "");
        setEmoji(categoryToEdit.emoji || "");
        setDescription(categoryToEdit.description || "");
      }
    }
  }, [categoryId, categories]);

  //Function to save category
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/pos/edit-category/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: inputCategoryName,
          emoji: emoji,
          description,
          restaurantId: restaurant,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setTimeout(() => {
        fetchCategories(); // Fetch updated
        setCategoryName(data.name);
        inputSetCategoryName("");
        setEmoji("");
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
      <DialogTrigger asChild>{children}</DialogTrigger> {/* ✅ ADD THIS */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            You are currently editing <strong>{inputCategoryName}.</strong>
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
              value={inputCategoryName}
              onChange={(e) => inputSetCategoryName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emoji" className="text-right">
              Emoji
            </Label>
            <Input
              id="emoji"
              className="col-span-3"
              placeholder="Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
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
            All fields are required!
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

export default EditCategoryDialog;
