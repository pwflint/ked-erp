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
  /** Hide the per-module "Tour" and "How it works" buttons on every page. */
  hideModuleHelp: true,
  /** Hide the explainer box at the top of each module page. */
  hideIntroBoxes: true,
  /** Hide the dashboard strip that credits upstream and links to its site and repository. */
  hideUpstreamAttribution: true,
  /** Dashboard widgets removed for everyone: tutorial cases, promo videos and the setup checklist. */
  hiddenDashboardWidgets: ['cases_learn', 'cases_market', 'watch_share', 'onboarding'] as readonly string[],
  /** Top-bar items forced hidden for everyone, on every device (see `topBarPrefs.ts`). */
  hiddenTopBar: ['news', 'supportUs', 'subscribe', 'bugReport'] as readonly string[],
  /** Sidebar-footer buttons forced hidden for everyone, on every device (see `footerPrefs.ts`). */
  hiddenFooter: ['github', 'community'] as readonly string[],
  /** Replace upstream's Help menu with the fork's own (see `KedHelpMenu.tsx`). */
  replaceHelpMenu: true,
  /** Hide the sign-in page's marketing column (and Classic look's side panel); the form stands alone. */
  hideLoginMarketing: true,
  /** Hide the sign-in pages' links to upstream: GitHub and community tiles, website, docs and privacy links. */
  hideAuthUpstreamLinks: true,
  /** Hide the About tile, its Settings links and footer toggle, and drop the /about and /inside (backers) routes. */
  hideAbout: true,
  /** Drop the Learn pages' routes (/videos, /courses, /cases), which stay open by URL when only the menu is hidden, and the Pipeline panel's case and video links. */
  hideLearnPages: true,
  /** Send only administrators to the first-run setup wizard; other new users land on the dashboard. */
  adminOnlyOnboarding: true,
  /** The product name shown in translated strings instead of upstream's (see `brandName.ts`). Empty string turns the swap off. */
  displayName: 'KALEIOPE Environmental Design',
  /** Turn off upstream's update check and every notice it drives (sidebar card, badge, Settings line). KED monitors upstream releases another way. */
  hideUpdateCheck: true,
  /** Hide the corner card that asks users to rate or star upstream on GitHub. */
  hideReviewPrompt: true,
  /** Draw the KED marks where upstream draws its logo and lockup (see `KedBrand.tsx`). */
  useKedBrand: true,
  /** Drop the small "by OpenConstructionERP" line under a workspace's own brand (sidebar, sign-in, client portal). The credit lives in the Help menu. */
  hideByLine: true,
  /** Show upstream's CAD converters and cost database under plain names instead of "DDC" and "CWICR" (see `brandName.ts`). */
  genericComponentNames: true,
  /** Module proposals, the custom-module request and the module developer guide are for administrators only. */
  adminOnlyModuleRequests: true,
  /** Give the sidebar the backend owner of rows upstream's route map leaves out, so switched-off modules leave the menu (see `routeOwners.ts`). */
  fillRouteOwners: true,
  /** Drop the animated sample estimate (German cost groups, euro figures) behind the sign-in, register and password pages. */
  hideAuthSampleBackground: true,
  /** Drop upstream's tagline above the sign-in form. */
  hideAuthTagline: true,
  /** Drop links and hints that point to demo data, which this instance does not load (register page, empty dashboard). */
  hideDemoLinks: true,
  /** Label a zero dashboard total with the account's currency, not euros, when no project has a currency yet. */
  accountCurrencyFallback: true,
  /** Count only the modules this account can use in the dashboard's module figure, not every module discovered. */
  countServedModules: true,
  /** Where the source of this running version is published (AGPL-3.0, section 13). */
  sourceUrl: 'https://github.com/pwflint/ked-erp',
} as const;
