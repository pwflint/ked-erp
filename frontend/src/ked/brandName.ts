/**
 * KED fork: render-time text swaps in every translated string, in every
 * language. Locale bundles stay untouched.
 *
 * 1. Upstream's product name becomes KED's (`KED.displayName`), and a few
 *    labels take KED's own English wording (`EN_LABELS`).
 * 2. With `KED.genericComponentNames`, the names of upstream's CAD converters
 *    ("DDC Converters") and cost database ("CWICR") become plain words. Only
 *    the text on screen changes: module ids, file mapping, API calls and the
 *    server's own messages are untouched. Setting names an administrator types,
 *    such as `CWICR_QDRANT_URL`, are left alone (no word boundary before `_`).
 *    Credits that name the publisher ("published by DDC", "DDC Community") stay.
 *
 * The credit keys are left alone so the Help menu still says what this is
 * based on (AGPL-3.0 and TRADEMARK.md permit a factual credit).
 */
import type { i18n as I18n } from 'i18next';
import { KED } from './flags';

const PRODUCT_NAME = /OpenConstructionERP|\bOCERP\b/g;
const CREDIT_KEYS = new Set(['ked.help.credit', 'ked.help.disclaimer']);

/** KED's own wording for a few labels, English only; other languages keep
 *  upstream's translation. `{{name}}` is filled from the call's options. */
const EN_LABELS: Record<string, string> = {
  'journey.button.default': 'Pipeline',
  'journey.button.step': 'Pipeline · step {{n}}',
  'journey.button.title': 'Pipeline: see where the project is and what comes next',
  'journey.title': 'Project pipeline',
};

/** Ordered: specific phrases first, the bare names last. */
const COMPONENT_NAMES: Array<[RegExp, string]> = [
  // CAD converters
  [/\s?\(DDC Converters 2\.0\)/g, ''],
  [/\bDDC Converters 2\.0 is\b/g, 'The CAD converter is'],
  [/\bDDC Converters 2\.0 (tools|pipeline)\b/g, 'CAD converter $1'],
  [/\bDDC Converters 2\.0\b/g, 'CAD converters'],
  [/\bDDC Community converters\b/g, 'CAD converters'],
  [/\bDDC Converter Modules\b/g, 'CAD converter modules'],
  [/\bDDC (RVT|IFC|DWG|DGN|\w{2,5}) [Cc]onverter\b/g, '$1 converter'],
  [/\bDDC (RVT|IFC|DWG|DGN) to Excel\b/g, '$1 to Excel'],
  [/\bDDC [Cc]onverters\b/g, 'CAD converters'],
  [/\bDDC [Cc]onverter\b/g, 'CAD converter'],
  [/\bDDC v(?=\d)/g, 'converter v'],
  [/\bvia DDC\b/g, 'via the CAD converter'],
  [/\bwithout DDC\b/g, 'without the CAD converter'],
  [/\bDDC cad2data\b/g, 'cad2data'],
  [/\bDDC CWICR repository\b/g, 'cost database repository'],
  [/\bDDC(?=[ -](?:dataframe|Parquet|sheet|binary|pipeline|export|extracted))/g, 'converter'],
  // Cost database
  [/\bCWICR Construction Cost Database\b/g, 'Construction Cost Database'],
  [/\bCWICR Vector Database\b/g, 'Cost Database Vector Index'],
  [/\s?\(CWICR[^)]*\)/g, ''],
  [/\bCWICR (cost )?items\b/g, 'cost database items'],
  [/\bCWICR (?:cost )?(databases?|catalogues?|catalogs?)\b/g, 'cost $1'],
  [/\bCWICR regional (?:cost )?databases\b/g, 'regional cost databases'],
  [/\bfrom CWICR\b/g, 'from the cost database'],
  [/\bSearch CWICR\b/g, 'Search the cost database'],
  [/\bthe built-in CWICR\b/g, 'the built-in cost database'],
  [/\blike CWICR\b/g, 'like the built-in cost database'],
  [/\bCWICR\b(?!_)/g, 'cost database'],
];

function genericNames(value: string): string {
  let out = value;
  for (const [re, to] of COMPONENT_NAMES) out = out.replace(re, to);
  out = out.replace(/\bcost database (?:cost )?(databases?)\b/g, 'cost $1').replace(/\bThe The\b/g, 'The');
  // A swapped name that opens the string or a sentence starts with a capital.
  return out.replace(/(^|[.!?]\s+)(cost|regional cost|converter|CAD)\b/g, (_m, lead: string, word: string) => lead + word.charAt(0).toUpperCase() + word.slice(1));
}

export function installKedBrandName(i18n: I18n): void {
  if (!KED.displayName && !KED.genericComponentNames) return;
  i18n.use({
    type: 'postProcessor',
    name: 'kedBrandName',
    process(value: string, key: string | string[], options: Record<string, unknown> = {}, translator?: { language?: string }) {
      const k = Array.isArray(key) ? key[0] : key;
      if (typeof value !== 'string' || (k && CREDIT_KEYS.has(k))) return value;
      const lng = (options.lng as string | undefined) ?? translator?.language ?? '';
      if (k && EN_LABELS[k] && lng.startsWith('en')) {
        return EN_LABELS[k].replace(/\{\{(\w+)\}\}/g, (_m, name: string) => String(options[name] ?? ''));
      }
      let out = KED.displayName ? value.replace(PRODUCT_NAME, KED.displayName) : value;
      if (KED.genericComponentNames) out = genericNames(out);
      return out;
    },
  });
  const current = i18n.options.postProcess;
  const list = Array.isArray(current) ? current : current ? [current] : [];
  i18n.options.postProcess = [...list, 'kedBrandName'];
}
