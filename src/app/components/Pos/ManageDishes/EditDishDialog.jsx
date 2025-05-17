"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRestaurantContext } from "@/context/RestaurantContext";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";

const EditDishDialog = ({ open, setOpen, dish, onDishUpdated }) => {
  const { categories } = useRestaurantContext();
  const [separateCategoryId, setSeparateCategoryId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: dish?.name || "",
    description: dish?.description || "",
    available: dish?.available || true,
    categoryId: dish?.categoryId || "",
    categoryName: dish?.categoryName || "",
    price: dish?.price || "",
    emoji: dish?.emoji || "",
    restaurantId: dish?.restaurantId || "",
  });

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name || "",
        price: dish.price || "",
        emoji: dish.emoji || "",
        description: dish.description || "",
        available: dish.available ?? true,
        categoryId: dish.categoryId || "",
        categoryName: dish.categoryName || "",
        restaurantId: dish.restaurantId || "",
      });
    }
  }, [dish]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/pos/edit-dish/6825646d6ab459db3e035e96`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update dish");
      }

      await onDishUpdated();
      setOpen(false);
    } catch (error) {
      setError(error.message || "An error occurred while updating the dish");
      console.error("Error updating dish:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Dish</DialogTitle>
          <DialogDescription>
            Update fields where necessary to update dish.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Dish Name</label>
            <Input
              name="name"
              value={formData.name}
              placeholder="e.g., Belgian Waffle"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Description</label>
            <Input
              name="description"
              value={formData.description}
              placeholder="e.g., Dessert"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Category</label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => {
                const selectedCategory = categories.find(
                  (cat) => cat._id === value
                );
                if (selectedCategory) {
                  setFormData((prev) => ({
                    ...prev,
                    categoryId: selectedCategory._id,
                    categoryName: selectedCategory.name,
                  }));
                  setSeparateCategoryId(selectedCategory._id);
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

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Emoji</label>
            <Input
              name="emoji"
              value={formData.emoji}
              placeholder="e.g., Emoji"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Price</label>
            <Input
              name="price"
              value={formData.price}
              placeholder="$8.00"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Available</label>
            <Select
              value={formData.available.toString()}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  available: value === "true",
                }))
              }
            >
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
        {/* <div className="flex items-center gap-1 error">
          {error && (
            <>
              <TriangleAlert className="w-5 text-red-500" />
              <p className="text-red-500 text-sm">{error}</p>
            </>
          )}
        </div> */}
        <DialogFooter>
          {loading ? (
            <Button disabled={loading}>
              <LoaderCircle className="animate-spin" />
              Saving...
            </Button>
          ) : (
            <Button onClick={handleSave}>Update Dish</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDishDialog;
