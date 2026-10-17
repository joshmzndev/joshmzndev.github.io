# Review: items needing human input

These issues came up in the codebase review on 2026-10-17. Everything that could be fixed safely has been fixed (see "Already fixed" at the bottom). The items below need a decision or an action from the site owner.

## Needs a decision

1. **Remaining `joshmanzano` handles.** These weren't renamed because the `joshmzndev` equivalents couldn't be confirmed:
   - LinkedIn: `linkedin.com/in/joshmanzano-dev/` in `src/App.js`. LinkedIn can't be checked automatically. If you've changed the profile URL, update it there.
   - Mastodon: the hidden `rel="me"` verification link in `public/index.html` points to `mastodon.social/@joshmanzano`. That account exists and `@joshmzndev` does not. Update or remove the link if you've moved accounts.

2. **`public/robots.txt` blocks all crawlers** (`Disallow: /`). The site will not be indexed by search engines. If that isn't intentional, change it to `Allow: /`.

3. **Unreferenced files in `public/`.** These get deployed but nothing links to them:
   - `scroll.png`
   - `akads.webp`
   - `site.webmanifest`, a duplicate of `manifest.json` with empty names
   - `atomer_manzano_techpulse_411.pdf`
   - `yahoo.png`, `taiwan_tech.png`, `akads.png`, which were used by the removed experience tiles
   - `logo192.png`/`logo512.png` are still referenced by the manifest, so keep those

   Files like these may be shared through direct links elsewhere, so they weren't deleted. Remove any that aren't needed, or link the PDF from the page.

4. **Dependencies are unpinned.** `package-lock.json` is gitignored, so every `npm install` resolves fresh versions. That is how the build broke: `@typescript-eslint` started needing `typescript`. Consider committing a lockfile. react-scripts (CRA) is also deprecated, so a migration to Vite is worth considering long-term.

5. **Fill in the real projects.** `src/projects.js` has six placeholder projects that all link to the GitHub profile. Replace each one with a real title, description, link and thumbnail (put the image in `public/`).

## Needs an action

6. **Redeploy.** The `gh-pages` branch predates the fixes below and is missing the PDF and the Discord verification file. Run `npm run deploy`, then confirm that `https://joshmzndev.com` still resolves and that `https://joshmzndev.com/.well-known/discord` serves the verification token.

## Already fixed

- The build was broken: `Environment key "jest/globals" is unknown`. Fixed by adding `typescript@4.9.5` as a devDependency.
- Added `public/CNAME` (`joshmzndev.com`), so a deploy no longer wipes the custom domain.
- Renamed `public/.well_known` to `.well-known`. The deploy now passes `--dotfiles --nojekyll`, so the directory is actually published.
- Replaced the stale CRA test with real tests, and added a `ResizeObserver` stub for jsdom. The tests pass.
- Added a React `key` to the chat messages, `aria-label`s to the icon-only social links, and `alt` text to the images.
- Empty chat messages can no longer be sent.
- `manifest.json` now uses "Josh Manzano" instead of the CRA sample names.
- Removed the unused `crypto` and `@tabler/icons` dependencies, `src/logo.svg`, and the CRA `.App*` CSS.
- The README now describes how deployment actually works.
- Social links are now GitHub (`joshmzndev`), LinkedIn and YouTube (`@joshmzndev`). Contact Me, Twitter and Instagram were removed.
- Renamed `joshmanzano` to `joshmzndev` in the `package.json` name and homepage (`https://joshmzndev.com`), the GitHub link, and the test.
- The bio and the `<meta name="description">` now use the new "software engineer and AP Instructor" text.
- New layout: the photo, name, bio and social links are centered at the top, with a grid of project cards below. The placeholder chatbot (and its third-party cat-fact API call), the unused `jp` locale and the experience tiles were removed.
