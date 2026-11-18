/**
 * KED fork: backend owners for sidebar rows that upstream's `ROUTE_BACKEND_MODULE`
 * (`app/layout/Sidebar.tsx`) leaves out.
 *
 * The sidebar hides a row only when it knows which backend module serves it.
 * Without an entry, the row stays in the menu after its module is switched
 * off (Settings > Modules) or hidden for the account (Settings > Packages and
 * modules), and opens a page whose API refuses every call. Each owner below
 * is the module whose API the page calls. Upstream entries always win: these
 * only fill gaps.
 */
export const KED_ROUTE_OWNERS: Readonly<Record<string, string>> = {
  '/rfq-bidding': 'oe_rfq_bidding',
  '/change-intelligence': 'oe_change_intelligence',
  '/claims-evidence': 'oe_claims_evidence',
  '/reconciliation': 'oe_reconciliation',
  '/workflows': 'oe_enterprise_workflows',
  '/assets': 'oe_assets',
  '/portfolio/guarantees/register': 'oe_guarantees',
  '/property-dev/dashboards': 'oe_property_dev',
  '/property-dev/settings/house-types': 'oe_property_dev',
  '/property-dev/settings/document-templates': 'oe_property_dev',
  '/cutting': 'oe_cutting',
};
