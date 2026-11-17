/**
 * KED fork: show a page to administrators only; anyone else gets "Page not
 * found". Used for upstream's developer-facing pages (see `KED.adminOnlyModuleRequests`).
 */
import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { NotFoundPage } from '@/shared/ui/NotFoundPage';
import { KED } from './flags';

export function KedAdminOnly({ children }: { children: ReactNode }) {
  const role = useAuthStore((s) => s.userRole);
  if (KED.adminOnlyModuleRequests && role !== 'admin') return <NotFoundPage />;
  return <>{children}</>;
}
