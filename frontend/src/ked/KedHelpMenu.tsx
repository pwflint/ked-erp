/**
 * KED fork: the Help menu shown in place of upstream's.
 *
 * Upstream's menu links to its own tutorials, documentation, community and
 * support channels. This one carries the two things the fork owes its users:
 * the credit to the upstream project and a link to the source of the running
 * version (AGPL-3.0, section 13).
 */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, HelpCircle } from 'lucide-react';
import clsx from 'clsx';
import { KED } from './flags';

export function KedHelpMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = t('ked.help.title', { defaultValue: 'About this software' });

  return (
    <div className="relative hidden sm:block" ref={ref} data-testid="header-help-menu">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
          'text-content-tertiary hover:bg-surface-secondary hover:text-content-secondary',
          open && 'bg-surface-secondary text-content-secondary',
        )}
        title={label}
        aria-label={label}
      >
        <HelpCircle size={16} strokeWidth={1.75} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-border-light bg-surface-elevated shadow-lg animate-scale-in py-1 z-dropdown"
        >
          <a
            role="menuitem"
            href={KED.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-content-primary hover:bg-surface-secondary transition-colors"
          >
            <Github size={14} className="text-content-tertiary shrink-0" />
            <span className="flex-1">
              {t('ked.help.credit', { defaultValue: 'Based on OpenConstructionERP · source code' })}
            </span>
            <ExternalLink size={12} className="text-content-quaternary shrink-0" />
          </a>
        </div>
      )}
    </div>
  );
}
