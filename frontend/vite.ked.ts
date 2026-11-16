/**
 * KED fork: build-time rewrite of the page head and the fixed-name icons.
 *
 * `index.html` and the files under `public/` carry upstream's product name,
 * search-engine metadata and logo. Editing them in place would conflict with
 * upstream on every release, because `index.html` also carries the version
 * number. This plugin leaves those files as upstream ships them and changes
 * what the build emits instead.
 *
 * It does not touch upstream's `ddc:*` origin markers.
 */
import { readFileSync } from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

/** The name users see: page title, installed-app name. */
export const KED_APP_NAME = 'KALEIOPE Environmental Design';
/** Home-screen label of the installed app. */
export const KED_APP_SHORT_NAME = 'KED';

const ICON_DIR = path.resolve(__dirname, 'src/ked/icons');

/** Files browsers and the app manifest request by a fixed name. Each is emitted
 *  into the build output from `src/ked/icons`, over the copy from `public/`. */
const FIXED_NAME_ICONS = [
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'pwa/icon-192.png',
  'pwa/icon-256.png',
  'pwa/icon-384.png',
  'pwa/icon-512.png',
  'pwa/icon-maskable-512.png',
];

const SEO_META =
  /^[ \t]*<meta (?:name="(?:description|keywords|author|generator|copyright|application-name|twitter:[^"]+)"|property="og:[^"]+")[^>]*>[ \t]*\r?\n/gm;
const ICON_AND_CANONICAL_LINKS = /^[ \t]*<link rel="(?:icon|canonical)"[^>]*>[ \t]*\r?\n/gm;
const JSON_LD = /^[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>[ \t]*\r?\n/gm;

/** Rewrite the document head. Exported so it can be checked without a build. */
export function rewriteHead(html: string): string {
  let out = html;
  out = out.replace(ICON_AND_CANONICAL_LINKS, '');
  out = out.replace(SEO_META, '');
  out = out.replace(JSON_LD, '');
  // A private workspace: keep it out of search engines.
  out = out.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow" />');
  out = out.replace(
    /<title>[\s\S]*?<\/title>/,
    [
      `<title>${KED_APP_NAME}</title>`,
      '    <link rel="icon" href="/favicon.ico" sizes="32x32" />',
      '    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    ].join('\n'),
  );

  // Fail the build if upstream reshapes the head so that something slips past
  // the patterns above. A red build is how a person finds out.
  const headEnd = out.indexOf('</head>');
  const head = (headEnd === -1 ? out : out.slice(0, headEnd)).replace(/<!--[\s\S]*?-->/g, '');
  const leftover = head.match(
    /<meta (?:name="(?:description|keywords|author|generator|copyright|twitter:[^"]*)"|property="og:[^"]*")|application\/ld\+json|rel="canonical"|brand\/erp\//,
  );
  if (leftover) {
    throw new Error(`ked-html: upstream head metadata survived the rewrite near "${leftover[0]}". Update vite.ked.ts.`);
  }
  if (!out.includes(`<title>${KED_APP_NAME}</title>`)) {
    throw new Error('ked-html: could not set the page title. Update vite.ked.ts.');
  }
  return out;
}

export function kedHtml(): Plugin {
  return {
    name: 'ked-html',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => rewriteHead(html),
    },
    generateBundle() {
      for (const fileName of FIXED_NAME_ICONS) {
        this.emitFile({ type: 'asset', fileName, source: readFileSync(path.join(ICON_DIR, fileName)) });
      }
    },
  };
}
