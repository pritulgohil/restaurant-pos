"use client";
import { useEffect } from "react";
import styles from "./AddCategoryDialog.module.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

const EditCategoryDialog = ({ children }) => {
  //State for saving the category name in Input
  const [inputCategoryName, setInputCategoryName] = useState("");

  //State for saving the category description in Input
  const [description, setDescription] = useState("");

  //State for saving the category emoji in Input
  const [emoji, setEmoji] = useState("");

  //State for handling loading state of button
  const [loading, setLoading] = useState(false);

  //State for handling error state when fields are empty
  const [error, setError] = useState(false);

  //State for handling the open/close state of the dialog
  const [isOpen, setIsOpen] = useState(false);

  const {
    restaurant,
    categoryId,
    categories,
    fetchCategories,
    categoryName,
    setCategoryName,
  } = useRestaurantContext();

  // Snippet to find out which category to edit
  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const categoryToEdit = categories.find((cat) => cat._id === categoryId);
      if (categoryToEdit) {
        setInputCategoryName(categoryToEdit.name || "");
        setEmoji(categoryToEdit.emoji || "");
        setDescription(categoryToEdit.description || "");
      }
    }
  }, [categoryId, categories]);

  //Function to update the category
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
        // Function to update the category sidebar after editing
        fetchCategories();
        // It updates the category name displayed on the top of the dishes
        setCategoryName(data.name);
        // Clears the input fields after submission
        setInputCategoryName("");
        setEmoji("");
        setDescription("");
        // For dialog visibility and managing loading state
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            You are currently editing <strong>{categoryName}.</strong>
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
              onChange={(e) => setInputCategoryName(e.target.value)}
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
          <Button variant="destructive">Delete</Button>
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
