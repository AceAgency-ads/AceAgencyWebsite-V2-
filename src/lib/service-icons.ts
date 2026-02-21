/**
 * Client-side icon mapping for service definitions.
 * Separated from services.ts to keep the registry serializable (server-safe).
 * Import this only in 'use client' components.
 */

import {
  Target,
  Share2,
  Play,
  Search,
  Mail,
  Lightbulb,
  Code,
  type LucideIcon,
} from 'lucide-react';

const SERVICE_ICON_MAP: Readonly<Record<string, LucideIcon>> = {
  Target,
  Share2,
  Play,
  Search,
  Mail,
  Lightbulb,
  Code,
} as const;

/**
 * Resolve an icon name string to a Lucide React component.
 * Returns Target as fallback for unknown icon names.
 */
export function getServiceIcon(iconName: string): LucideIcon {
  return SERVICE_ICON_MAP[iconName] ?? Target;
}
