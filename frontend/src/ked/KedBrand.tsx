/**
 * KED fork: the KED marks drawn where upstream draws its own logo.
 *
 * `Logo` and `BrandLockup` in `shared/ui/Logo.tsx` hand over to these when
 * `KED.useKedBrand` is on. A logo an administrator uploads in the workspace
 * branding settings still takes precedence wherever upstream offers one.
 *
 * Per the brand masters' readme: the seasons mark is for 64px and up, the
 * small mark for 44px and below. Both are designed for a white background.
 */
import clsx from 'clsx';
import seasons from './brand/ked-logo-seasons.svg?url';
import seasonsSmall from './brand/ked-logo-seasons-small.svg?url';
import letterhead from './brand/ked-letterhead.svg?url';
import letterheadSmall from './brand/ked-letterhead-small.svg?url';
import { KED } from './flags';

const MARK_SIZE = { xs: 'h-4 w-4', sm: 'h-8 w-8', md: 'h-8 w-8', lg: 'h-12 w-12', xl: 'h-16 w-16' } as const;

/** The square mark, in place of upstream's kit mark. */
export function KedMark({
  size = 'md',
  animate = false,
  className,
}: {
  size?: keyof typeof MARK_SIZE;
  animate?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(MARK_SIZE[size], 'relative inline-block shrink-0', animate && 'animate-fade-in', className)}
      data-testid="oe-logo-mark"
    >
      <img
        src={size === 'xl' ? seasons : seasonsSmall}
        alt=""
        aria-hidden
        draggable={false}
        className="block h-full w-full select-none"
      />
    </span>
  );
}

/** Letterhead heights: `nav` is the sidebar, `lg` the loading screen. */
const LOCKUP_HEIGHT = { nav: '40px', lg: '72px' } as const;

/** The letterhead, in place of upstream's mark-and-name lockup. */
export function KedLockup({
  size = 'nav',
  animate = false,
  className,
}: {
  size?: keyof typeof LOCKUP_HEIGHT;
  animate?: boolean;
  className?: string;
}) {
  return (
    <span className={clsx('inline-flex items-center', animate && 'animate-fade-in', className)} role="img" aria-label={KED.displayName}>
      <img
        src={size === 'nav' ? letterheadSmall : letterhead}
        alt=""
        aria-hidden
        draggable={false}
        className="block w-auto select-none dark:invert"
        style={{ height: LOCKUP_HEIGHT[size] }}
      />
    </span>
  );
}
