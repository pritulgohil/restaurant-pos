import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRestaurantContext } from "@/context/RestaurantContext";

export default function DeleteDialog({
  open,
  onOpenChange,
  dishName,
  dishId,
  fetchAllDishes,
  fetchDishByCategory,
}) {
  const { categoryId } = useRestaurantContext();

  const onConfirm = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/pos/delete-dish/${dishId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to delete dish:", data.error);
        return;
      }

      console.log("Dish deleted:", data);
      onOpenChange(false);
      if (categoryId === null) {
        fetchAllDishes();
      } else {
        fetchDishByCategory();
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete <strong>{dishName}</strong>. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
