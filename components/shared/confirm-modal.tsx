"use client";

import { ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "gold";
  onConfirm?: () => void | Promise<void>;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "default",
  onConfirm,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (loading) return;
    if (!onConfirm) {
      onOpenChange(false);
      return;
    }
    try {
      setLoading(true);
      await Promise.resolve(onConfirm());
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (loading) return;
        onOpenChange(next);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children && <div className="py-2">{children}</div>}
        <DialogFooter>
          <Button
            variant={variant}
            onClick={handleConfirm}
            disabled={loading}
            aria-busy={loading}
          >
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            )}
            {confirmText}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
