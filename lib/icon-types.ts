import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/** Lucide icons or custom icon wrappers (e.g. raster brand marks). */
export type AppIcon = LucideIcon | ComponentType<{ className?: string }>;
