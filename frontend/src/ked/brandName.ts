/**
 * KED fork: swap upstream's product name for KED's in every translated string,
 * at render time, in every language. Locale bundles stay untouched.
 *
 * The credit keys are left alone so the Help menu still says what this is
 * based on (AGPL-3.0 and TRADEMARK.md permit a factual credit).
 */
import type { i18n as I18n } from 'i18next';
import { KED } from './flags';

const PRODUCT_NAME = /OpenConstructionERP|\bOCERP\b/g;
const CREDIT_KEYS = new Set(['ked.help.credit']);

export function installKedBrandName(i18n: I18n): void {
  if (!KED.displayName) return;
  i18n.use({
    type: 'postProcessor',
    name: 'kedBrandName',
    process(value: string, key: string | string[]) {
      const k = Array.isArray(key) ? key[0] : key;
      if (typeof value !== 'string' || (k && CREDIT_KEYS.has(k))) return value;
      return value.replace(PRODUCT_NAME, KED.displayName);
    },
  });
  const current = i18n.options.postProcess;
  const list = Array.isArray(current) ? current : current ? [current] : [];
  i18n.options.postProcess = [...list, 'kedBrandName'];
}
