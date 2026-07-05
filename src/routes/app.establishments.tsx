import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Building2, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EstablishmentCard } from "@/components/establishments/EstablishmentCard";
import { EstablishmentFormDialog } from "@/components/establishments/EstablishmentFormDialog";
import { DeleteEstablishmentDialog } from "@/components/establishments/DeleteEstablishmentDialog";
import {
  ESTABLISHMENT_CATEGORIES,
  useEstablishments,
  type Establishment,
  type EstablishmentCategory,
} from "@/lib/establishments-context";

export const Route = createFileRoute("/app/establishments")({
  component: EstablishmentsPage,
});

const PAGE_SIZE = 9;

type StatusFilter = "all" | "active" | "draft";
type SortOrder = "recent" | "oldest";

function EstablishmentsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { establishments, create, update, remove, duplicate } = useEstablishments();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Establishment | null>(null);
  const [toDelete, setToDelete] = useState<Establishment | null>(null);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<"all" | EstablishmentCategory>("all");
  const [city, setCity] = useState<string>("all");
  const [sort, setSort] = useState<SortOrder>("recent");
  const [page, setPage] = useState(1);

  const cities = useMemo(
    () =>
      Array.from(
        new Set(
          establishments
            .map((e) => e.address.city?.trim())
            .filter((c): c is string => !!c && c.length > 0),
        ),
      ).sort(),
    [establishments],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = establishments.filter((e) => {
      if (status !== "all" && e.status !== status) return false;
      if (category !== "all" && e.category !== category) return false;
      if (city !== "all" && e.address.city !== city) return false;
      if (
        q &&
        !e.name.toLowerCase().includes(q) &&
        !(e.address.city ?? "").toLowerCase().includes(q)
      )
        return false;
      return true;
    });
    list.sort((a, b) => {
      const at = new Date(a.updatedAt).getTime();
      const bt = new Date(b.updatedAt).getTime();
      return sort === "recent" ? bt - at : at - bt;
    });
    return list;
  }, [establishments, query, status, category, city, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (e: Establishment) => {
    setEditing(e);
    setFormOpen(true);
  };

  const isEmpty = establishments.length === 0;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("nav.establishments")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("establishments.subtitle")}
          </p>
        </div>
        {!isEmpty && (
          <Button onClick={openCreate} className="shrink-0 bg-gradient-brand shadow-glow">
            <Plus className="h-4 w-4" />
            {t("establishments.createNew")}
          </Button>
        )}
      </header>

      {isEmpty ? (
        <EmptyState onCreate={openCreate} />
      ) : (
        <>
          <Card className="mt-6 rounded-2xl border-border/70 bg-card p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 lg:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder={t("establishments.searchPlaceholder")}
                  className="h-10 pl-9"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select
                  value={category}
                  onValueChange={(v) => {
                    setCategory(v as typeof category);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-10 w-[170px]">
                    <SelectValue placeholder={t("establishments.filters.category")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("establishments.filters.allCategories")}
                    </SelectItem>
                    {ESTABLISHMENT_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {t(`establishments.categories.${c}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={city}
                  onValueChange={(v) => {
                    setCity(v);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-10 w-[150px]">
                    <SelectValue placeholder={t("establishments.filters.city")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("establishments.filters.allCities")}</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sort} onValueChange={(v) => setSort(v as SortOrder)}>
                  <SelectTrigger className="h-10 w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">
                      {t("establishments.filters.recent")}
                    </SelectItem>
                    <SelectItem value="oldest">
                      {t("establishments.filters.oldest")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Tabs
              value={status}
              onValueChange={(v) => {
                setStatus(v as StatusFilter);
                setPage(1);
              }}
              className="mt-4"
            >
              <TabsList>
                <TabsTrigger value="all">{t("establishments.filters.all")}</TabsTrigger>
                <TabsTrigger value="active">{t("establishments.status.active")}</TabsTrigger>
                <TabsTrigger value="draft">{t("establishments.status.draft")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>

          {paged.length === 0 ? (
            <Card className="mt-6 rounded-2xl border-dashed border-border/70 bg-gradient-soft p-12 text-center shadow-none">
              <p className="text-sm text-muted-foreground">
                {t("establishments.noResults")}
              </p>
            </Card>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((e) => (
                <EstablishmentCard
                  key={e.id}
                  establishment={e}
                  onEdit={openEdit}
                  onDelete={setToDelete}
                  onDuplicate={(est) => duplicate(est.id)}
                  onQrCode={(est) => {
                    navigate({
                      to: "/app/qr",
                      search: { establishment: est.id },
                    });
                  }}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.max(1, p - 1));
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.min(totalPages, p + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      <EstablishmentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={(input) => {
          if (editing) update(editing.id, input);
          else create(input);
        }}
      />
      <DeleteEstablishmentDialog
        establishment={toDelete}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={() => {
          if (toDelete) remove(toDelete.id);
          setToDelete(null);
        }}
      />
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  const { t } = useTranslation();
  return (
    <Card className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border-dashed border-border/70 bg-gradient-soft p-14 text-center shadow-none">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
        <Building2 className="h-7 w-7" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          {t("establishments.empty.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("establishments.empty.desc")}</p>
      </div>
      <Button onClick={onCreate} size="lg" className="bg-gradient-brand shadow-glow">
        <Plus className="h-4 w-4" />
        {t("establishments.empty.cta")}
      </Button>
    </Card>
  );
}
