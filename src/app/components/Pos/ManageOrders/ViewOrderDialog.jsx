import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ViewOrderDialog({ children, order }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Order #{order._id ? order._id.slice(-6) : order.orderId}
          </DialogTitle>
        </DialogHeader>
        {/* Your order details here */}
      </DialogContent>
    </Dialog>
  );
}
