import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ESTABLISHMENT_CATEGORIES,
  type Establishment,
  type EstablishmentBranding,
  type EstablishmentCategory,
  type EstablishmentInput,
  type EstablishmentStatus,
} from "@/lib/establishments-context";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Establishment | null;
  onSubmit: (input: EstablishmentInput) => void | Promise<void>;
}

const DEFAULT_BRANDING: EstablishmentBranding = {
  primaryColor: "#4338ca",
  secondaryColor: "#9333ea",
  theme: "light",
  logoUrl: null,
  coverUrl: null,
};

function emptyState(): EstablishmentInput {
  return {
    name: "",
    category: "restaurant",
    description: "",
    status: "draft",
    branding: { ...DEFAULT_BRANDING },
    contact: {},
    address: {},
    openingHours: "",
    social: {},
  };
}

export function EstablishmentFormDialog({ open, onOpenChange, initial, onSubmit }: Props) {
  const { t } = useTranslation();
  const [state, setState] = useState<EstablishmentInput>(emptyState);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState("info");

  useEffect(() => {
    if (!open) return;
    setTab("info");
    if (initial) {
      const { id: _id, menusCount: _mc, updatedAt: _ua, ...rest } = initial;
      setState({
        ...rest,
        description: rest.description ?? "",
        openingHours: rest.openingHours ?? "",
      });
    } else {
      setState(emptyState());
    }
  }, [open, initial]);

  const update = <K extends keyof EstablishmentInput>(key: K, value: EstablishmentInput[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const canSubmit = state.name.trim().length >= 2;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit({
        ...state,
        name: state.name.trim(),
      });
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initial ? t("establishments.form.editTitle") : t("establishments.form.createTitle")}
          </DialogTitle>
          <DialogDescription>{t("establishments.form.subtitle")}</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">{t("establishments.form.tabs.info")}</TabsTrigger>
            <TabsTrigger value="contact">{t("establishments.form.tabs.contact")}</TabsTrigger>
            <TabsTrigger value="brand">{t("establishments.form.tabs.brand")}</TabsTrigger>
            <TabsTrigger value="social">{t("establishments.form.tabs.social")}</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="est-name">{t("establishments.form.name")} *</Label>
              <Input
                id="est-name"
                value={state.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={t("establishments.form.namePlaceholder")}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("establishments.form.category")}</Label>
                <Select
                  value={state.category}
                  onValueChange={(v) => update("category", v as EstablishmentCategory)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTABLISHMENT_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {t(`establishments.categories.${c}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("establishments.form.status")}</Label>
                <Select
                  value={state.status}
                  onValueChange={(v) => update("status", v as EstablishmentStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t("establishments.status.active")}</SelectItem>
                    <SelectItem value="draft">{t("establishments.status.draft")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="est-desc">{t("establishments.form.description")}</Label>
              <Textarea
                id="est-desc"
                rows={3}
                value={state.description ?? ""}
                onChange={(e) => update("description", e.target.value)}
                placeholder={t("establishments.form.descriptionPlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="est-hours">{t("establishments.form.openingHours")}</Label>
              <Input
                id="est-hours"
                value={state.openingHours ?? ""}
                onChange={(e) => update("openingHours", e.target.value)}
                placeholder={t("establishments.form.openingHoursPlaceholder")}
              />
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("establishments.form.phone")}</Label>
                <Input
                  value={state.contact.phone ?? ""}
                  onChange={(e) =>
                    update("contact", { ...state.contact, phone: e.target.value })
                  }
                  placeholder="+351 000 000 000"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("establishments.form.whatsapp")}</Label>
                <Input
                  value={state.contact.whatsapp ?? ""}
                  onChange={(e) =>
                    update("contact", { ...state.contact, whatsapp: e.target.value })
                  }
                  placeholder="+351 000 000 000"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("common.email")}</Label>
                <Input
                  type="email"
                  value={state.contact.email ?? ""}
                  onChange={(e) =>
                    update("contact", { ...state.contact, email: e.target.value })
                  }
                  placeholder="contacto@exemplo.pt"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("establishments.form.website")}</Label>
                <Input
                  value={state.contact.website ?? ""}
                  onChange={(e) =>
                    update("contact", { ...state.contact, website: e.target.value })
                  }
                  placeholder="https://"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("establishments.form.street")}</Label>
              <Input
                value={state.address.street ?? ""}
                onChange={(e) =>
                  update("address", { ...state.address, street: e.target.value })
                }
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("establishments.form.city")}</Label>
                <Input
                  value={state.address.city ?? ""}
                  onChange={(e) =>
                    update("address", { ...state.address, city: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{t("establishments.form.postalCode")}</Label>
                <Input
                  value={state.address.postalCode ?? ""}
                  onChange={(e) =>
                    update("address", { ...state.address, postalCode: e.target.value })
                  }
                  placeholder="0000-000"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="brand" className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("establishments.form.primaryColor")}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    className="h-10 w-16 cursor-pointer p-1"
                    value={state.branding.primaryColor}
                    onChange={(e) =>
                      update("branding", { ...state.branding, primaryColor: e.target.value })
                    }
                  />
                  <Input
                    value={state.branding.primaryColor}
                    onChange={(e) =>
                      update("branding", { ...state.branding, primaryColor: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("establishments.form.secondaryColor")}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    className="h-10 w-16 cursor-pointer p-1"
                    value={state.branding.secondaryColor}
                    onChange={(e) =>
                      update("branding", { ...state.branding, secondaryColor: e.target.value })
                    }
                  />
                  <Input
                    value={state.branding.secondaryColor}
                    onChange={(e) =>
                      update("branding", { ...state.branding, secondaryColor: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("establishments.form.theme")}</Label>
              <Select
                value={state.branding.theme}
                onValueChange={(v) =>
                  update("branding", { ...state.branding, theme: v as "light" | "dark" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t("establishments.form.themeLight")}</SelectItem>
                  <SelectItem value="dark">{t("establishments.form.themeDark")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("establishments.form.logoUrl")}</Label>
                <Input
                  value={state.branding.logoUrl ?? ""}
                  onChange={(e) =>
                    update("branding", { ...state.branding, logoUrl: e.target.value || null })
                  }
                  placeholder="https://"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("establishments.form.coverUrl")}</Label>
                <Input
                  value={state.branding.coverUrl ?? ""}
                  onChange={(e) =>
                    update("branding", { ...state.branding, coverUrl: e.target.value || null })
                  }
                  placeholder="https://"
                />
              </div>
            </div>
            <div
              className="mt-2 h-24 w-full rounded-xl border border-border/70"
              style={{
                background: `linear-gradient(135deg, ${state.branding.primaryColor}, ${state.branding.secondaryColor})`,
              }}
              aria-hidden
            />
          </TabsContent>

          <TabsContent value="social" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Instagram</Label>
              <Input
                value={state.social.instagram ?? ""}
                onChange={(e) => update("social", { ...state.social, instagram: e.target.value })}
                placeholder="@handle"
              />
            </div>
            <div className="space-y-2">
              <Label>Facebook</Label>
              <Input
                value={state.social.facebook ?? ""}
                onChange={(e) => update("social", { ...state.social, facebook: e.target.value })}
                placeholder="facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label>TikTok</Label>
              <Input
                value={state.social.tiktok ?? ""}
                onChange={(e) => update("social", { ...state.social, tiktok: e.target.value })}
                placeholder="@handle"
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit || submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {initial ? t("common.save") : t("establishments.form.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
