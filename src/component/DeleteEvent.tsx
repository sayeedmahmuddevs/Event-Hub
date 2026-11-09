
"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface DeleteEventProps {
  id: string;
  onDeleted?: () => void;
}

export function DeleteEvent({ id, onDeleted }: DeleteEventProps) {
  const session = authClient.useSession();
  const user = session.data?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteEvent = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/events/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success("Event deleted successfully!");

      setOpen(false);
      onDeleted?.();

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="
        border-gray-200 bg-white text-gray-900
        dark:border-gray-700 dark:bg-[#17152f] dark:text-white
        transition-colors duration-300
      ">
        <AlertDialogHeader>

          {/* Title */}
          <AlertDialogTitle className="
            text-gray-900 dark:text-white
          ">
            Are you absolutely sure?
          </AlertDialogTitle>

          {/* Description */}
          <AlertDialogDescription className="
            text-gray-600 dark:text-gray-400
          ">
            This action cannot be undone. This event will be permanently deleted.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          {/* Cancel */}
          <AlertDialogCancel
            disabled={loading}
            className="
              border-gray-300 bg-white text-gray-700
              hover:bg-gray-100
              dark:border-gray-600 dark:bg-gray-800
              dark:text-gray-200 dark:hover:bg-gray-700
            "
          >
            Cancel
          </AlertDialogCancel>

          {/* Delete */}
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEvent();
            }}
            className="
              bg-red-600 text-white
              hover:bg-red-700
              dark:bg-red-600 dark:hover:bg-red-700
            "
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
