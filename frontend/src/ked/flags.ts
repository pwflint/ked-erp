/**
 * KED fork: the switches this fork's patch reads.
 *
 * Every change the fork makes to upstream's interface is a one-line guard that
 * reads a value from this file, so an upstream merge conflicts only on those
 * lines. Nothing upstream is deleted: set a flag to `false` (or empty a list)
 * and the upstream behaviour is back.
 */
export const KED = {
  /** Hide the Learn card (videos and cases) at the top of the sidebar and its top-bar way back. */
  hideLearn: true,
  /** Do not mount the global product tour. */
  hideProductTour: true,
  /** Drop the /how-it-works route. */
  hideHowItWorks: true,
  /** Hide the "What's new" card on the dashboard. */
  hideWhatsNew: true,
  /** Top-bar items forced hidden for everyone, on every device (see `topBarPrefs.ts`). */
  hiddenTopBar: ['news', 'supportUs', 'subscribe', 'bugReport'] as readonly string[],
  /** Sidebar-footer buttons forced hidden for everyone, on every device (see `footerPrefs.ts`). */
  hiddenFooter: ['github', 'community'] as readonly string[],
  /** Replace upstream's Help menu with the fork's own (see `KedHelpMenu.tsx`). */
  replaceHelpMenu: true,
  /** Where the source of this running version is published (AGPL-3.0, section 13). */
  sourceUrl: 'https://github.com/pwflint/ked-erp',
} as const;
