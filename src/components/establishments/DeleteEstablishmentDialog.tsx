import { useTranslation } from "react-i18next";

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
import type { Establishment } from "@/lib/establishments-context";

interface Props {
  establishment: Establishment | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteEstablishmentDialog({ establishment, onOpenChange, onConfirm }: Props) {
  const { t } = useTranslation();
  return (
    <AlertDialog open={!!establishment} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("establishments.delete.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("establishments.delete.description", { name: establishment?.name ?? "" })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {t("establishments.actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
