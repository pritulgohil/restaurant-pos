import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2, LoaderCircle } from "lucide-react";
import { useState } from "react";

function DeleteOrderDialog({ orderId, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false); // fully controlled

  const handleDelete = async () => {
    setIsDeleting(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/pos/delete-order/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete order. Status: ${response.status}`);
      }

      // Keep dialog open for 5 seconds
      setTimeout(() => {
        setIsDeleting(false);
        setOpen(false); // CLOSE after delay
        if (onDelete) {
          onDelete(orderId);
        }
      }, 2000);
    } catch (error) {
      console.error("Error deleting order:", error);
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!isDeleting) setOpen(value); // block closing while deleting
      }}
    >
      {/* Trigger */}
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={(e) => {
            e.preventDefault(); // Prevent default closing behavior
            setOpen(true);
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>

      {/* Dialog Content */}

      <AlertDialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isDeleting ? "Deleting..." : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isDeleting
              ? "Please wait while we delete the order..."
              : `This action cannot be undone. This will permanently delete order #${orderId.slice(
                  -6
                )} from the records.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel
            disabled={isDeleting}
            onClick={() => setOpen(false)}
          >
            Cancel
          </AlertDialogCancel>

          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteOrderDialog;
