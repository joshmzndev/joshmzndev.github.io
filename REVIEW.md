# Review: items needing human input

These issues came up in the codebase review on 2026-10-17. Everything that could be fixed has been fixed (see "Done" at the bottom). The items below still need the site owner.

## Needs an action

1. **Fill in the real projects.** `src/projects.js` has six placeholder projects that all link to the GitHub profile. Replace each one with a real title, description, link and thumbnail (put the image in `public/`).

2. **Deploy.** Run `npm run deploy`. It needs your GitHub credentials, which aren't available to Claude. Then check that:
   - `https://joshmzndev.com` loads;
   - `https://joshmzndev.com/.well-known/discord` serves the verification token;
   - `https://joshmzndev.com/robots.txt` says `Allow: /`.

3. **Help search engines find the site.** After deploying:
   - Add `joshmzndev.com` in [Google Search Console](https://search.google.com/search-console) (verify with a DNS TXT record or an HTML file in `public/`), then submit `https://joshmzndev.com/sitemap.xml`. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).
   - Check the structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).
   - Link `https://joshmzndev.com` from every profile (GitHub, LinkedIn, YouTube, Mastodon). Two-way links between the site and each profile in the `sameAs` list help search engines tie them all to "joshmzndev". On Mastodon, the `rel="me"` links will then show the site as verified.

4. **Long-term: migrate off Create React App.** react-scripts is deprecated and its tooling is aging (it needed the `typescript@4.9` workaround). Vite is the usual replacement.

## Done

- **Build fixed.** `Environment key "jest/globals" is unknown` is gone; `typescript@4.9.5` was added as a devDependency.
- **Lockfile committed.** `package-lock.json` is now tracked, so installs are reproducible (`npm ci`).
- **Custom domain kept on deploy.** Added `public/CNAME` (`joshmzndev.com`).
- **Discord verification file published.** Renamed `public/.well_known` to `.well-known`. The deploy now passes `--dotfiles --nojekyll`.
- **Tests replaced.** The stale CRA test is gone, with real tests in its place and a `ResizeObserver` stub for jsdom.
- **Handles unified.** All profile links use `joshmzndev`: GitHub, LinkedIn (`linkedin.com/in/joshmzndev`), YouTube (`@joshmzndev`) and Mastodon (`@joshmzndev`). The same goes for the `package.json` name and homepage.
- **New layout.** A centered photo, name, `@joshmzndev` handle, bio and social links sit at the top, with a grid of project cards below. The chatbot, the `jp` locale and the experience tiles were removed.
- **Indexing allowed.** `robots.txt` now allows all crawlers and links to the new `sitemap.xml`.
- **SEO metadata added.** `public/index.html` now has:
  - a schema.org `ProfilePage`/`Person` JSON-LD block with `alternateName: "joshmzndev"` and `sameAs` links to every profile;
  - a canonical URL and the title "Josh Manzano (joshmzndev)";
  - Open Graph and Twitter card tags for link previews;
  - `rel="me"` links;
  - a `<noscript>` fallback with the name, bio and profile links.
- **Semantic headings.** The name is now the page's single `<h1>`, and project titles are `<h2>`s. The visual sizes are unchanged.
- **Accessibility fixes.** The icon-only links have `aria-label`s, and the images have `alt` text.
- **Cleanup.** `manifest.json` names are fixed. The unused `crypto` and `@tabler/icons` dependencies, `src/logo.svg` and the CRA CSS were removed. The README is updated.
