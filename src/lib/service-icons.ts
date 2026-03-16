/**
 * Client-side icon mapping for service definitions.
 * Separated from services.ts to keep the registry serializable (server-safe).
 * Import this only in 'use client' components.
 *
 * Supports both Lucide icons (stroke-based UI icons) and react-icons
 * (brand logos for Google, Facebook, TikTok).
 */

import {
  Target,
  Search,
  Mail,
  Lightbulb,
  Code,
  type LucideIcon,
} from 'lucide-react';
import { FaGoogle, FaFacebookF, FaTiktok } from 'react-icons/fa6';
import { type IconType } from 'react-icons';

export type ServiceIconKind = 'lucide' | 'react-icons';

export interface ServiceIcon {
  readonly icon: LucideIcon | IconType;
  readonly kind: ServiceIconKind;
}

const SERVICE_ICON_MAP: Readonly<Record<string, ServiceIcon>> = {
  Target: { icon: Target, kind: 'lucide' },
  FaGoogle: { icon: FaGoogle, kind: 'react-icons' },
  FaFacebookF: { icon: FaFacebookF, kind: 'react-icons' },
  FaTiktok: { icon: FaTiktok, kind: 'react-icons' },
  Search: { icon: Search, kind: 'lucide' },
  Mail: { icon: Mail, kind: 'lucide' },
  Lightbulb: { icon: Lightbulb, kind: 'lucide' },
  Code: { icon: Code, kind: 'lucide' },
} as const;

const FALLBACK: ServiceIcon = { icon: Target, kind: 'lucide' };

/**
 * Resolve an icon name string to an icon component + kind tuple.
 * Returns Target (Lucide) as fallback for unknown icon names.
 */
export function getServiceIcon(iconName: string): ServiceIcon {
  return SERVICE_ICON_MAP[iconName] ?? FALLBACK;
}
