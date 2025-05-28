"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantContext } from "@/context/RestaurantContext";
import { LoaderCircle } from "lucide-react";
import { TriangleAlert } from "lucide-react";

const AddDishDialog = ({ children, onDishAdded, fetchByCategory }) => {
  //State to save dish name
  const [dishName, setDishName] = useState("");

  //State to save dish description
  const [description, setDescription] = useState("");

  //State to save dish emoji
  const [emoji, setEmoji] = useState("");

  //State to save dish price
  const [price, setPrice] = useState("");

  //State to save button state
  const [loading, setLoading] = useState(false);

  //State to save dish availability
  const [available, setAvailable] = useState(true);

  //State to save dish category
  const [isOpen, setIsOpen] = useState(false);

  //State for save category name
  const [categoryName, setCategoryName] = useState("");

  //State that saves restaurantId
  const { restaurant } = useRestaurantContext();

  //State that saves categoryId
  const { categoryId, setCategoryId } = useRestaurantContext();

  //State that saves categories
  const { categories } = useRestaurantContext();

  //State to save category from the dropdown
  const [separateCategoryId, setSeparateCategoryId] = useState(null);

  //State to save error message
  const [error, setError] = useState("");

  const handleSaveDish = async () => {
    setError("");
    if (!dishName || !description || !emoji || !price) {
      setError("All fields are required");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await fetch("/api/pos/create-dish/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: dishName,
          description: description,
          categoryName: categoryName,
          emoji: emoji,
          price: price,
          available: available,
          restaurantId: restaurant,
          categoryId: categoryId ?? separateCategoryId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      setDishName("");
      setDescription("");
      setCategoryName("");
      setEmoji("");
      setPrice("");
      setAvailable(false);
      if (categoryId === null) {
        onDishAdded?.();
      } else {
        fetchByCategory?.();
      }

      setTimeout(() => {
        setLoading(false);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  //Function to pre-populate the category name
  const fetchCategoryName = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/pos/fetch-category/${categoryId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await res.json();
      setCategoryName(data.category.name);
    } catch (err) {
      console.error("Error fetching category:", err);
    }
  };

  //If categoryId is not null, fetch the category name
  useEffect(() => {
    if (!categoryId) return;
    fetchCategoryName();
  }, [categoryId, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Dish</DialogTitle>
          <DialogDescription>
            Fill out the fields below to create a new dish.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Dish Name</label>
            <Input
              placeholder="e.g., Belgian Waffle"
              onChange={(e) => setDishName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Description</label>
            <Input
              placeholder="e.g., Dessert"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {categoryId === null ? (
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium">Category</label>
              <Select
                onValueChange={(value) => {
                  const selectedCategory = categories.find(
                    (cat) => cat._id === value
                  );
                  if (selectedCategory) {
                    setSeparateCategoryId(selectedCategory._id);
                    setCategoryName(selectedCategory.name);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium">Category</label>
              <Input value={categoryName} disabled />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Emoji</label>
            <Input
              placeholder="e.g., Emoji"
              onChange={(e) => setEmoji(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Price</label>
            <Input
              placeholder="$8.00"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Available</label>
            <Select onValueChange={(value) => setAvailable(value === "true")}>
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-1 error">
          {error && (
            <>
              <TriangleAlert className="w-5 text-red-500" />
              <p className="text-red-500 text-sm">{error}</p>
            </>
          )}
        </div>
        <DialogFooter>
          {loading ? (
            <Button disabled={loading}>
              <LoaderCircle className="animate-spin" />
              Saving...
            </Button>
          ) : (
            <Button onClick={handleSaveDish}>Save Dish</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDishDialog;
