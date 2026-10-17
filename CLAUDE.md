# CLAUDE.md

Personal portfolio site for Josh Manzano. Single-page Create React App (react-scripts 5, React 18) using Mantine v6 for UI, deployed to GitHub Pages at `joshmzndev.com`.

## Commands

```bash
npm install      # no lockfile is committed (package-lock.json is gitignored)
npm start        # dev server on localhost:3000
npm run build    # production build to /build
npm test         # Jest + React Testing Library (use CI=true for a single run)
npm run deploy   # builds, then publishes /build to the gh-pages branch (with dotfiles and .nojekyll)
```

There is no CI, so deploys only happen by running `npm run deploy` locally. Open items needing human decisions are tracked in `REVIEW.md`.

## Structure

- `src/App.js` contains the single page:
  - Centered header: small `Avatar` photo, name, bio, and `SocialButton` icon links to GitHub, LinkedIn and YouTube (the `name` prop becomes the `aria-label`).
  - Responsive grid of `ProjectCard`s: three columns on desktop, two on tablet, one on phone. Each card is an `<a>` that opens in a new tab.
- `src/projects.js` is the project list (title, one-sentence description, thumbnail, href). **Add or edit projects here.** A `thumbnail` is a filename in `public/`, and `null` shows Mantine's image placeholder.
- `src/index.js` wraps `App` in `MantineProvider`.
- `src/App.css` holds the custom classes. They use `!important` to override Mantine. Fonts (Lora, Merriweather) load from Google Fonts in `public/index.html`.
- `public/` holds the static assets, which are referenced by bare filename (`src="yahoo.png"`). It also contains:
  - `CNAME`, which sets the custom domain. It must stay here, because a deploy replaces the whole gh-pages branch.
  - `.well-known/discord`, used for Discord domain verification.

## Conventions and gotchas

- The handle is `joshmzndev` (domain, GitHub, YouTube). The LinkedIn and Mastodon URLs still use `joshmanzano` on purpose; see `REVIEW.md`.
- Use the **Mantine v6** API (`Col`, `leftIcon`, `position=`, `align=` props). Don't upgrade to v7 casually.
- Icons come from `@tabler/icons-react`.
- `typescript@4.9` is a devDependency only so that `eslint-plugin-jest` and `@typescript-eslint` load. Without it, `npm run build` fails with `Environment key "jest/globals" is unknown`. Keep it on v4, the latest version react-scripts 5 accepts.
- `src/setupTests.js` stubs `ResizeObserver`, which some Mantine components need in jsdom.
- In tests, prefer `getByText` and `getByLabelText` over `getByRole(..., { name })`. The unpinned testing-library tree throws `parameter 1 is not of type 'Node'` on accessible-name lookups.
