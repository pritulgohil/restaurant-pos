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

const AddDishDialog = ({ children }) => {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const { restaurant } = useRestaurantContext();
  const { categoryId } = useRestaurantContext();

  const handleSaveDish = async () => {
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
          categoryId: categoryId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

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

  useEffect(() => {
    fetchCategoryName();
  }, [categoryId]);

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
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Category</label>
            <Input value={categoryName} disabled />
          </div>
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
